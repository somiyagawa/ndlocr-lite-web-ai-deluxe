import shutil
import os
from PIL import Image
from tqdm import tqdm
from yaml import safe_load
import glob
charobj={}
with open("./configs/charset/NDLmoji.yaml",encoding="utf-8") as f:
    charobj=safe_load(f)

newcharset=set(list(charobj["model"]["charset_train"]))
outputPath="honkoku_data"
mappingskanji={}
#字種の包摂を行う場合にはmappingskanjiのキーに包摂前、値に包摂後の字体を入れる

os.makedirs(outputPath, exist_ok=True)
for txtfilepath in tqdm(glob.glob("honkoku_rawdata/*.txt")):
    with open(txtfilepath,"r",encoding="utf-8") as f:
        line=f.read()
        line=line.rstrip()
        if len(set(list(line))-newcharset)==0:
            shutil.copy(txtfilepath,os.path.join(outputPath,os.path.basename(txtfilepath)))
        else:
            newline=""
            for c in list(line):
                if c in mappingskanji:
                    newline+=mappingskanji[c]
                else:
                    newline+=c
            #print(line,newline)
            with open(os.path.join(outputPath,os.path.basename(txtfilepath)),"w",encoding="utf-8") as wf:
                wf.write(newline)
        imgpath=txtfilepath.replace(".txt",".jpg")
        img = Image.open(imgpath).convert('RGB')
        if img.height>img.width:
            img = img.transpose(Image.ROTATE_90)
        if img.height>=120:
            img = img.resize((img.width // 4, img.height // 4))
        elif img.height>=60:
            img = img.resize((img.width // 2, img.height // 2))
        img.save(os.path.join(outputPath,os.path.basename(imgpath)))


import random
random.seed(0)
trainf=open("oneline_honkoku.txt","w",encoding="utf-8")
validf=open("oneline_honkoku_val.txt","w",encoding="utf-8")
for txtfilepath in tqdm(glob.glob("honkoku_data/*.txt")):
    imgpath=txtfilepath.replace(".txt",".jpg")
    with open(txtfilepath,"r",encoding="utf-8") as f:
        if random.random()<0.95:
            trainf.write(imgpath+"\t"+f.read()+"\n")
        else:
            validf.write(imgpath+"\t"+f.read()+"\n")

trainf.close()
validf.close()


import io
import os
import lmdb
import numpy as np
from PIL import Image


def checkImageIsValid(imageBin):
    if imageBin is None:
        return False
    img = Image.open(io.BytesIO(imageBin)).convert('RGB')
    return np.prod(img.size) > 0


def writeCache(env, cache):
    with env.begin(write=True) as txn:
        for k, v in cache.items():
            txn.put(k, v)


def createDataset(inputPath, gtFile, outputPath, checkValid=True):
    os.makedirs(outputPath, exist_ok=True)
    env = lmdb.open(outputPath, map_size=1099511627776)

    cache = {}
    cnt = 1

    with open(gtFile, 'r', encoding='utf-8') as f:
        data = f.readlines()

    nSamples = len(data)
    maxlen=0
    for i, line in enumerate(data):
        try:
            imagePath, label = line.strip().split("\t",maxsplit=1)
            label=label.replace("　"," ")
            if len(label)>100:
                print("label is too long!",imagePath)
                continue
            maxlen=max(maxlen,len(label))
        except:
            continue
        imagePath = os.path.join(inputPath, imagePath)
        with open(imagePath, 'rb') as f:
            imageBin = f.read()
        if checkValid:
            try:
                img = Image.open(io.BytesIO(imageBin)).convert('RGB')
            except IOError as e:
                with open(outputPath + '/error_image_log.txt', 'a') as log:
                    log.write('{}-th image data occured error: {}, {}\n'.format(i, imagePath, e))
                continue
            if np.prod(img.size) == 0:
                print('%s is not a valid image' % imagePath)
                continue

        imageKey = 'image-%09d'.encode() % cnt
        labelKey = 'label-%09d'.encode() % cnt
        cache[imageKey] = imageBin
        cache[labelKey] = label.encode()

        if cnt % 1000 == 0:
            writeCache(env, cache)
            cache = {}
            print('Written %d / %d' % (cnt, nSamples))
        cnt += 1
    print(maxlen)
    nSamples = cnt - 1
    cache['num-samples'.encode()] = str(nSamples).encode()
    writeCache(env, cache)
    env.close()
    print('Created dataset with %d samples' % nSamples)

createDataset(".",
              "./oneline_honkoku.txt",
              "traindata",
              checkValid=True)
createDataset(".",
              "./oneline_honkoku_val.txt",
              "valdata",
              checkValid=True)

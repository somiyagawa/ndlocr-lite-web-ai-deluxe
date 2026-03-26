import cv2
from glob import glob
from tqdm import tqdm
import json
import os
from collections import defaultdict
import json
import glob
import xml.etree.ElementTree as ET
import shutil
import re
import pandas as pd
from xml.dom import minidom

def convert_to_coco(name2bboxes, labels_mp,  name):
    idx = 1
    image_id = 20200000000
    images = []
    annotations = []
    for im_path, bboxes in tqdm(name2bboxes.items()):
        if len(bboxes) == 0:
            print(im_path)
            continue

        im_name = im_path.split('/')[-1]
        im = cv2.imread(im_path)
        h, w, _ = im.shape
        image_id += 1
        image = {'file_name': im_name, 'width': w, 'height': h, 'id': image_id}
        images.append(image)


        for bbox in bboxes:
            x1, y1, x2, y2 = bbox[:4]
            x1=min(max(x1,0),w)
            y1=min(max(y1,0),h)
            x2=min(max(x2,0),w)
            y2=min(max(y2,0),h)
            category = bbox[-1]

            bbox = [x1, y1, x2 - x1, y2 - y1]
            seg = []
            # bbox[] is x,y,w,h
            # left_top
            seg.append(bbox[0])
            seg.append(bbox[1])
            # left_bottom
            seg.append(bbox[0])
            seg.append(bbox[1] + bbox[3])
            # right_bottom
            seg.append(bbox[0] + bbox[2])
            seg.append(bbox[1] + bbox[3])
            # right_top
            seg.append(bbox[0] + bbox[2])
            seg.append(bbox[1])
            ann = {'segmentation': [seg], 'area': bbox[2] * bbox[3], 'iscrowd': 0, 'image_id': image_id,
                   'bbox': bbox, 'category_id': labels_mp[category], 'id': idx, 'ignore': 0}
            idx += 1
            annotations.append(ann)
    # print(max(max_gt))
    ann = dict()
    ann['type'] = 'instances'
    ann['images'] = images
    ann['annotations'] = annotations
    category = [{'supercategory': 'none', 'id': i, 'name': label} for label, i in labels_mp.items()]
    ann['categories'] = category
    json.dump(ann, open('{}.json'.format(name), 'w'))

#OUTPUTROOTDIR="pascalvoc"
def tsvconverter_coco(inputtsvpath,outputdir):
    tsvdf=pd.read_csv(inputtsvpath,header=None,sep="\t")
    rawimgname=os.path.basename(inputtsvpath)[:-4]+".jpg"
    rawimgpath=inputtsvpath[:-4]+".jpg"
    #print(rawimgpath)
    #img=cv2.imread(rawimgpath)
    xmlname=os.path.basename(os.path.dirname(inputtsvpath))+"_"+rawimgname[:-4]+".xml"
    #print(xmlname)
    imgname=xmlname[:-4]+".jpg"
    outputimgdir=os.path.join(outputdir,"img")
    os.makedirs(outputimgdir,exist_ok=True)
    outputimgpath=os.path.join(outputimgdir,imgname)
    shutil.copy(rawimgpath,outputimgpath)
    bboxes=[]
    for index,row in tsvdf.iterrows():
        x1,y1=int(row[0]),int(row[1])
        x2,y2=int(row[2]),int(row[3])
        x3,y3=int(row[4]),int(row[5])
        x4,y4=int(row[6]),int(row[7])
        xmin = min(min(x1, x2), min(x3,x4))
        xmax = max(max(x1, x2), max(x3, x4))
        ymin = min(min(y1, y2), min(y3, y4))
        ymax = max(max(y1, y2), max(y3, y4))
        category = "text"
        bboxes.append([xmin, ymin, xmax, ymax, category])
    return bboxes,outputimgpath

def tsvconverter_fromxml(inputxmlpath,outputdir):
    with open(inputxmlpath,"r",encoding="utf-8") as f:
        xml = f.read()
    root = ET.fromstring(re.sub('xmlns=".*?"', '', xml, count=1))#名前空間を消す
    rawimgname=os.path.basename(inputxmlpath)[:-4]+".jpg"
    rawimgpath=inputxmlpath[:-4]+".jpg"
    #print(rawimgpath)
    #img=cv2.imread(rawimgpath)
    xmlname=os.path.basename(inputxmlpath)
    #print(xmlname)
    imgname=xmlname[:-4]+".jpg"
    outputimgdir=os.path.join(outputdir,"img")
    os.makedirs(outputimgdir,exist_ok=True)
    outputimgpath=os.path.join(outputimgdir,imgname)
    shutil.copy(rawimgpath,outputimgpath)
    bboxes=[]
    for objnode in root.findall("object"):
        name=objnode.find("name").text
        if name!="2_handwritten" and name!="3_typography" and name!="text":
            continue
        bndobj=objnode.find("bndbox")
        xmin=int(float(bndobj.find("xmin").text))
        ymin=int(float(bndobj.find("ymin").text))
        xmax=int(float(bndobj.find("xmax").text))
        ymax=int(float(bndobj.find("ymax").text))
        category = "text"
        bboxes.append([xmin, ymin, xmax, ymax, category])
    return bboxes,outputimgpath

kotenseki_labels = ['text']
kotenseki_labels_mp = {label: i for i, label in enumerate(kotenseki_labels, 1)}
kotenseki2bboxes_train = dict()
kotenseki2bboxes_valid = dict()
kotenseki2bboxes_test = dict()

##NDL-DocLに加えて追加の学習データを用意した場合
"""for xmlpath in glob.glob("honkoku/no0/*.xml"):
    outputname="kotensekicocotrain"
    bboxes,im_path=tsvconverter_fromxml(xmlpath,outputname)
    if len(bboxes)!=0:
        print(im_path)
        kotenseki2bboxes_train[im_path]=bboxes
for xmlpath in glob.glob("honkoku/no1/*.xml"):
    outputname="kotensekicocotrain"
    bboxes,im_path=tsvconverter_fromxml(xmlpath,outputname)
    if len(bboxes)!=0:
        print(im_path)
        kotenseki2bboxes_train[im_path]=bboxes
for xmlpath in glob.glob("honkoku/no2/*.xml"):
    outputname="kotensekicocovalid"
    bboxes,im_path=tsvconverter_fromxml(xmlpath,outputname)
    if len(bboxes)!=0:
        print(im_path)
        kotenseki2bboxes_valid[im_path]=bboxes
for xmlpath in glob.glob("dataset_kotenseki/*/*.xml"):
    outputname="kotensekicocotrain"
    bboxes,im_path=tsvconverter_fromxml(xmlpath,outputname)
    if len(bboxes)!=0:
        print(im_path)
        kotenseki2bboxes_train[im_path]=bboxes
import random
import glob
random.seed(777)

kotenseki_labels = ['text']
kotenseki_labels_mp = {label: i for i, label in enumerate(kotenseki_labels, 1)}
kotenseki2bboxes_test = dict()
for xmlpath in glob.glob("dataset_kotenseki_test/*.xml"):
    outputname="kotensekicocotest"
    bboxes,im_path=tsvconverter_fromxml(xmlpath,outputname)
    if len(bboxes)!=0:
        print(im_path)
        kotenseki2bboxes_test[im_path]=bboxes
    else:
        print(xmlpath)

convert_to_coco(kotenseki2bboxes_train, kotenseki_labels_mp, "kotensekicocotrain")
convert_to_coco(kotenseki2bboxes_valid, kotenseki_labels_mp, "kotensekicocovalid")
convert_to_coco(kotenseki2bboxes_test, kotenseki_labels_mp, "kotensekicocotest")
"""

##NDL-DocLのみで学習を行う場合(ランダムな1割を評価及びテスト用、残りを学習用にするダミーコード)
import random
import glob
random.seed(777)

for xmlpath in glob.glob("dataset_kotenseki/*/*.xml"):
    train="kotensekicocotrain"
    valid="kotensekicocovalid"
    test="kotensekicocotest"
    val=random.random()
    if val>0.1:
        bboxes,im_path=tsvconverter_fromxml(xmlpath,train)
        if len(bboxes)!=0:
            kotenseki2bboxes_train[im_path]=bboxes
    else:
        bboxes,im_path=tsvconverter_fromxml(xmlpath,valid)
        bboxes,im_path=tsvconverter_fromxml(xmlpath,test)
        if len(bboxes)!=0:
            kotenseki2bboxes_valid[im_path]=bboxes
            kotenseki2bboxes_test[im_path]=bboxes


convert_to_coco(kotenseki2bboxes_train, kotenseki_labels_mp, "kotensekicocotrain")
convert_to_coco(kotenseki2bboxes_valid, kotenseki_labels_mp, "kotensekicocovalid")
convert_to_coco(kotenseki2bboxes_test, kotenseki_labels_mp, "kotensekicocotest")

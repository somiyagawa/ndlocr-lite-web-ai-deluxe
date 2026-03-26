from PIL import Image
import torch
from strhub.data.module import SceneTextDataModule
from strhub.models.utils import load_from_checkpoint, parse_model_args
import yaml


with open('./configs/charset/NDLmoji.yaml', 'r') as yml:
    config = yaml.safe_load(yml)

device = 'cpu'
checkpoint='チェックポイントのパス'
kwargs={'charset_test': config["model"]["charset_test"]}
model = load_from_checkpoint(checkpoint, **kwargs).eval().to(device)
img_transform = SceneTextDataModule.get_transform(model.hparams.img_size)
img = Image.open('./honkoku_rawdata/001E3C19A3E626EC382F86D201FEFB8C-003_4.jpg').convert('RGB')
print(img.size)
# Preprocess. Model expects a batch of images with shape: (B, C, H, W)
img = img_transform(img).unsqueeze(0).to(device)

logits = model(img)
logits.shape  # torch.Size([1, 26, 95]), 94 characters + [EOS] symbol

# Greedy decoding
pred = logits.softmax(-1)
label, confidence = model.tokenizer.decode(pred)
print('Decoded label = {}'.format(label[0]))
model.refine_iters = 10
model.decode_ar = True
onnx_path="parseq-ndl-32x384-tiny-10.onnx"
model.to_onnx(onnx_path, torch.randn([1,3, 32, 384]), do_constant_folding=True, opset_version=17)
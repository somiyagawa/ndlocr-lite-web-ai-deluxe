# 学習及びモデル変換手順
次の環境で動作確認を実施しました。
```
CPU: Intel(R) Xeon(R) Gold 6330 CPU @ 2.00GHz
RAM: 256GB
GPU: NVIDIA A100 x 1
OS: Ubuntu 22.04.4 LTS
NVIDIA Driver Version: 535.113.01
CUDA: 11.8
```

## レイアウト認識(RTMDet)

Chengqi Lyu, Wenwei Zhang, Haian Huang, Yue Zhou, Yudong Wang, Yanyi Liu, Shilong Zhang, Kai Chen. Rtmdet: An empirical study of designing real-time object detectors. arXiv preprint arXiv:2212.07784, 2022.(https://arxiv.org/abs/2212.07784)

を利用してレイアウト認識モデルを作成します。

ここではmmdetv3-rtmdet_s_8xb32-300e_cocoのみを対象としてカスタマイズを行います。

他のサイズのモデル等については次のURLを参照してください。
https://github.com/open-mmlab/mmdetection/tree/main/configs/rtmdet

この項で紹介する当館が作成したサンプルコードは[rtmcode](./rtmcode)ディレクトリ以下にあります。

### 環境構築
```
cp rtmcode/* .
python3 -m venv rtmdetenv
source ./rtmdetenv/bin/activate
python3 -m pip install --upgrade pip
pip install torch==2.0.0 torchvision==0.15.1 torchaudio==2.0.1 --index-url https://download.pytorch.org/whl/cu118
pip install mmcv==2.0.0 -f https://download.openmmlab.com/mmcv/dist/cu118/torch2.0/index.html
pip install mmdet==3.0.0
```

### 学習データの変換
次の手順は国立国会図書館が公開している[NDL-DocLデータセット](https://github.com/ndl-lab/layout-dataset)を学習用データセットのアノテーション情報に変換する手順を示しています。データを追加する場合には[rtmcococonverter.py](./rtmcode/rtmcococonverter.py)を適宜編集して利用してください。

```
pip install pandas tqdm
wget https://lab.ndl.go.jp/dataset/dataset_kotenseki.zip
unzip dataset_kotenseki.zip
python3 rtmcococonverter.py
```

### 学習
事前に[rtmdettrain.py](./rtmcode/rtmdettrain.py)を読んで、データセットのパス等を修正してください。
```
python3 rtmdettrain.py
```

### 学習済モデルのONNXへの変換

https://zenn.dev/inaturam/articles/c199357d7332bc
を参考にしています。

```
pip install numpy==1.21.6 onnx==1.16.2 onnxruntime-gpu==1.18.1  mmdeploy==1.3.1
git clone https://github.com/open-mmlab/mmdeploy -b v1.3.1
python3 mmdeploy/tools/deploy.py \./rtmonnx_config.py \
    ./mmdetv3-rtmdet_s_8xb32-300e_coco_sample.py \
    ./work_dir_mmdetv3_rtmdet_s/epoch_300.pth \
    ./dataset_kotenseki/10301071/10301071_0006.jpg \
    --work-dir mmdeploy_model/rtmdet_s
```
mmdeploy_model/rtmdet_sディレクトリ以下にrtmdet-s-1280x1280.onnxが生成されます。

NDL古典籍OCR-Liteで利用する場合は、--det-weightsオプションでonnxファイルのパスを指定してください。


## 文字列認識(PARSeq)
Darwin Bautista, Rowel Atienza. Scene text recognition with permuted autoregressive sequence models. arXiv:2212.06966, 2022. (https://arxiv.org/abs/2207.06966)

を利用して文字列認識モデルを作成します。

ここではparseq-tinyを利用してモデルを作成します。

この項で紹介する当館が作成したサンプルコードは[parseqcode](./parseqcode)ディレクトリ以下にあります。

### 環境構築
```
python3 -m venv parseqenv
source ./parseqenv/bin/activate
git clone https://github.com/baudm/parseq
cp -r parseqcode/* ./parseq
cd parseq
python3 -m pip install --upgrade pip
platform=cu118
make torch-${platform}
pip install -r requirements/core.${platform}.txt -e .[train,test]
pip install tqdm
```

そのままではONNX変換時にエラーが発生することがあるので、parseq/strhub/models/parseq/model.py
の117行目(元リポジトリの次の箇所
https://github.com/baudm/parseq/blob/1902db043c029a7e03a3818c616c06600af574be/strhub/models/parseq/model.py#L117)

```tgt_mask = query_mask = torch.triu(torch.ones((num_steps, num_steps), dtype=torch.bool, device=self._device), 1)```

を

```tgt_mask = query_mask = torch.triu(torch.ones((num_steps, num_steps), dtype=torch.float, device=self._device), 1)```
に変更してください。

### 学習データの変換

[OCR学習用データセット（みんなで翻刻）](https://github.com/ndl-lab/ndl-minhon-ocrdataset)の「利用方法」を参考に画像とテキストデータを対応付けた1行データセットを作成してください。

honkoku_rawdataディレクトリ内に行ごとの切り出し画像とテキストデータが次のように配置されているとします。
```
001E3C19A3E626EC382F86D201FEFB8C-001_0.jpg
001E3C19A3E626EC382F86D201FEFB8C-001_0.txt
001E3C19A3E626EC382F86D201FEFB8C-003_0.jpg
001E3C19A3E626EC382F86D201FEFB8C-003_0.txt
……
```

[convertkotensekidata2lmdb.py](./parseqcode/convertkotensekidata2lmdb.py)を実行するとtraindataとvaliddataディレクトリにparseqの学習に利用するlmdb形式のデータセット(data.mdb、lock.mdb)が出力されます。

```
python3 convertkotensekidata2lmdb.py
```

出力されたデータセットは次のコマンドで所定の位置に配置します。
```
mkdir data
mkdir data/train
mkdir data/train/real
mkdir data/val
cp traindata/* data/train/real/
cp validdata/* data/val/
```

### 学習

```
python3 train.py +experiment=parseq-tiny --config-name=main_tiny384_ndl
```

### 学習済モデルのONNXへの変換
[convert2onnx.py](./parseqcode/convert2onnx.py)の「チェックポイントのパス」を書き換えて実行します。

```
python3 convert2onnx.py
```

parseq-ndl-32x384-tiny-10.onnxが生成されます。

NDL古典籍OCR-Liteで利用する場合は、--rec-weightsオプションでonnxファイルのパスを指定してください。

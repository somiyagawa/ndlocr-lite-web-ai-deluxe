import mmengine
from mmdet.registry import DATASETS
from mmdet.datasets.coco import CocoDataset
from mmengine.registry import RUNNERS
import os.path as osp
import os
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP


#以下はホームディレクトリを/hdd2/rtmdetで実行する場合の例
cfg = mmengine.Config.fromfile('mmdetv3-rtmdet_s_8xb32-300e_coco_sample.py')
cfg.model.test_cfg.max_per_img=1000
cfg.model.bbox_head.num_classes=1
## アノテーションフォルダの設定(coco形式)
train_label_path = "/hdd2/rtmdet/layoutinputs/kotensekicocotrain/kotensekicocotrain.json"
val_label_path = "/hdd2/rtmdet/layoutinputs/kotensekicocovalid/kotensekicocovalid.json"
test_label_path = "/hdd2/rtmdet/layoutinputs/kotensekicocotest/kotensekicocotest.json"

# 画像ファイルのパス
train_img_path = "/hdd2/rtmdet/layoutinputs/kotensekicocotrain/img/"
val_img_path = "/hdd2/rtmdet/layoutinputs/kotensekicocovalid/img/"
test_img_path = "/hdd2/rtmdet/layoutinputs/kotensekicocotest/img/"

# データセットのルートフォルダ
root_path = "/hdd2/rtmdet/layoutinputs/"
# 作業フォルダ（学習時のモデル出力先（エポック毎に出力))
work_path = '/hdd2/rtmdet/work_dir_mmdetv3_rtmdet_s'


@DATASETS.register_module()
class TinyDataset(CocoDataset):
    metainfo = {
        'classes': ('text', ),
        'palette': [
            (220, 20, 60),
        ]
    }

###augmentation等の設定
cfg.train_pipeline = [
    dict(type='LoadImageFromFile', backend_args=None),
    dict(type='LoadAnnotations', with_bbox=True),
    dict(type='CachedMosaic', img_scale=(1280, 1280), pad_val=114.0),
    dict(
        type='RandomResize',
        scale=(2560, 2560),
        ratio_range=(0.1, 2.0),
        keep_ratio=True),
    dict(type='RandomCrop', crop_size=(1280, 1280)),
    dict(type='YOLOXHSVRandomAug'),
    dict(type='RandomFlip', prob=0.5),
    dict(type='Pad', size=(1280, 1280), pad_val=dict(img=(114, 114, 114))),
    dict(
        type='CachedMixUp',
        img_scale=(1280, 1280),
        ratio_range=(1.0, 1.0),
        max_cached_images=20,
        pad_val=(114, 114, 114)),
    dict(type='PackDetInputs')
]

cfg.train_pipeline_stage2 = [
    dict(type='LoadImageFromFile', backend_args=None),
    dict(type='LoadAnnotations', with_bbox=True),
    dict(
        type='RandomResize',
        scale=(1280, 1280),
        ratio_range=(0.1, 2.0),
        keep_ratio=True),
    dict(type='RandomCrop', crop_size=(1280, 1280)),
    dict(type='YOLOXHSVRandomAug'),
    dict(type='RandomFlip', prob=0.5),
    dict(type='Pad', size=(1280, 1280), pad_val=dict(img=(114, 114, 114))),
    dict(type='PackDetInputs')
]

cfg.test_pipeline = [
    dict(type='LoadImageFromFile', backend_args=None),
    dict(type='Resize', scale=(1280, 1280), keep_ratio=True),
    dict(type='Pad', size=(1280, 1280), pad_val=dict(img=(114, 114, 114))),
    dict(type='LoadAnnotations', with_bbox=True),
    dict(
        type='PackDetInputs',
        meta_keys=('img_id', 'img_path', 'ori_shape', 'img_shape',
                   'scale_factor'))
]

cfg.train_dataloader.dataset.pipeline=cfg.train_pipeline
cfg.val_dataloader.dataset.pipeline=cfg.test_pipeline



# コンフィグを変更する
cfg.work_dir = work_path
cfg.data_root = root_path
cfg.dataset_type='TinyDataset'
cfg.resume=False
cfg.train_dataloader.dataset.type= cfg.dataset_type
cfg.val_dataloader.dataset.type= cfg.dataset_type
cfg.test_dataloader.dataset.type = cfg.dataset_type

# アノテーションファイルのパス
cfg.test_dataloader.dataset.data_root=root_path
cfg.test_dataloader.dataset.ann_file=test_label_path
cfg.test_dataloader.dataset.data_prefix.img=test_img_path
cfg.test_evaluator.ann_file=test_label_path

cfg.train_dataloader.dataset.data_root=root_path
cfg.train_dataloader.dataset.ann_file=train_label_path
cfg.train_dataloader.dataset.data_prefix.img=train_img_path

cfg.val_dataloader.dataset.data_root=root_path
cfg.val_dataloader.dataset.ann_file=val_label_path
cfg.val_dataloader.dataset.data_prefix.img=val_img_path
cfg.val_evaluator.ann_file=val_label_path

##環境のVRAMに合わせて変更する
#cfg.train_dataloader.batch_size=24 #A100の場合
cfg.train_dataloader.batch_size=4
cfg.train_dataloader.num_workers=6
cfg.val_dataloader.batch_size=1
cfg.val_dataloader.num_workers=6
cfg.test_dataloader.batch_size=1
cfg.test_dataloader.num_workers=6

cfg.load_from=None
cfg.seed = 0
cfg.gpu_ids = range(1)
cfg.device = 'cuda'
cfg.metainfo = {
    'classes': ('text', ),
    'palette': [
        (220, 20, 60),
    ]
}

#print(f'Config:\n{cfg.pretty_text}')

# 編集したコンフィグをファイル出力して保存する場合にはコメントを外して適当なパスに書き換える
#cfg.dump('/hdd2/rtmdet/mmdetv3-rtmdet_s_8xb32-300e_coco.py')


os.environ['MASTER_ADDR'] = 'localhost'
os.environ['MASTER_PORT'] = '12355'

# initialize the process group
dist.init_process_group("gloo", rank=0, world_size=1)


# Create work_dir
os.makedirs(osp.abspath(cfg.work_dir),exist_ok=True)
runner = RUNNERS.build(cfg)
runner.train()


onnx_config = dict(
    type='onnx',
    export_params=True,
    keep_initializers_as_inputs=False,
    opset_version=17,
    save_file='rtmdet-s-1280x1280.onnx',
    input_names=['input'],
    output_names=['dets', 'labels'],
    input_shape=[1280, 1280],
    optimize=True)

codebase_config = dict(
    type='mmdet',
    task='ObjectDetection',
    model_type='end2end',
    post_processing=dict(
        score_threshold=0.01,
        confidence_threshold=0.001,
        iou_threshold=0.3,
        max_output_boxes_per_class=300,
        pre_top_k=3000,
        keep_top_k=300,
        background_label_id=-1,
    ))

backend_config = dict(
    type='onnxruntime',
    model_inputs=[dict(input_shapes=dict(input=[1, 3, 1280, 1280]))]
    )

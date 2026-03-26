/**
 * 古典籍文字認識モジュール（PARSeq 32×384モデル）
 * 参照実装: ndlkotenocr-lite-master/src/parseq.py
 *
 * 現代日本語版との主な違い:
 *   - 入力サイズ: [1, 3, 32, 384]（現代版は [1, 3, 16, W]）
 *   - BGR順入力（現代版はRGB）
 *   - 連続重複除去なし（現代版はあり）
 *   - 単一モデル（カスケードなし）
 */

import * as yaml from 'js-yaml'
import type * as OrtType from 'onnxruntime-web'
import { ort, createSession } from './onnx-config'
import type { TextRegion } from '../types/ocr'

interface RecognitionResult {
  text: string
  confidence: number
}

export class KotenTextRecognizer {
  private session: OrtType.InferenceSession | null = null
  private initialized = false
  private charList: string[] = []
  private inputShape: [number, number, number, number] = [1, 3, 32, 384]
  private configPath = '/config/NDLmoji.yaml'

  async initialize(modelData: ArrayBuffer): Promise<void> {
    if (this.initialized) return

    try {
      await this.loadConfig()
      this.session = await createSession(modelData)
      this.initialized = true
      console.log(`[KotenRec] PARSeq initialized: input ${this.inputShape[3]}×${this.inputShape[2]}, charset ${this.charList.length} chars`)
    } catch (error) {
      console.error('[KotenRec] Failed to initialize:', error)
      throw error
    }
  }

  private async loadConfig(): Promise<void> {
    try {
      const response = await fetch(this.configPath)
      if (!response.ok) throw new Error(`Failed to load config: ${response.statusText}`)

      const yamlText = await response.text()
      const yamlConfig = yaml.load(yamlText) as Record<string, unknown>

      if ((yamlConfig?.model as Record<string, unknown>)?.charset_train) {
        const charsetTrain = (yamlConfig.model as Record<string, unknown>).charset_train as string
        this.charList = charsetTrain.split('')
        console.log(`[KotenRec] Character list loaded: ${this.charList.length} characters`)
      }
    } catch (error) {
      console.warn(`[KotenRec] Failed to load config, using defaults: ${(error as Error).message}`)
    }
  }

  async recognize(imageData: ImageData, region: TextRegion): Promise<RecognitionResult> {
    const cropped = KotenTextRecognizer.cropImageData(imageData, region)
    return this.recognizeCropped(cropped)
  }

  async recognizeCropped(croppedImageData: ImageData): Promise<RecognitionResult> {
    if (!this.initialized || !this.session) {
      throw new Error('Koten text recognizer not initialized')
    }

    try {
      const inputTensor = this.preprocess(croppedImageData)
      const output = await this.session.run({
        [this.session.inputNames[0]]: inputTensor,
      })
      return this.decodeOutput(output)
    } catch (error) {
      console.error('[KotenRec] Text recognition failed:', error)
      return { text: '', confidence: 0.0 }
    }
  }

  static cropImageData(imageData: ImageData, region: TextRegion): ImageData {
    const sourceCanvas = new OffscreenCanvas(imageData.width, imageData.height)
    const sourceCtx = sourceCanvas.getContext('2d')!
    sourceCtx.putImageData(imageData, 0, 0)

    const canvas = new OffscreenCanvas(region.width, region.height)
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(sourceCanvas, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height)

    return ctx.getImageData(0, 0, region.width, region.height)
  }

  /** 複数領域を一括クロップ */
  static cropImageDataBatch(imageData: ImageData, regions: TextRegion[]): ImageData[] {
    const sourceCanvas = new OffscreenCanvas(imageData.width, imageData.height)
    const sourceCtx = sourceCanvas.getContext('2d')!
    sourceCtx.putImageData(imageData, 0, 0)

    return regions.map(region => {
      const canvas = new OffscreenCanvas(region.width, region.height)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(sourceCanvas, region.x, region.y, region.width, region.height, 0, 0, region.width, region.height)
      return ctx.getImageData(0, 0, region.width, region.height)
    })
  }

  private preprocess(imageData: ImageData): OrtType.Tensor {
    const [, channels, height, width] = this.inputShape
    const imgWidth = imageData.width
    const imgHeight = imageData.height

    // 縦長画像は90度回転（反時計回り）— parseq.py: pil_image.transpose(Image.ROTATE_90)
    const canvas = new OffscreenCanvas(1, 1)
    const ctx = canvas.getContext('2d')!

    if (imgHeight > imgWidth) {
      canvas.width = imgHeight
      canvas.height = imgWidth
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.translate(-canvas.height / 2, -canvas.width / 2)
    } else {
      canvas.width = imgWidth
      canvas.height = imgHeight
    }

    const tempCanvas = new OffscreenCanvas(imgWidth, imgHeight)
    const tempCtx = tempCanvas.getContext('2d')!
    tempCtx.putImageData(imageData, 0, 0)
    ctx.drawImage(tempCanvas, 0, 0)

    // モデル入力サイズ(384×32)にリサイズ
    const resizeCanvas = new OffscreenCanvas(width, height)
    const resizeCtx = resizeCanvas.getContext('2d')!
    resizeCtx.drawImage(canvas, 0, 0, width, height)

    const resized = resizeCtx.getImageData(0, 0, width, height)
    const { data } = resized

    // Float32Array: BGR順 + [-1, 1] 正規化 (NCHW形式)
    // parseq.py: resized[:,:,::-1] → BGR, 2.0*(pixel/255 - 0.5)
    const tensorData = new Float32Array(channels * height * width)
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        const pixelOffset = (h * width + w) * 4
        const r = data[pixelOffset + 0]
        const g = data[pixelOffset + 1]
        const b = data[pixelOffset + 2]
        const hw = h * width + w
        // BGR順
        tensorData[0 * height * width + hw] = 2.0 * (b / 255.0 - 0.5)
        tensorData[1 * height * width + hw] = 2.0 * (g / 255.0 - 0.5)
        tensorData[2 * height * width + hw] = 2.0 * (r / 255.0 - 0.5)
      }
    }

    return new ort.Tensor('float32', tensorData, this.inputShape)
  }

  private decodeOutput(
    outputs: Record<string, OrtType.Tensor>
  ): RecognitionResult {
    try {
      const outputName = this.session!.outputNames[0]
      const rawLogits = outputs[outputName].data as Float32Array
      const dims = outputs[outputName].dims
      const [, seqLength, vocabSize] = dims

      // parseq.py のデコード: argmax → idx==0 で停止 → charlist[idx-1]
      const resultChars: string[] = []

      for (let i = 0; i < seqLength; i++) {
        // スライスしてargmax
        let maxVal = -Infinity
        let maxIdx = 0
        const offset = i * vocabSize
        for (let v = 0; v < vocabSize; v++) {
          const val = rawLogits[offset + v]
          if (val > maxVal) {
            maxVal = val
            maxIdx = v
          }
        }

        // EOS (ID=0) で終了
        if (maxIdx === 0) break

        // charlist[idx - 1]
        const charIndex = maxIdx - 1
        if (charIndex >= 0 && charIndex < this.charList.length) {
          resultChars.push(this.charList[charIndex])
        }
      }

      return {
        text: resultChars.join('').trim(),
        confidence: 0.9,
      }
    } catch (error) {
      console.error('[KotenRec] Error decoding output:', error)
      return { text: '', confidence: 0.0 }
    }
  }

  dispose(): void {
    if (this.session) {
      this.session.release()
      this.session = null
    }
    this.initialized = false
  }
}

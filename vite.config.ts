import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ONNX Runtime Web: Viteのesbuildプリバンドルを除外（WASMバイナリが壊れるのを防ぐ）
  optimizeDeps: {
    exclude: ['onnxruntime-web', 'onnxruntime-web/wasm'],
  },

  // WASMとONNXファイルをアセットとして認識
  assetsInclude: ['**/*.wasm', '**/*.onnx'],

  build: {
    target: 'esnext',
    // CSSのコード分割を有効化（遅延ロードコンポーネントのCSSも遅延に）
    cssCodeSplit: true,
    // ソースマップはプロダクションでは無効（ビルド高速化）
    sourcemap: false,
    // minify設定（esbuildが最速）
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          // PDF読込（pdfjs-dist は大きいので独立チャンク、動的importで遅延ロード済み）
          'pdf-reader': ['pdfjs-dist'],
          // PDF生成（pdf-lib + fontkit、動的importでエクスポート時のみロード）
          'pdf-writer': ['pdf-lib', '@pdf-lib/fontkit'],
          // DOCX生成（動的importでエクスポート時のみロード）
          'docx-writer': ['docx'],
          // HEIC変換（使用頻度低い、動的import済み）
          'heic': ['heic2any'],
          // 差分表示
          'diff': ['diff-match-patch'],
          // React本体（キャッシュ効率向上）
          'react-vendor': ['react', 'react-dom'],
          // TIFF処理
          'tiff': ['utif'],
        },
      },
    },
  },

  // Web WorkerをES moduleフォーマットで出力
  worker: {
    format: 'es',
  },

  server: {
    // SharedArrayBuffer用のCOOP/COEPヘッダー（onnxruntime-webのマルチスレッド推論に必要）
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
})

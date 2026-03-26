# NDL古典籍OCR-Liteのデスクトップアプリケーション

NDL古典籍OCR-Liteの使い方を説明します。

## 起動方法
お使いのOSに対応する圧縮ファイルを展開し、ndlkotenocr_liteをダブルクリック等で実行してください。

なお、セキュリティに関する警告が出ることがあります。

Windows 10の場合は、「WindowsによってPCが保護されました」→「詳細情報」→「実行」を選んでください。

macOSの場合は、

https://zenn.dev/nakamura196/articles/c62a465537ff20

の手順に従ってください。

なお、初回の起動には1分程度時間を要することがあります。お待ちください。

## 操作方法

<img src="../resource/control.jpg" width="600">

①OCR処理をかけたいファイルまたはディレクトリを指定します。***v1.1.1からは画像（jpg,png,tiff,bmp,jp2）に加えてPDFファイルに対する処理が可能です。***

②出力先となるディレクトリを指定します。

③「OCR」ボタンを押します。

④ ディレクトリを指定した場合、OCR処理が完了した画像から処理結果のプレビューを表示できます。ファイルを指定した場合には当該ファイルの処理結果が表示されます。

## 自分でアプリケーションをビルドする場合の方法（開発者向け情報）
本アプリケーションは[Flet（外部サイト）](https://flet.dev/)を利用します。

いずれのOSの場合にも事前にFlutter-SDKの導入が必要です。依存関係のインストールに関する説明は省略します。

### Windowsの場合
https://flet.dev/docs/publish/windows/
も参照してください。
```
#(コマンドプロンプトを利用、ndlkotenocr-lite-guiと同階層で実行する)
python3 -m venv ocrenv
.\ocrenv\Scripts\activate
pip install flet==0.24.1
xcopy ..\src .\src
flet build windows
```

### Macの場合

```
#(ndlkotenocr-lite-guiと同階層で実行する)
python3 -m venv ocrenv
source ./ocrenv/bin/activate
pip install flet==0.24.1
cp -r ../src .
flet build macos
```

### Linuxの場合
```
#(ndlkotenocr-lite-guiと同階層で実行する)
python3 -m venv ocrenv
source ./ocrenv/bin/activate
pip install flet==0.24.1
cp -r ../src .
flet build linux
```

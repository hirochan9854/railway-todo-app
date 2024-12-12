# 初期設定

## 必要なツール

1. Node.js v16以降推奨
2. Yarn v1
3. Visual Studio Code

上記 3 つをインストールする必要があります。インストールできているかの確認やインストール方法は、
[Railway 準備編](https://www.notion.so/techbowl/Railway-ceba695d5014460e9733c2a46318cdec) をご確認いただき、挑戦の準備をしましょう。

その他リポジトリの更新の仕方や、トラブルシューティングについても上記の Railway 準備編にございます。
何かあった際は、まずそちらを確認しましょう。

## .envファイルの設定

クローンしたリポジトリには .env.sample というファイルがあります。それをコピーしたものを .env にファイル名を変更してください。  
Fork して最初の状態では API の URL を .env ファイルから読み込むようになっています。それを自身の .env に追記してください。

## パッケージのインストール

Clone したばかりのリポジトリは歯抜けの状態なので、必要なファイルをダウンロードする必要があります。 10 分程度掛かることもあるため、気長に待ちましょう。上から順番に **１つずつ** コマンドを実行しましょう。

```powershell
cd railway-todo-app

yarn install
```

## ローカルサーバの起動

以下コマンドを実行します。

```powershell
yarn start
```

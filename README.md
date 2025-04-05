# Node.jsウェブアプリケーション開発

## 概要
このプロジェクトは、Node.jsとExpressフレームワークを使用したウェブアプリケーション開発の学習用リポジトリです。

## プロジェクト構成
- `/sample` - Node.jsの基本操作（ファイル操作、JSON処理など）の学習用コード
- `/web-server` - Express.jsを使用したウェブサーバーの実装

## 学習内容
### 完了
- Node.jsの基本概念
- ファイル操作（fs モジュール）
- JSONデータの取り扱い
- モジュールのエクスポート/インポート
- 非同期処理の基礎
- Express.jsの基本設定
- ルーティング
- ミドルウェアの使用
- 静的ファイルの提供
- フォーム処理とリダイレクト

### 予定
- RESTful APIの実装
- データベース連携
- テンプレートエンジンの導入
- ユーザー認証の実装
- エラー処理の強化

## 環境構築
```bash
npm install
```

## ウェブサーバーの起動
```bash
cd web-server
node index.js
```
サーバーは http://localhost:3000 で起動します。

## 使用技術
- Node.js
- Express.js
- その他必要なパッケージ

## 注意事項
- node_modulesディレクトリはGitの管理対象外です
- Gitコマンドでパスを指定する場合は、リビジョンとパスを区別するために `--` を使用してください
  例: `git reset -- node_modules/ -q`

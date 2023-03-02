# nextjs-tailwind-template

TypeScript / React / Next.js / tailwind.css を利用する場合のテンプレートです。OGP や外部リンクなど、個人的によく使うコンポーネントをデフォルトで入れています。

## 開発

### フロント

環境変数

- `.env.example`を複製し、`.env.local`にリネーム

開発サーバ

```bash
yarn dev
```

ビルド

```bash
yarn build
```

Lint / format

```bash
yarn chcek # ESLint and prettier
yarn fix # ESLint and prettier (auto fix)
```

## ポケットサイン環境構築

### 1. ngrok アクセストークンの取得

https://dashboard.ngrok.com/signup
Your Authentication から authtoken を控えておく。

### 2. サービス ID

Slack の資料から取得

### 3. 1,2 で取得した情報を package.json に追加する

```
cp .env.example .env
```

.env が作成されるので、編集する

```
NGROK_AUTHTOKEN=<1で取得したngrokのauthtoken>
SERVICE_ID=<2で取得したサービスID>
```

### 4. 依存関係

次のコマンドを実行する

```bash
npm install
```

## ポケットサインでデバッグする

### 1. ローカルホストを立ち上げる

```bash
npm run dev
```

### 2. ngrok サーバを立ち上げる

```bash
npm run ngrok
```

**※Forwarding の URL を控えておく**

### 3. QR コードを生成する

```bash
npm run qrcode <1 で控えた URL>
```

### 4. ポケットサインアプリとの繋ぎ込み

3 を実行すると、ルートディレクトリに QRCODE.png が生成されるので、それをポケットサインアプリで読み込む

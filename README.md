# New Vibes - Sanity連携ブログサイト

Next.js + Sanity CMSで構築された、モダンなブログサイトです。

## 特徴

- **Next.js 15** - 最新のReactフレームワーク
- **Sanity CMS** - ヘッドレスCMS
- **Tailwind CSS** - ユーティリティファーストCSS
- **TypeScript** - 型安全性
- **レスポンシブデザイン** - モバイルファースト
- **SEO最適化** - メタタグ、サイトマップ、OGP対応
- **Google Analytics** - アクセス解析

## 主要機能

### ブログ機能
- 記事一覧表示
- 個別記事ページ
- カテゴリー別記事表示
- タグ別記事表示
- 目次機能（TOC）- 見出しから自動生成
- 記事検索（準備中）

### コンテンツ管理
- Sanity Studioでの記事作成・編集
- 画像アップロード
- カテゴリー・タグ管理
- プロフィール情報管理

### SEO・パフォーマンス
- 静的サイト生成（SSG）
- 画像最適化
- サイトマップ自動生成
- メタタグ自動生成
- OGP対応

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example`を`.env.local`にコピーして、必要な値を設定してください。

```bash
cp .env.local.example .env.local
```

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Sanity Studioの起動

別のターミナルでSanity Studioを起動してください：

```bash
cd ../studio-new-vibes
npm run dev
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でサイトを確認できます。

## ディレクトリ構成

```
src/
├── app/                 # Next.js App Router
│   ├── blog/           # ブログ関連ページ
│   ├── profile/        # プロフィールページ
│   ├── contact/        # お問い合わせページ
│   └── ...
├── components/         # 再利用可能なコンポーネント
├── lib/               # ユーティリティ関数
├── sanity/            # Sanityクライアント設定
└── types/             # TypeScript型定義
```

## コンテンツ管理

### Sanity Studio

1. http://localhost:3333 でSanity Studioにアクセス
2. 以下のコンテンツタイプを管理できます：
   - **Post** - ブログ記事
   - **Category** - カテゴリー
   - **Tag** - タグ
   - **Profile** - プロフィール情報

### 記事の作成

1. Sanity Studioで「Post」を選択
2. 必要な情報を入力：
   - タイトル
   - スラッグ（URL用）
   - 抜粋
   - 本文
   - カテゴリー・タグ
   - アイキャッチ画像
3. 「Publish」で公開

## デプロイ

### Vercel（推奨）

1. Vercelアカウントを作成
2. GitHubリポジトリと連携
3. 環境変数を設定
4. デプロイ

### その他のプラットフォーム

```bash
npm run build
npm start
```

## カスタマイズ

### デザインの変更

- `tailwind.config.ts` - Tailwind CSS設定
- `src/app/globals.css` - グローバルスタイル
- `src/components/` - コンポーネントスタイル

### 機能の追加

- `src/lib/sanity.ts` - Sanityクエリ
- `studio-new-vibes/schemaTypes/` - Sanityスキーマ

## 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **スタイリング**: Tailwind CSS
- **CMS**: Sanity
- **デプロイ**: Vercel（推奨）
- **分析**: Google Analytics

## ライセンス

MIT License

## サポート

ご質問やバグ報告は、GitHubのIssuesでお願いします。
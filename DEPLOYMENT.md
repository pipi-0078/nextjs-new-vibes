# 🚀 Vercelデプロイ手順

## 1. GitHubリポジトリの準備

```bash
# GitHubに新しいリポジトリを作成後、リモートを追加
git remote add origin https://github.com/YOUR_USERNAME/nextjs-new-vibes.git
git push -u origin main
```

## 2. Vercelでのデプロイ

### 自動デプロイ方法（推奨）

1. **Vercelにアクセス**: https://vercel.com
2. **GitHubでログイン**
3. **「New Project」をクリック**
4. **GitHubリポジトリを選択**
5. **プロジェクト設定**:
   - Project Name: `nextjs-new-vibes`
   - Framework Preset: `Next.js`
   - Root Directory: `./` (デフォルト)

### 3. 環境変数の設定

Vercelダッシュボードで以下の環境変数を追加：

```
NEXT_PUBLIC_SANITY_PROJECT_ID=h8jbyz2f
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. デプロイ実行

「Deploy」ボタンをクリックしてデプロイを開始

## 🎯 デプロイ後の確認事項

### ✅ 動作確認
- ホームページの表示
- ブログページの表示
- Sanity CMSとの連携

### ✅ Sanity Studio設定
1. Sanity Studio (localhost:3333) でCORS設定
2. 本番ドメインを許可リストに追加
3. コンテンツの作成・公開

## 🔧 トラブルシューティング

### ビルドエラーの場合
```bash
# ローカルでビルド確認
npm run build

# 型エラーがある場合
npm run lint
```

### 画像が表示されない場合
- Sanity画像URLの確認
- next.config.tsの画像ドメイン設定確認

## 📱 動作確認URL

デプロイ完了後、以下のページが動作することを確認：

- `/` - ホームページ
- `/blog` - ブログ一覧
- `/profile` - プロフィール
- `/contact` - お問い合わせ
- `/blog/[slug]` - 個別記事（コンテンツ作成後）

## 🎨 Sanity Studioでのコンテンツ作成

1. **プロフィール作成** (Profile)
2. **カテゴリー作成** (Category) 
3. **タグ作成** (Tag)
4. **ブログ記事作成** (Post)

これでフル機能のブログサイトが完成です！
import { createClient, type SanityClient } from "next-sanity";

// プロジェクト設定
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "h8jbyz2f";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

// 通常のクライアント（公開済みコンテンツのみ）
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

// Write operations用のクライアント（サーバーサイドのみ）
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // 書き込み権限のあるトークン
});

/**
 * プレビューモードかどうかで設定を切り替えるクライアントを返す関数
 * @param isDraftMode プレビューモードかどうか
 */
export function getClient(isDraftMode: boolean = false): SanityClient {
  if (isDraftMode) {
    // プレビューモード用クライアント（ドラフトを含む）
    return client.withConfig({
      token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      // 下書きを含めて取得するための重要な設定
      perspective: 'drafts',
    });
  }
  
  // 通常モード（公開済みのみ）
  return client;
}


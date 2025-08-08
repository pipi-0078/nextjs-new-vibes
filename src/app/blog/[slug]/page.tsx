import { notFound } from "next/navigation";
import { getPost, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortableText from "@/components/PortableText";
import dynamic from 'next/dynamic';

const TableOfContents = dynamic(() => import('@/components/TableOfContents'), {
  loading: () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">目次</h3>
      <p className="text-gray-600 text-sm">目次を読み込み中...</p>
    </div>
  )
});
import type { Category, Tag } from "@/types/blog";
import { draftMode } from "next/headers";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "記事が見つかりません - New Vibes",
    };
  }

  return {
    title: `${post.title} - New Vibes`,
    description: post.excerpt || `${post.title}についての記事です。`,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title}についての記事です。`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: post.image ? [
        {
          url: urlFor(post.image).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.image.alt || post.title,
        }
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `${post.title}についての記事です。`,
      images: post.image ? [urlFor(post.image).width(1200).height(630).url()] : [],
    },
  };
}

// 見出しを抽出するヘルパー関数
function extractHeadings(blocks: any[]) {
  try {
    if (!Array.isArray(blocks)) return []
    
    return blocks
      .filter((block) => {
        return (
          block && 
          typeof block === 'object' &&
          block._type === 'block' && 
          block.style &&
          ['h1', 'h2', 'h3', 'h4'].includes(block.style) &&
          Array.isArray(block.children)
        )
      })
      .map((block) => {
        const text = block.children
          ?.map((child: any) => (child && child.text) ? child.text : '')
          .join('')
          .trim() || ''
        
        if (!text) return null
        
        const id = `heading-${block._key || block.style}-${text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
        return {
          id,
          text,
          level: parseInt(block.style.substring(1)) || 2
        }
      })
      .filter((item): item is { id: string; text: string; level: number } => item !== null)
  } catch (error) {
    console.error('Error extracting headings:', error)
    return []
  }
}

export default async function BlogPostPage({ params, searchParams }: Props & { searchParams: Promise<{ preview?: string }> }) {
  const { slug } = await params;
  const searchParamsResult = await searchParams;
  const isPreview = searchParamsResult?.preview === 'true';
  
  console.log('=== BLOG POST PAGE ===');
  console.log('Slug:', slug);
  console.log('Search params:', searchParamsResult);
  console.log('Is preview:', isPreview);
  
  // プレビューモードの場合は手動でドラフトモードを有効化
  if (isPreview) {
    const draft = await draftMode();
    draft.enable();
    console.log('Draft mode enabled for preview');
  }
  
  // ドラフトモードの状態を確認
  const { isEnabled: isDraftMode } = await draftMode();
  console.log('Draft mode is enabled:', isDraftMode);
  
  const post = await getPost(slug);
  console.log('Post result:', {
    found: !!post,
    title: post?.title,
    draft: post?.draft,
    publishedAt: post?.publishedAt
  });

  if (!post) {
    console.log('Post not found, showing 404');
    notFound();
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/blog/${slug}`;
  const xShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const hatenaShareUrl = `https://b.hatena.ne.jp/entry/${encodeURIComponent(shareUrl)}`;

  // 目次用の見出し抽出（安全にエラーハンドリング）
  let headings: { id: string; text: string; level: number }[] = []
  try {
    if (post.body && Array.isArray(post.body)) {
      headings = extractHeadings(post.body)
    }
  } catch (error) {
    console.error('Heading extraction failed:', error)
    headings = []
  }

  return (
    <div className="min-h-screen bg-white">
      {isDraftMode && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">プレビューモード</p>
              <p className="text-sm">このページはプレビューモードで表示されています。下書きコンテンツが含まれている可能性があります。</p>
            </div>
            <a
              href="/api/disable-preview"
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-700 transition-colors"
            >
              プレビューを終了
            </a>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          <article className="flex-1 max-w-4xl mx-auto lg:mx-0 bg-white text-gray-800">
      <div className="mb-8">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          ブログ一覧に戻る
        </Link>
      </div>

      {post.image && (
        <div className="mb-8">
          <Image
            src={urlFor(post.image).width(800).height(400).url()}
            alt={post.image.alt || post.title}
            width={800}
            height={400}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category: Category) => (
              <Link
                key={category.slug.current}
                href={`/blog/category/${category.slug.current}`}
                className="px-3 py-1 text-sm font-medium rounded-full hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: category.color + '20', 
                  color: category.color 
                }}
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span>
              公開日: {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
            </span>
            {post.updatedAt && post.updatedAt !== post.publishedAt && (
              <span>
                更新日: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span>シェア:</span>
            <a
              href={xShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 transition-colors"
              aria-label="𝕏でシェア"
            >
              𝕏
            </a>
            <a
              href={facebookShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors"
              aria-label="Facebookでシェア"
            >
              Facebook
            </a>
            <a
              href={hatenaShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-800 transition-colors"
              aria-label="はてなブックマークでシェア"
            >
              はてな
            </a>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: Tag) => (
              <Link
                key={tag.slug.current}
                href={`/blog/tag/${tag.slug.current}`}
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors"
              >
                #{tag.title}
              </Link>
            ))}
          </div>
        )}
      </header>

      {post.body && (
        <div className="prose prose-lg max-w-none prose-gray bg-white text-gray-800">
          <PortableText value={post.body} headings={headings} showInlineTOC={true} />
        </div>
      )}

      <footer className="mt-12 pt-8 border-t border-gray-200 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">この記事をシェア</h3>
            <div className="flex space-x-4">
              <a
                href={xShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                𝕏
              </a>
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </div>
          
          <Link 
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
          >
            他の記事を読む
          </Link>
        </div>
            </footer>
          </article>

          {/* 右サイドバー */}
          <aside className="hidden lg:block w-full lg:w-72 xl:w-80 flex-shrink-0">
            <TableOfContents headings={headings || []} />
          </aside>
        </div>
      </div>
    </div>
  );
}
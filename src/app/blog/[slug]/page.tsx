import { notFound } from "next/navigation";
import { getPost, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PortableText from "@/components/PortableText";
import type { Category, Tag } from "@/types/blog";

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/blog/${slug}`;
  const xShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const hatenaShareUrl = `https://b.hatena.ne.jp/entry/${encodeURIComponent(shareUrl)}`;

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white text-gray-800">
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
          <PortableText value={post.body} />
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
    </div>
  );
}
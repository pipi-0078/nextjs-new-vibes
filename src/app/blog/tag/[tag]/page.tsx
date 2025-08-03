import Link from "next/link";
import Image from "next/image";
import { getPostsByTag, getTags, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Post, Category, Tag } from "@/types/blog";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const [, tags] = await Promise.all([
    getPostsByTag(tag, 0, 1),
    getTags()
  ]);
  
  const tagData = tags.find((t: Tag) => t.slug.current === tag);
  
  if (!tagData) {
    return {
      title: "タグが見つかりません - New Vibes",
    };
  }

  return {
    title: `#${tagData.title} - New Vibes`,
    description: tagData.description || `${tagData.title}に関する記事一覧です。`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const [posts, tags] = await Promise.all([
    getPostsByTag(tag, 0, 20),
    getTags()
  ]);
  
  const tagData = tags.find((t: Tag) => t.slug.current === tag);
  
  if (!tagData) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          #{tagData.title}
        </h1>
        {tagData.description && (
          <p className="text-xl text-gray-600">
            {tagData.description}
          </p>
        )}
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: Post) => (
            <article key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {post.image && (
                <div className="h-48 relative">
                  <Image
                    src={urlFor(post.image).width(400).height(200).url()}
                    alt={post.image.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category: Category) => (
                      <Link
                        key={category.slug.current}
                        href={`/blog/category/${category.slug.current}`}
                        className="px-3 py-1 text-xs font-medium rounded-full hover:opacity-80 transition-opacity"
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
                
                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${post.slug.current}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                  </span>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag: Tag) => (
                        <Link
                          key={tag.slug.current}
                          href={`/blog/tag/${tag.slug.current}`}
                          className="text-xs text-gray-500 hover:text-primary-600 transition-colors"
                        >
                          #{tag.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">このタグの記事はまだありません。</p>
          <Link 
            href="/blog"
            className="inline-block mt-4 text-primary-600 hover:text-primary-700 transition-colors"
          >
            他の記事を見る
          </Link>
        </div>
      )}
    </div>
  );
}
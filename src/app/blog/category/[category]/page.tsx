import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory, getCategories, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const [posts, categories] = await Promise.all([
    getPostsByCategory(category, 0, 1),
    getCategories()
  ]);
  
  const categoryData = categories.find((cat: any) => cat.slug.current === category);
  
  if (!categoryData) {
    return {
      title: "カテゴリーが見つかりません - New Vibes",
    };
  }

  return {
    title: `${categoryData.title} - New Vibes`,
    description: categoryData.description || `${categoryData.title}に関する記事一覧です。`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const [posts, categories] = await Promise.all([
    getPostsByCategory(category, 0, 20),
    getCategories()
  ]);
  
  const categoryData = categories.find((cat: any) => cat.slug.current === category);
  
  if (!categoryData) {
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
        <div className="flex items-center justify-center mb-4">
          <div 
            className="w-6 h-6 rounded-full mr-3"
            style={{ backgroundColor: categoryData.color }}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {categoryData.title}
          </h1>
        </div>
        {categoryData.description && (
          <p className="text-xl text-gray-600">
            {categoryData.description}
          </p>
        )}
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
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
                    {post.categories.map((category: any) => (
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
                      {post.tags.slice(0, 2).map((tag: any) => (
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
          <p className="text-gray-500">このカテゴリーの記事はまだありません。</p>
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
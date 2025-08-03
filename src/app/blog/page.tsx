import Link from "next/link";
import Image from "next/image";
import { getPosts, getCategories, getTags, urlFor } from "@/lib/sanity";
import type { Metadata } from "next";
import type { Post, Category, Tag } from "@/types/blog";

export const metadata: Metadata = {
  title: "ブログ - New Vibes",
  description: "最新のテクノロジーとライフスタイルに関する記事一覧",
};

export const revalidate = 3600;

export default async function BlogPage() {
  const [posts, categories, tags] = await Promise.all([
    getPosts(0, 20),
    getCategories(),
    getTags()
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          ブログ
        </h1>
        <p className="text-xl text-gray-600">
          最新のテクノロジーとライフスタイルについての記事をお届けします
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {posts && posts.length > 0 ? (
            <div className="space-y-8">
              {posts.map((post: Post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="md:flex">
                    {post.image && (
                      <div className="md:w-1/3">
                        <Link href={`/blog/${post.slug.current}`}>
                          <div className="h-48 md:h-full relative cursor-pointer hover:opacity-90 transition-opacity">
                            <Image
                              src={urlFor(post.image).width(400).height(300).url()}
                              alt={post.image.alt || post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                      </div>
                    )}
                    <div className={`p-6 ${post.image ? 'md:w-2/3' : 'w-full'}`}>
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
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                        <Link href={`/blog/${post.slug.current}`}>
                          {post.title}
                        </Link>
                      </h2>
                      
                      {post.excerpt && (
                        <Link href={`/blog/${post.slug.current}`}>
                          <p className="text-gray-600 mb-4 line-clamp-3 cursor-pointer hover:text-gray-800 transition-colors">
                            {post.excerpt}
                          </p>
                        </Link>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                          </span>
                          {post.updatedAt && post.updatedAt !== post.publishedAt && (
                            <span className="text-sm text-gray-400">
                              更新: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}
                            </span>
                          )}
                        </div>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag: Tag) => (
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
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">まだ記事がありません。</p>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="space-y-8">
            {/* Categories */}
            {categories && categories.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  カテゴリー
                </h3>
                <div className="space-y-2">
                  {categories.map((category: Category) => (
                    <Link
                      key={category._id}
                      href={`/blog/category/${category.slug.current}`}
                      className="block px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-gray-700">{category.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  タグ
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: Tag) => (
                    <Link
                      key={tag._id}
                      href={`/blog/tag/${tag.slug.current}`}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      {tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Search placeholder - will be implemented later */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                記事を検索
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="キーワードを入力..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">検索機能は準備中です</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
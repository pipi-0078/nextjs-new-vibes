import Link from "next/link";
import Image from "next/image";
import { getFeaturedPosts, getProfile, urlFor } from "@/lib/sanity";
import type { Post, Category, Experience } from "@/types/blog";
import ScrollReveal from "@/components/ScrollReveal";

export const revalidate = 0;

export default async function HomePage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const searchParamsResult = await searchParams;
  const isPreview = searchParamsResult?.preview === 'true';
  
  console.log('Home page - Preview mode detection:', {
    isPreview,
    searchParams: searchParamsResult
  });
  
  // プレビューモードの場合は手動でドラフトモードを有効化
  if (isPreview) {
    const { draftMode } = await import('next/headers');
    const draft = await draftMode();
    draft.enable();
    console.log('Draft mode enabled for home preview');
  }
  
  const [featuredPosts, profile] = await Promise.all([
    getFeaturedPosts(),
    getProfile()
  ]);

  return (
    <>
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8 leading-tight">
                {profile?.catchphrase || "仏教をもっと近くに"}
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                {profile?.bio || "古来の智慧と現代のマインドフルネスを融合させ、心の豊かさを追求する旅路をご案内します。"}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Link 
                  href="/blog" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="relative z-10">ブログを読む</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link 
                  href="/profile" 
                  className="group relative px-8 py-4 border-2 border-purple-400 text-purple-300 font-semibold rounded-xl hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm bg-white/5"
                >
                  プロフィール
                </Link>
              </div>
            </div>
            
            {profile?.profileImage && (
              <div className="flex justify-center lg:justify-end">
                <div className="w-80 h-80 relative">
                  <Image
                    src={urlFor(profile.profileImage).width(400).height(400).url()}
                    alt={profile.profileImage.alt || profile.name || "Profile"}
                    fill
                    className="rounded-full object-cover shadow-2xl"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <ScrollReveal animation="fade-up">
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-400/30 text-purple-300 text-sm font-medium rounded-full backdrop-blur-sm">
                  📖 Featured Articles
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6">
                注目の記事
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                心の成長と平安をもたらす、厳選された智慧の記事をお届けします
              </p>
            </div>

          {featuredPosts && featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post: Post, index: number) => (
                <ScrollReveal 
                  key={post._id} 
                  animation="fade-up" 
                  delay={100 + (index * 100)}
                >
                  <article className="group bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/50">
                  {post.image && (
                    <Link href={`/blog/${post.slug.current}`}>
                      <div className="h-48 relative cursor-pointer hover:opacity-90 transition-opacity">
                        <Image
                          src={urlFor(post.image).width(400).height(200).url()}
                          alt={post.image.alt || post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category: Category) => (
                          <span
                            key={category.slug.current}
                            className="px-3 py-1 text-xs font-medium rounded-full"
                            style={{ 
                              backgroundColor: category.color + '20', 
                              color: category.color 
                            }}
                          >
                            {category.title}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                      <Link 
                        href={`/blog/${post.slug.current}`}
                        className="hover:text-primary-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <Link href={`/blog/${post.slug.current}`}>
                        <p className="text-gray-300 mb-4 line-clamp-3 cursor-pointer hover:text-white transition-colors">
                          {post.excerpt}
                        </p>
                      </Link>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                      </span>
                      <Link 
                        href={`/blog/${post.slug.current}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        続きを読む →
                      </Link>
                    </div>
                  </div>
                </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">まだ記事がありません。</p>
            </div>
          )}

          <div className="text-center mt-16">
            <Link 
              href="/blog"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="bg-transparent">すべての記事を見る</span>
              <span className="ml-2 bg-transparent transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          </div>
        </section>
      </ScrollReveal>

      {profile?.experience && profile.experience.length > 0 && (
        <ScrollReveal animation="fade-left">
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-400/30 text-purple-300 text-sm font-medium rounded-full backdrop-blur-sm">
                    🎯 Experience
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
                  経歴・実績
                </h2>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.experience.map((exp: Experience, index: number) => (
                <ScrollReveal 
                  key={index} 
                  animation="fade-left" 
                  delay={100 + (index * 150)}
                >
                  <div className="group bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg transition-all duration-500 hover:transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-700/50 hover:border-purple-500/50">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {exp.position}
                  </h3>
                  <p className="text-purple-400 font-medium mb-2">
                    {exp.company}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {exp.period}
                  </p>
                  {exp.description && (
                    <p className="text-gray-300">
                      {exp.description}
                    </p>
                  )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {profile?.socialLinks && (
        <ScrollReveal animation="fade-right">
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-400/30 text-purple-300 text-sm font-medium rounded-full backdrop-blur-sm">
                  🌐 Connect
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-12">
                SNSでフォロー
              </h2>
            <div className="flex justify-center space-x-6">
              {profile.socialLinks.twitter && (
                <a 
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <span className="sr-only">𝕏</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.instagram && (
                <a 
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.youtube && (
                <a 
                  href={profile.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              {profile.socialLinks.github && (
                <a 
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <span className="sr-only">GitHub</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a 
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      <ScrollReveal animation="fade-scale">
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-elegant bg-gradient-to-r from-amber-200 via-orange-300 to-pink-300 bg-clip-text text-transparent mb-8 leading-tight">
            KOKORO TERASU
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            浄土真宗の真髄「歎異抄」の超訳や、マインドフルネスについて解説。<br />
            <span className="text-purple-300">古の智慧と現代の心理学が織りなす、新しい学びの場所</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a 
              href="https://kokoro-terasu.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 mr-3 bg-transparent">KOKORO TERASUはこちら</span>
              <span className="relative z-10 text-2xl bg-transparent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">→</span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 blur-lg group-hover:opacity-50 group-hover:blur-xl transition-all duration-300"></div>
            </a>
          </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
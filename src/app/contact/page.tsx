import { getProfile } from "@/lib/sanity";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ - New Vibes",
  description: "New Vibesへのお問い合わせページです。",
};

export const revalidate = 0;

export default async function ContactPage() {
  const profile = await getProfile();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          お問い合わせ
        </h1>
        <p className="text-xl text-gray-600">
          ご質問やご相談がございましたら、お気軽にお問い合わせください。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            お問い合わせ方法
          </h2>
          
          <div className="space-y-6">
            {profile?.contactEmail && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    メール
                  </h3>
                  <p className="text-gray-600 mb-3">
                    最も確実な連絡方法です。24時間以内にご返信いたします。
                  </p>
                  <a 
                    href={`mailto:${profile.contactEmail}`}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {profile.contactEmail}
                  </a>
                </div>
              </div>
            )}

            {profile?.socialLinks?.twitter && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    𝕏
                  </h3>
                  <p className="text-gray-600 mb-3">
                    DMまたはメンションでお気軽にお声がけください。
                  </p>
                  <a 
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
𝕏で連絡
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ブログコメント
                </h3>
                <p className="text-gray-600">
                  各記事のコメント欄からもお気軽にメッセージをお送りください。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            よくあるご質問
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                記事の執筆依頼について
              </h3>
              <p className="text-gray-600">
                ゲスト記事の執筆やコラボレーションについてはメールでご相談ください。
                テーマや条件について詳しくお話しさせていただきます。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                取材・インタビューについて
              </h3>
              <p className="text-gray-600">
                メディア取材やポッドキャストへの出演については、
                事前にメールでお問い合わせください。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                技術相談について
              </h3>
              <p className="text-gray-600">
                技術的な質問や相談については、可能な限りお答えいたします。
                ただし、個別のプロジェクトサポートは承っておりません。
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                返信について
              </h3>
              <p className="text-gray-600">
                通常24時間以内にご返信いたします。
                お急ぎの場合はその旨をお書き添えください。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          お気軽にお問い合わせください
        </h2>
        <p className="text-gray-600 mb-6">
          技術的な質問、コラボレーション、その他どのようなことでもお気軽にご連絡ください。
          できる限り迅速にご返信いたします。
        </p>
        {profile?.contactEmail && (
          <a 
            href={`mailto:${profile.contactEmail}`}
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            メールでお問い合わせ
          </a>
        )}
      </div>
    </div>
  );
}
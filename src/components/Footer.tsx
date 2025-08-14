import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-elegant text-white mb-4">KOKORO TERASU 破</h3>
            <p className="text-gray-300">
              最新のテクノロジーとライフスタイルについて発信するブログサイトです。
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">ナビゲーション</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-purple-400 transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-300 hover:text-purple-400 transition-colors">
                  プロフィール
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} KOKORO TERASU 破. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
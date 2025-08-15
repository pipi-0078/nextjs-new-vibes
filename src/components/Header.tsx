'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-elegant text-white hover:text-purple-400 transition-colors">
            KOKORO TERASU <span className="ha-char">破</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              ホーム
            </Link>
            <Link href="/blog" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              ブログ
            </Link>
            <Link href="/profile" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              プロフィール
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">
              お問い合わせ
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-purple-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ブログ
              </Link>
              <Link 
                href="/profile" 
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                プロフィール
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-purple-400 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
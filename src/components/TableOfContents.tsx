'use client'

import { useState } from 'react'

interface HeadingItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: HeadingItem[]
  className?: string
  collapsible?: boolean
}

export default function TableOfContents({ headings, className = '', collapsible = false }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  if (headings.length === 0) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm w-full mx-auto ${className}`}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center justify-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          目次
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm text-center">この記事には見出しが含まれていません</p>
      </div>
    )
  }

  const scrollToHeading = (id: string) => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // アコーディオンモードの場合、表示する見出しの数を制限
  const displayedHeadings = collapsible && !isExpanded 
    ? headings.slice(0, Math.ceil(headings.length / 2))
    : headings

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm w-full mx-auto ${className}`}>
      <div className="flex items-center justify-center mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          目次
        </h3>
        {collapsible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-gray-500 hover:text-primary-600 transition-colors"
            aria-label={isExpanded ? '目次を閉じる' : '目次を全て表示'}
          >
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
      <nav className="w-full max-w-sm mx-auto">
        <ul className="space-y-1 sm:space-y-2">
          {displayedHeadings.map((heading) => (
            <li 
              key={heading.id}
              className="w-full"
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="block w-full text-left py-1 px-2 rounded text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200 whitespace-normal break-words"
                style={{ 
                  fontSize: '0.8em',
                  lineHeight: '1.4'
                }}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
        {collapsible && headings.length > displayedHeadings.length && (
          <div className="text-center mt-2">
            <span className="text-xs text-gray-400">
              {isExpanded ? '' : `他 ${headings.length - displayedHeadings.length} 項目`}
            </span>
          </div>
        )}
      </nav>
    </div>
  )
}
'use client'

interface HeadingItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: HeadingItem[]
  className?: string
}

export default function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  if (headings.length === 0) {
    return (
      <div className={`bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm ${className}`}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          目次
        </h3>
        <p className="text-gray-500 text-xs sm:text-sm">この記事には見出しが含まれていません</p>
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

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 shadow-sm ${className}`}>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        目次
      </h3>
      <nav className="overflow-hidden">
        <ul className="space-y-1 sm:space-y-2">
          {headings.map((heading) => (
            <li 
              key={heading.id}
              className="relative"
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className="block w-full text-left py-1 rounded text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200 truncate sm:whitespace-normal"
                style={{ 
                  fontSize: '0.8em',
                  paddingLeft: `${(heading.level - 1) * 8 + 8}px`,
                  paddingRight: '8px'
                }}
                title={heading.text}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
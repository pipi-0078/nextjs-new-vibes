import { PortableText as PT, PortableTextReactComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'
import React from 'react'
import dynamic from 'next/dynamic'

const TableOfContents = dynamic(() => import('./TableOfContents'), {
  loading: () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">目次</h3>
      <p className="text-gray-600 text-sm">目次を読み込み中...</p>
    </div>
  )
})

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8 bg-white">
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
          {value.alt && (
            <p className="text-center text-sm text-gray-600 mt-2 bg-white">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
    table: ({ value }) => {
      if (!value?.csvInput) {
        return null
      }
      
      // Parse CSV/TSV input to get headers and rows
      const lines = value.csvInput.trim().split('\n')
      if (lines.length === 0) return null
      
      // Detect delimiter (tab or comma)
      const firstLine = lines[0]
      const isTabSeparated = firstLine.includes('\t') && !firstLine.includes(',')
      const delimiter = isTabSeparated ? '\t' : ','
      
      const headers = lines[0].split(delimiter).map((h: string) => h.trim())
      const rows = lines.slice(1).map((line: string) => 
        line.split(delimiter).map((cell: string) => cell.trim())
      )
      
      return (
        <div className="my-8 bg-white">
          {value.title && (
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {value.title}
            </h3>
          )}
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full border-collapse min-w-full">
              <thead className={`${headers.length > 0 && 'bg-gray-50'}`}>
                <tr>
                  {headers.map((header: string, index: number) => (
                    <th 
                      key={index}
                      className={`
                        border-r border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap
                        ${index === 0 ? 'sticky left-0 z-10 shadow-sm' : 'bg-gray-50'}
                        ${index === headers.length - 1 ? 'border-r-0' : ''}
                      `}
                      style={index === 0 ? {
                        minWidth: '120px',
                        backgroundColor: '#f1f5f9',
                        backgroundImage: 'none'
                      } : {}}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td 
                        key={cellIndex}
                        className={`
                          border-r border-b border-gray-200 px-4 py-2 text-gray-800 whitespace-nowrap
                          ${cellIndex === 0 ? 'sticky left-0 z-10 shadow-sm font-medium' : ''}
                          ${cellIndex === row.length - 1 ? 'border-r-0' : ''}
                          ${rowIndex === rows.length - 1 ? 'border-b-0' : ''}
                        `}
                        style={cellIndex === 0 ? {
                          minWidth: '120px',
                          backgroundColor: rowIndex % 2 === 0 ? '#e2e8f0' : '#cbd5e1',
                          backgroundImage: 'none'
                        } : {
                          backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb'
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {value.caption && (
            <p className="text-sm text-gray-600 mt-2 italic text-center">
              {value.caption}
            </p>
          )}
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      return (
        <a 
          href={value.href} 
          rel={rel}
          className="text-primary-600 hover:text-primary-700 underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children, value }) => {
      const text = value?.children?.map((child: any) => child.text || '').join('').trim() || ''
      const id = `heading-${value?._key || 'h1'}-${text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
      return (
        <h1 id={id} className="text-3xl md:text-4xl font-bold text-gray-800 mt-12 mb-6 bg-white scroll-mt-4">
          {children}
        </h1>
      )
    },
    h2: ({ children, value }) => {
      const text = value?.children?.map((child: any) => child.text || '').join('').trim() || ''
      const id = `heading-${value?._key || 'h2'}-${text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
      return (
        <h2 id={id} className="text-2xl md:text-3xl font-bold text-gray-800 mt-16 mb-6 bg-white scroll-mt-4">
          {children}
        </h2>
      )
    },
    h3: ({ children, value }) => {
      const text = value?.children?.map((child: any) => child.text || '').join('').trim() || ''
      const id = `heading-${value?._key || 'h3'}-${text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
      return (
        <h3 id={id} className="text-xl md:text-2xl font-semibold text-gray-800 mt-10 mb-4 bg-white scroll-mt-4">
          {children}
        </h3>
      )
    },
    h4: ({ children, value }) => {
      const text = value?.children?.map((child: any) => child.text || '').join('').trim() || ''
      const id = `heading-${value?._key || 'h4'}-${text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
      return (
        <h4 id={id} className="text-lg md:text-xl font-semibold text-gray-800 mt-8 mb-4 bg-white scroll-mt-4">
          {children}
        </h4>
      )
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-200 pl-6 py-3 my-8 text-gray-700 italic bg-white rounded-r-lg border border-gray-200">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-gray-800 leading-relaxed mb-6 bg-white">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-3 mb-6 text-gray-800 bg-white">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-3 mb-6 text-gray-800 bg-white">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="ml-4 text-gray-800 bg-white">{children}</li>
    ),
    number: ({ children }) => (
      <li className="ml-4 text-gray-800 bg-white">{children}</li>
    ),
  },
}

interface HeadingItem {
  id: string
  text: string
  level: number
}

interface PortableTextProps {
  value: any
  headings?: HeadingItem[]
  showInlineTOC?: boolean
}

export default function PortableText({ value, headings = [], showInlineTOC = false }: PortableTextProps) {
  // 最初のh2見出しを見つけるためのカウンター
  let h2Count = 0
  
  // 動的にh2コンポーネントを作成
  const h2Component = ({ children, value }: any) => {
    const text = value?.children?.map((child: any) => child.text || '').join('').trim() || ''
    const id = `heading-${value?._key || 'h2'}-${text.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}`
    
    // 最初のh2の前に目次を表示
    const isFirstH2 = h2Count === 0
    h2Count++
    
    return (
      <>
        {isFirstH2 && showInlineTOC && headings.length > 0 && (
          <div className="mb-8">
            <TableOfContents headings={headings} />
          </div>
        )}
        <h2 id={id} className="text-2xl md:text-3xl font-bold text-gray-800 mt-16 mb-6 bg-white scroll-mt-4">
          {children}
        </h2>
      </>
    )
  }
  
  const componentsWithTOC: Partial<PortableTextReactComponents> = {
    ...components,
    block: {
      ...components.block,
      h2: h2Component,
    }
  }
  
  return <PT value={value} components={componentsWithTOC} />
}
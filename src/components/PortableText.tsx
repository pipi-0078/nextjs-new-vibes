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
    iframe: ({ value }) => {
      if (!value?.url) {
        return null
      }
      
      // デバッグ用ログ
      console.log('iframe component called with URL:', value.url)
      
      // 特定のSpotify URLをテスト
      const testSpotifyUrl = 'https://open.spotify.com/episode/3gnl7D7ojN3RHgKaFMV0FD?si=8tKG8rzyQU6EqQrmzQVuEA'
      console.log('Is this the problematic URL?', value.url === testSpotifyUrl)
      console.log('URL comparison:', {
        actual: value.url,
        expected: testSpotifyUrl,
        match: value.url === testSpotifyUrl
      })
      
      // URL正規化（クエリパラメータやフラグメントを除去してドメインチェック）
      const cleanUrl = value.url.split('?')[0].split('#')[0]
      console.log('Clean URL for domain check:', cleanUrl)
      
      // Spotify検出の複数パターン
      const isSpotify = value.url.includes('spotify.com') || 
                       value.url.includes('open.spotify') || 
                       value.url.includes('spotify://') ||
                       cleanUrl.includes('spotify.com') ||
                       value.url.includes('spotify')
      console.log('Spotify detection result:', isSpotify)
      console.log('Detection breakdown:', {
        'spotify.com': value.url.includes('spotify.com'),
        'open.spotify': value.url.includes('open.spotify'),
        'spotify://': value.url.includes('spotify://'),
        'cleanUrl spotify.com': cleanUrl.includes('spotify.com'),
        'spotify': value.url.includes('spotify')
      })
      
      // URLからembedURLを生成
      const getEmbedUrl = (originalUrl: string): string => {
        try {
          // YouTube URL処理
          if (originalUrl.includes('youtube.com/watch') || originalUrl.includes('youtu.be/')) {
            const videoId = originalUrl.includes('youtu.be/') 
              ? originalUrl.split('youtu.be/')[1].split('?')[0]
              : new URL(originalUrl).searchParams.get('v')
            
            if (videoId) {
              return `https://www.youtube.com/embed/${videoId}`
            }
          }
          
          // Spotify URL処理 - CSPエラーを避けるため、embedURLを生成しない
          if (originalUrl.includes('spotify.com')) {
            // リンクカード表示するため、元URLをそのまま返す
            return originalUrl
          }

          // Vimeo URL処理
          if (originalUrl.includes('vimeo.com/')) {
            const videoId = originalUrl.split('vimeo.com/')[1].split('?')[0]
            if (videoId) {
              return `https://player.vimeo.com/video/${videoId}`
            }
          }

          // X (Twitter) URL処理 - 埋め込み不可
          if (originalUrl.includes('twitter.com') || originalUrl.includes('x.com')) {
            return originalUrl // そのまま返すが、後で特別処理
          }
          
          // その他のURL（すでにembed形式の場合など）
          return originalUrl
        } catch (error) {
          console.error('URL parsing error:', error)
          return originalUrl
        }
      }
      
      const aspectRatioStyles = {
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        'custom': ''
      }
      
      const aspectRatioClass = aspectRatioStyles[value.aspectRatio as keyof typeof aspectRatioStyles] || 'aspect-video'
      
      // 埋め込み不可能なプラットフォームの場合の特別処理（embedUrl生成より前に処理）
      if (cleanUrl.includes('twitter.com') || cleanUrl.includes('x.com')) {
        console.log('Twitter/X detected, showing link card')
        return (
          <div className="my-8 bg-white" style={{ width: `${value.width || 100}%` }}>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              <div className="text-4xl mb-4">𝕏</div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {value.title || 'X (Twitter) 埋め込み'}
              </p>
              <p className="text-sm text-gray-600 mb-4 break-all">
                {value.url}
              </p>
              <p className="text-xs text-gray-500">
                ※ X (Twitter) の埋め込みは現在サポートされていません
              </p>
            </div>
          </div>
        )
      }

      // 強制テスト: 特定のURLを確実にキャッチ
      if (value.url === testSpotifyUrl) {
        console.log('FORCED SPOTIFY LINK CARD for test URL')
        return (
          <div className="my-8 bg-white" style={{ width: '100%' }}>
            <div className="border-4 border-red-500 rounded-lg p-6 bg-red-50">
              <div className="text-center">
                <div className="text-4xl mb-4">🔴 TEST</div>
                <p className="text-lg font-bold text-red-800 mb-2">
                  強制Spotifyリンクカード（テスト）
                </p>
                <p className="text-sm text-red-600 mb-4 break-all">
                  {value.url}
                </p>
                <a 
                  href={value.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700"
                >
                  TEST: Spotifyで開く
                </a>
              </div>
            </div>
          </div>
        )
      }

      // Spotify の CSP エラー対策 - 最初からリンクカードのみ表示
      if (isSpotify) {
        console.log('Spotify detected, showing link card:', value.url)
        // エピソード、トラック、アルバム、プレイリストを判定
        let contentType = 'コンテンツ'
        if (value.url.includes('/episode/')) contentType = 'エピソード'
        else if (value.url.includes('/track/')) contentType = '楽曲'
        else if (value.url.includes('/album/')) contentType = 'アルバム'
        else if (value.url.includes('/playlist/')) contentType = 'プレイリスト'
        else if (value.url.includes('/show/')) contentType = '番組'
        
        return (
          <div className="my-8 bg-white" style={{ width: `${value.width || 100}%` }}>
            <div className="border-2 border-green-300 rounded-lg p-6 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">🎵</div>
                  <div>
                    <p className="text-lg font-semibold text-gray-800 mb-1">
                      {value.title || `Spotify ${contentType}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Spotify {contentType}
                    </p>
                  </div>
                </div>
                <a 
                  href={value.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  開く
                </a>
              </div>
            </div>
          </div>
        )
      }
      
      // embedUrlは埋め込み可能なプラットフォームのみ生成
      const embedUrl = getEmbedUrl(value.url)
      console.log('Creating iframe for URL:', value.url, 'embedUrl:', embedUrl)
      
      return (
        <div className="my-8 bg-white" style={{ width: `${value.width || 100}%` }}>
          <div className={`w-full ${aspectRatioClass} relative overflow-hidden rounded-lg shadow-lg`}>
            <iframe
              src={embedUrl}
              title={value.title || 'Embedded content'}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
          {value.title && (
            <p className="text-center text-sm text-gray-600 mt-2 bg-white">
              {value.title}
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
        <h2 id={id} className="text-2xl md:text-3xl font-bold text-gray-800 mt-20 mb-6 bg-white scroll-mt-4">
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
            <TableOfContents headings={headings} collapsible={true} />
          </div>
        )}
        <h2 id={id} className="text-2xl md:text-3xl font-bold text-gray-800 mt-20 mb-6 bg-white scroll-mt-4">
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
    } as any
  }
  
  return <PT value={value} components={componentsWithTOC} />
}
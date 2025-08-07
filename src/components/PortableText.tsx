import { PortableText as PT, PortableTextReactComponents } from 'next-sanity'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

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
        <div className="my-8 bg-white overflow-x-auto">
          {value.title && (
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {value.title}
            </h3>
          )}
          <table className="w-full border-collapse border border-gray-300 shadow-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header: string, index: number) => (
                  <th 
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: string[], rowIndex: number) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell: string, cellIndex: number) => (
                    <td 
                      key={cellIndex}
                      className="border border-gray-300 px-4 py-2 text-gray-800"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
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
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-8 mb-4 bg-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-8 mb-4 bg-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3 bg-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mt-6 mb-3 bg-white">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-200 pl-6 py-2 my-6 text-gray-700 italic bg-white rounded-r-lg border border-gray-200">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-gray-800 leading-relaxed mb-4 bg-white">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-800 bg-white">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-800 bg-white">
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

interface PortableTextProps {
  value: any
}

export default function PortableText({ value }: PortableTextProps) {
  return <PT value={value} components={components} />
}
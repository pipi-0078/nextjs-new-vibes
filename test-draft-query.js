// Test draft query with previewDrafts
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('next-sanity')

// プロジェクト設定
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "h8jbyz2f"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01"
const token = process.env.SANITY_API_TOKEN

console.log('Testing Sanity queries with previewDrafts...')
console.log('Project ID:', projectId)
console.log('Dataset:', dataset)
console.log('Has token:', !!token)

// 通常のクライアント
const normalClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// プレビュークライアント
const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'drafts',
})

async function testQueries() {
  try {
    console.log('\n=== TESTING NORMAL CLIENT ===')
    const normalPosts = await normalClient.fetch(`
      *[_type == "post"] | order(_createdAt desc) [0...5] {
        _id,
        title,
        slug,
        draft,
        _createdAt,
        publishedAt
      }
    `)
    console.log('Normal client posts:', normalPosts.length)
    normalPosts.forEach(post => {
      console.log(`- ${post.title} (draft: ${post.draft}, slug: ${post.slug?.current})`)
    })

    console.log('\n=== TESTING PREVIEW CLIENT ===')
    const previewPosts = await previewClient.fetch(`
      *[_type == "post"] | order(_createdAt desc) [0...5] {
        _id,
        title,
        slug,
        draft,
        _createdAt,
        publishedAt
      }
    `)
    console.log('Preview client posts:', previewPosts.length)
    previewPosts.forEach(post => {
      console.log(`- ${post.title} (draft: ${post.draft}, slug: ${post.slug?.current})`)
    })

    // 特定のスラッグでテスト
    console.log('\n=== TESTING SPECIFIC SLUG (published) ===')
    const testSlug = 'test' // 既知のスラッグを使用
    
    const normalPost = await normalClient.fetch(`
      *[_type == "post" && slug.current == $slug && !draft][0] {
        _id,
        title,
        slug,
        draft
      }
    `, { slug: testSlug })
    console.log('Normal client result for slug "test":', normalPost)

    const previewPost = await previewClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        draft
      }
    `, { slug: testSlug })
    console.log('Preview client result for slug "test":', previewPost)

    // ドラフト記事のテスト
    console.log('\n=== TESTING DRAFT SLUG ===')
    const draftSlug = 'test02' // ドラフト記事のスラッグ
    
    const normalDraftPost = await normalClient.fetch(`
      *[_type == "post" && slug.current == $slug && !draft][0] {
        _id,
        title,
        slug,
        draft
      }
    `, { slug: draftSlug })
    console.log('Normal client result for draft slug "test02":', normalDraftPost)

    const previewDraftPost = await previewClient.fetch(`
      *[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        draft
      }
    `, { slug: draftSlug })
    console.log('Preview client result for draft slug "test02":', previewDraftPost)

  } catch (error) {
    console.error('Error testing queries:', error)
  }
}

testQueries()
import { client, getClient } from '../sanity/client'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { draftMode } from 'next/headers'

const builder = imageUrlBuilder(client)

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source)
}


export async function getPosts(start = 0, end = 10) {
  const { isEnabled: isDraftMode } = await draftMode()
  const sanityClient = getClient(isDraftMode)
  
  // ドラフトモードの場合は下書きも含める
  const query = isDraftMode
    ? groq`
        *[_type == "post"] | order(publishedAt desc) [$start...$end] {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          updatedAt,
          image,
          draft,
          "categories": categories[]->{title, slug, color},
          "tags": tags[]->{title, slug},
          featured
        }
      `
    : groq`
        *[_type == "post" && !draft] | order(publishedAt desc) [$start...$end] {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          updatedAt,
          image,
          "categories": categories[]->{title, slug, color},
          "tags": tags[]->{title, slug},
          featured
        }
      `
  
  return sanityClient.fetch(query, { start, end })
}

export async function getFeaturedPosts() {
  return client.fetch(
    groq`
      *[_type == "post" && featured == true && !draft] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        image,
        "categories": categories[]->{title, slug, color},
        "tags": tags[]->{title, slug}
      }
    `
  )
}

export async function getPost(slug: string) {
  const { isEnabled: isDraftMode } = await draftMode()
  
  // 適切なクライアントを取得（ドラフトモードの場合はpreviewDraftsを使用）
  const sanityClient = getClient(isDraftMode)
  
  // ドラフトモードの場合は下書きも含めて検索、通常時は公開済みのみ
  const query = isDraftMode 
    ? groq`
        *[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          updatedAt,
          image,
          body,
          draft,
          "categories": categories[]->{title, slug, color},
          "tags": tags[]->{title, slug}
        }
      `
    : groq`
        *[_type == "post" && slug.current == $slug && !draft][0] {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          updatedAt,
          image,
          body,
          "categories": categories[]->{title, slug, color},
          "tags": tags[]->{title, slug}
        }
      `
  
  const result = await sanityClient.fetch(query, { slug })
  
  // デバッグ用ログ
  console.log('getPost result:', {
    slug,
    isDraftMode,
    found: !!result,
    isDraft: result?.draft
  })
  
  return result
}

export async function getPostsByCategory(categorySlug: string, start = 0, end = 10) {
  return client.fetch(
    groq`
      *[_type == "post" && !draft && $categorySlug in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        image,
        "categories": categories[]->{title, slug, color},
        "tags": tags[]->{title, slug}
      }
    `,
    { categorySlug, start, end }
  )
}

export async function getPostsByTag(tagSlug: string, start = 0, end = 10) {
  return client.fetch(
    groq`
      *[_type == "post" && !draft && $tagSlug in tags[]->slug.current] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        image,
        "categories": categories[]->{title, slug, color},
        "tags": tags[]->{title, slug}
      }
    `,
    { tagSlug, start, end }
  )
}

export async function getCategories() {
  return client.fetch(
    groq`
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        description,
        color
      }
    `
  )
}

export async function getTags() {
  return client.fetch(
    groq`
      *[_type == "tag"] | order(title asc) {
        _id,
        title,
        slug,
        description
      }
    `
  )
}

export async function getProfile() {
  return client.fetch(
    groq`
      *[_type == "profile"][0] {
        _id,
        name,
        bio,
        catchphrase,
        profileImage,
        experience,
        skills,
        socialLinks,
        contactEmail
      }
    `
  )
}

export async function searchPosts(query: string, start = 0, end = 10) {
  return client.fetch(
    groq`
      *[_type == "post" && !draft && (
        title match $query + "*" ||
        excerpt match $query + "*" ||
        pt::text(body) match $query + "*"
      )] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        image,
        "categories": categories[]->{title, slug, color},
        "tags": tags[]->{title, slug}
      }
    `,
    { query, start, end }
  )
}
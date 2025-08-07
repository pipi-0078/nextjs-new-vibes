import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('=== DRAFT API CALLED ===')
  console.log('Request URL:', request.url)
  
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const path = searchParams.get('path')

  console.log('Parameters:', { slug, path })
  console.log('Environment check:', {
    hasReadToken: !!process.env.SANITY_API_READ_TOKEN,
    hasWriteToken: !!process.env.SANITY_API_TOKEN,
    nodeEnv: process.env.NODE_ENV
  })

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()
  
  const { isEnabled } = await draftMode()
  console.log('Draft mode status:', { isEnabled })

  // Determine the redirect path
  let redirectPath = '/'
  
  if (slug) {
    redirectPath = `/blog/${slug}`
    console.log('Redirecting to blog post:', redirectPath)
  } else if (path) {
    redirectPath = path
    console.log('Redirecting to custom path:', redirectPath)
  } else {
    console.log('No specific path, redirecting to home')
  }

  console.log('Final redirect path:', redirectPath)
  console.log('=== END DRAFT API ===')

  redirect(redirectPath)
}
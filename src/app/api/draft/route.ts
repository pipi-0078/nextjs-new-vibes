import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const path = searchParams.get('path')

  // Enable draft mode
  const draft = await draftMode()
  draft.enable()

  // Determine the redirect path
  let redirectPath = '/'
  
  if (slug) {
    redirectPath = `/blog/${slug}`
  } else if (path) {
    redirectPath = path
  }

  redirect(redirectPath)
}
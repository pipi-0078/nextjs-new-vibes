import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { client } from '@/sanity/client'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const token = process.env.SANITY_API_READ_TOKEN!

export async function GET(request: NextRequest) {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, request.url)
  
  if (!isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  // Enable draft mode
  const response = new Response(null, {
    status: 307,
    headers: {
      Location: redirectTo,
    },
  })
  
  // Set draft mode cookie
  response.headers.set('Set-Cookie', 'draftMode=true; Path=/; HttpOnly; SameSite=Strict')
  
  return response
}
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const response = new Response(null, {
    status: 307,
    headers: {
      Location: new URL('/', request.url).toString(),
    },
  })
  
  // Clear draft mode cookie
  response.headers.set('Set-Cookie', 'draftMode=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0')
  
  return response
}
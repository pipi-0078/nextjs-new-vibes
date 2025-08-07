import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  return Response.json({
    message: 'Environment debug info',
    env: {
      hasReadToken: !!process.env.SANITY_API_READ_TOKEN,
      hasWriteToken: !!process.env.SANITY_API_TOKEN,
      hasProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      hasDataset: !!process.env.NEXT_PUBLIC_SANITY_DATASET,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    },
    timestamp: new Date().toISOString()
  })
}
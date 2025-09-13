import type { BodyInit } from 'bun'

export const corsHeaders = {
  'Access-Control-Allow-Origin':
    process.env.NODE_ENV === 'production'
      ? process.env.FRONTEND_URL || ''
      : '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
}

export const createCorsResponse = (status: number, body?: BodyInit) => {
  return new Response(body, {
    status,
    headers: corsHeaders,
  })
}

export const addCorsHeaders = (response: Response): Response => {
  const headers = new Headers(response.headers)

  Object.entries(corsHeaders).forEach(([key, value]) => {
    headers.set(key, value)
  })

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

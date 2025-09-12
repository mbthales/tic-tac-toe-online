import { config } from '@config/index'

import type { ApiOptions } from '@app-types/api'

const request = async <T>(endpoint: string, options: ApiOptions = {}) => {
  const url = `${config.apiUrl}${endpoint}`

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json() as T
}

export const get = <T>(endpoint: string) => {
  return request<T>(endpoint, { method: 'GET' })
}

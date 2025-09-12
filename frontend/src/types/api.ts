export type ApiOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

export interface GameStats {
  playersConnected: number
  playersSearching: number
}



import { get } from './api'

import type { GameStats } from '@app-types/api'

export const getStats = () => {
  return get<GameStats>('/stats')
}

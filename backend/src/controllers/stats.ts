import { getGameStats } from '@services/stats'

export const statsRequestHandler = () => {
  const stats = getGameStats()

  return new Response(JSON.stringify(stats), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: 200,
  })
}

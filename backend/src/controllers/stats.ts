import { getGameStats } from '@services/stats'

export const statsRequestHandler = () => {
  const stats = getGameStats()

  return new Response(JSON.stringify(stats), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    status: 200,
  })
}

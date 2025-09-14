import { messageHandler } from '@controllers/game'
import { statsRequestHandler } from '@controllers/stats'
import { connectPlayer, disconnectPlayer } from '@services/game'
import { getClientIP } from '@utils/clientIp'
import { addCorsHeaders, createCorsResponse } from '@utils/cors'
import { logger, logRequest, logWebSocket } from '@utils/logger'
import { isRateLimited } from '@utils/rateLimiter'

Bun.serve({
  fetch(req, server) {
    const { url, method } = req
    const { pathname } = new URL(url)

    const ip = getClientIP(req, server)

    if (!ip) {
      return new Response('Unable to determine client IP', { status: 400 })
    }

    if (isRateLimited(ip)) {
      return new Response('Too Many Requests', { status: 429 })
    }

    if (method === 'OPTIONS') {
      return createCorsResponse(200)
    }

    if (server.upgrade(req)) {
      logWebSocket('upgraded', pathname)
      return
    }

    let response: Response

    if (pathname === '/stats' && method === 'GET') {
      response = statsRequestHandler()
    } else {
      response = new Response('Not Found', { status: 404 })
    }

    logRequest(method, pathname)

    return addCorsHeaders(response)
  },
  websocket: {
    open(ws) {
      logWebSocket('opened')
      connectPlayer(ws)
    },
    message(ws, message) {
      logWebSocket('message', message.toString())
      messageHandler(ws, message.toString())
    },
    close(ws) {
      logWebSocket('closed')
      disconnectPlayer(ws)
    },
  },
  port: process.env.PORT,
})

logger.info(`Server started on port ${process.env.PORT}`)

import { messageHandler } from '@controllers/game'
import { statsRequestHandler } from '@controllers/stats'
import { connectPlayer, disconnectPlayer } from '@services/game'
import { addCorsHeaders, createCorsResponse } from '@utils/cors'
import { logger, logRequest, logWebSocket } from '@utils/logger'

Bun.serve({
  fetch(req, server) {
    const { url, method } = req
    const { pathname } = new URL(url)

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

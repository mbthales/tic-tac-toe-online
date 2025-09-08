import pino from 'pino'

import { messageHandler, openEventHandler } from '@controllers/game'
import { statsRequestHandler } from '@controllers/stats'
import { disconnectPlayer } from '@services/game'

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
})

Bun.serve({
  fetch(req, server) {
    const { url, method } = req
    const { pathname } = new URL(url)

    if (server.upgrade(req)) {
      logger.info(`WebSocket upgraded - ${url}`)
      return
    }

    let response: Response

    if (pathname === '/stats' && method === 'GET') {
      response = statsRequestHandler()
    } else {
      response = new Response('Not Found', { status: 404 })
    }

    logger.info(`HTTP Request - ${method} ${pathname}`)

    return response
  },
  websocket: {
    open(ws) {
      logger.info(`WebSocket opened`)
      openEventHandler(ws)
    },
    message(ws, message) {
      logger.info(`WebSocket message - ${message.toString().slice(0, 50)}...`)
      messageHandler(ws, message.toString())
    },
    close(ws) {
      logger.info(`WebSocket closed`)
      disconnectPlayer(ws)
    },
  },
  port: process.env.PORT,
})

logger.info(`Server started on port ${process.env.PORT}`)

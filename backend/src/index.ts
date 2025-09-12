import pino from 'pino'

import { messageHandler } from '@controllers/game'
import { statsRequestHandler } from '@controllers/stats'
import { connectPlayer, disconnectPlayer } from '@services/game'

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

    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers':
            'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Max-Age': '86400',
        },
      })
    }

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

    const headers = new Headers(response.headers)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    )
    headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    )

    logger.info(`HTTP Request - ${method} ${pathname}`)

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
  websocket: {
    open(ws) {
      logger.info(`WebSocket opened`)
      connectPlayer(ws)
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

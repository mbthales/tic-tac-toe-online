import { messageHandler } from './controllers/game'
import { disconnectPlayer } from './services/game'

import type { CloseEvent } from './types/game'

Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return
    }
  },
  websocket: {
    open(ws) {
      ws.send('Connected successfully to the server')
    },
    message(ws, message) {
      messageHandler(ws, message.toString())
    },
    close(ws, message) {
      try {
        const data = JSON.parse(message.toString()) as CloseEvent

        disconnectPlayer(data, ws)
      } catch {
        ws.send('Invalid message format')
      }
    },
  },
  port: 3000,
})

import { messageHandler, openEventHandler } from '@controllers/game'
import { disconnectPlayer } from '@services/game'

Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return
    }
  },
  websocket: {
    open(ws) {
      openEventHandler(ws)
    },
    message(ws, message) {
      messageHandler(ws, message.toString())
    },
    close(ws) {
      disconnectPlayer(ws)
    },
  },
  port: 3000,
})

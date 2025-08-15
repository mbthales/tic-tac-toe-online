import {
  closeEventHandler,
  messageHandler,
  openEventHandler,
} from './controllers/game'

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
    close(ws, message) {
      closeEventHandler(ws, message.toString())
    },
  },
  port: 3000,
})

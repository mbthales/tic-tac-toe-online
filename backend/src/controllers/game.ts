import { randomUUIDv7 } from 'bun'

import { messageSchema } from '@schemas/game'
import { handlePlayerMove, playerSearch } from '@services/game'
import { messageValidator } from '@utils/messageValidator'

import type { ServerWebSocket } from 'bun'

export const messageHandler = (
  ws: ServerWebSocket<unknown>,
  message: string
) => {
  const validatedMessage = messageValidator(ws, message, messageSchema)

  if (!validatedMessage) return

  if (validatedMessage.status === 'searching') {
    playerSearch(validatedMessage, ws)
  }
  if (validatedMessage.status === 'playing') {
    handlePlayerMove(validatedMessage, ws)
  }
}

export const openEventHandler = (ws: ServerWebSocket<unknown>) => {
  const playerId = randomUUIDv7()

  ws.send(
    JSON.stringify({
      status: 'connected',
      id: playerId,
    })
  )
}

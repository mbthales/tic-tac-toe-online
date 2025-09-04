import jsonParser from '@helpers/jsonParser'
import { useMatchStore } from '@stores/match'
import { usePlayerStore } from '@stores/player'

import type { Message } from '@app-types/webSocket'

let socket: WebSocket | null = null

const handleMessage = (message: MessageEvent) => {
  const parsedMessage = jsonParser(message.data) as Message

  if (!parsedMessage) return

  const { setId, setStatus, setSymbol, resetPlayer } = usePlayerStore()
  const { setMatch, resetMatch, setWinner, setDraw } = useMatchStore()

  switch (parsedMessage.status) {
    case 'connected':
      setStatus('connected')
      setId(parsedMessage.id)
      break

    case 'searching':
      setStatus('searching')
      resetMatch()
      break

    case 'playing':
      setStatus('playing')

      if (
        parsedMessage.details === 'match found' &&
        parsedMessage.playerSymbol
      ) {
        setSymbol(parsedMessage.playerSymbol)
      }

      if (parsedMessage.match) {
        setMatch(parsedMessage.match)
      }
      break

    case 'finished':
      if (!parsedMessage.match) break

      setStatus('finished')
      setMatch(parsedMessage.match)

      if (parsedMessage.details === 'draw') {
        setDraw(true)
      } else if (parsedMessage.details === 'wins') {
        setWinner(parsedMessage.match.currentPlayer)
      }
      break

    case 'disconnected':
      resetMatch()
      resetPlayer()
      setStatus('disconnected')
      break
  }
}

export const connect = (url: string) => {
  socket = new WebSocket(url)

  socket.onopen = () => {
    console.log('WebSocket connected')
  }

  socket.onmessage = handleMessage

  socket.onclose = () => {
    console.log('WebSocket disconnected')
  }
}

export const sendMessage = (message: string) => {
  if (socket) {
    socket.send(message)
  } else {
    console.log('WebSocket not connected or not ready')
  }
}

export const disconnect = () => {
  if (socket) {
    socket.close()
  }
}

import { ref } from 'vue'

import jsonParser from '@helpers/jsonParser'
import { useMatchStore } from '@stores/match'
import { usePlayerStore } from '@stores/player'

import type { Message } from '@app-types/webSocketResponse'

const socket = ref<WebSocket | null>(null)

export default function useWebSocket() {
  const { setId, setStatus, setSymbol } = usePlayerStore()
  const { setMatch, resetMatch, setWinner, setTie } = useMatchStore()

  const connect = (url: string) => {
    socket.value = new WebSocket(url)

    socket.value.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.value.onmessage = (message) => {
      const parsedMessage = jsonParser(message.data) as Message

      if (parsedMessage) {
        if (parsedMessage.status === 'connected') {
          setId(parsedMessage.id)
          setStatus('connected')
        }

        if (parsedMessage.status === 'searching') {
          setStatus('searching')
          resetMatch()
        }

        if (parsedMessage.status === 'playing') {
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
        }

        if (parsedMessage.status === 'finished') {
          setStatus('finished')

          if (parsedMessage.details === 'tie') {
            setTie(true)
            setMatch(parsedMessage.match!)
          }

          if (parsedMessage.details === 'wins' && parsedMessage.match) {
            setMatch(parsedMessage.match)
            setWinner(parsedMessage.match.currentPlayer)
          }
        }
      }
    }

    socket.value.onclose = () => {
      console.log('WebSocket disconnected')
    }
  }

  const sendMessage = (message: string) => {
    if (socket.value) {
      socket.value.send(message)
    } else {
      console.log('WebSocket not connected or not ready')
    }
  }

  return {
    connect,
    sendMessage,
  }
}

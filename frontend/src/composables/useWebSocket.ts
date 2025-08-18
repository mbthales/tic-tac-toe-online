import { ref } from 'vue'

import jsonParser from '@helpers/jsonParser'
import { useMatchStore } from '@stores/match'
import { usePlayerStore } from '@stores/player'

import type { Message } from '@app-types/webSocketResponse'

export default function useWebSocket() {
  const socket = ref<WebSocket | null>(null)

  const connect = (url: string) => {
    socket.value = new WebSocket(url)

    socket.value.onopen = () => {
      console.log('WebSocket connected')
    }

    socket.value.onmessage = (message) => {
      const { setId, setStatus } = usePlayerStore()
      const parsedMessage = jsonParser(message.data) as Message

      console.log('PARSED MESSAGE', parsedMessage)

      if (parsedMessage) {
        if (parsedMessage.status === 'connected') {
          setId(parsedMessage.id)
          setStatus('connected')
        }

        if (parsedMessage.status === 'searching') {
          setStatus('searching')
        }

        if (parsedMessage.status === 'playing') {
          setStatus('playing')
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
    }
  }

  return {
    connect,
    sendMessage,
  }
}

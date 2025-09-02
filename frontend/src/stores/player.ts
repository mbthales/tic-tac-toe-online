import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { PlayerStatus, PlayerSymbol } from '@app-types/player'
import type { Ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const status: Ref<PlayerStatus> = ref('')
  const id = ref('')
  const symbol: Ref<PlayerSymbol> = ref('')

  const setStatus = (newStatus: PlayerStatus) => (status.value = newStatus)

  const setId = (newId: string) => (id.value = newId)

  const setSymbol = (newSymbol: PlayerSymbol) => (symbol.value = newSymbol)

  const resetPlayer = () => {
    status.value = ''
    symbol.value = ''
  }

  return { status, id, symbol, setStatus, setId, setSymbol, resetPlayer }
})

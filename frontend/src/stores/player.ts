import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { PlayerStatus, PlayerSymbol } from '@app-types/player'
import type { Ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const status: Ref<PlayerStatus> = ref('')
  const id = ref('')
  const symbol: Ref<PlayerSymbol> = ref('')

  function setStatus(newStatus: PlayerStatus) {
    status.value = newStatus
  }

  function setId(newId: string) {
    id.value = newId
  }

  function setSymbol(newSymbol: PlayerSymbol) {
    symbol.value = newSymbol
  }

  function resetPlayer() {
    status.value = ''
    symbol.value = ''
  }

  return { status, id, symbol, setStatus, setId, setSymbol, resetPlayer }
})

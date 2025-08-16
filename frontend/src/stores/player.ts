import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { PlayerStatus } from '../types/player'
import type { Ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const status: Ref<PlayerStatus> = ref('')
  const id = ref('')

  function setStatus(newStatus: PlayerStatus) {
    status.value = newStatus
  }

  function setId(newId: string) {
    id.value = newId
  }

  return { status, id, setStatus, setId }
})

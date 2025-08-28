import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Match } from '@app-types/match'
import type { Ref } from 'vue'

export const useMatchStore = defineStore('match', () => {
  const match: Ref<Match> = ref({
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    currentPlayer: '',
  })
  const ready = ref(false)

  function setMatch(newMatch: Match) {
    match.value = newMatch
  }

  function setReady(value: boolean) {
    ready.value = value
  }

  return { match, setMatch, ready, setReady }
})

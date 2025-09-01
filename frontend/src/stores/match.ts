import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { Match } from '@app-types/match'
import type { PlayerSymbol } from '@app-types/player'
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
  const winner: Ref<PlayerSymbol> = ref('')
  const tie = ref(false)

  function setMatch(newMatch: Match) {
    match.value = newMatch
  }

  function resetMatch() {
    match.value = {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      currentPlayer: '',
    }
    ready.value = false
    winner.value = ''
    tie.value = false
  }

  function setReady(value: boolean) {
    ready.value = value
  }

  function setWinner(value: PlayerSymbol) {
    winner.value = value
  }

  function setTie(value: boolean) {
    tie.value = value
  }

  return {
    match,
    setMatch,
    resetMatch,
    ready,
    setReady,
    winner,
    setWinner,
    tie,
    setTie,
  }
})

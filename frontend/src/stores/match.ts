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
  const draw = ref(false)

  const setMatch = (newMatch: Match) => (match.value = newMatch)

  const resetMatch = () => {
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
    draw.value = false
  }

  const setReady = (value: boolean) => (ready.value = value)

  const setWinner = (value: PlayerSymbol) => (winner.value = value)

  const setDraw = (value: boolean) => (draw.value = value)

  return {
    match,
    setMatch,
    resetMatch,
    ready,
    setReady,
    winner,
    setWinner,
    draw,
    setDraw,
  }
})

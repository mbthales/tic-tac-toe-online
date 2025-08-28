<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  import useWebSocket from '@composables/useWebSocket'
  import { useMatchStore } from '@stores/match'
  import { usePlayerStore } from '@stores/player'

  const { id, symbol } = storeToRefs(usePlayerStore())
  const { match } = storeToRefs(useMatchStore())
  const { sendMessage } = useWebSocket()

  const isMyTurn = computed(() => symbol.value === match.value.currentPlayer)

  function handlePlayerMove(cell: string) {
    const [row, col] = cell.split(',').map(Number)

    if (!isMyTurn.value && match.value.board[row][col] !== '') return

    sendMessage(
      JSON.stringify({ id: id.value, status: 'playing', details: cell })
    )
  }

  function getCellClasses(row: number, col: number) {
    const canPlay = isMyTurn.value && match.value.board[row][col] === ''

    return [
      'game-cell',
      canPlay ? 'game-cell--interactive' : 'game-cell--disabled',
    ]
  }
</script>

<template>
  <div class="game-board">
    <div v-for="col in 3" :key="col" class="game-column">
      <div
        v-for="row in 3"
        :key="row"
        @click="handlePlayerMove(`${row - 1},${col - 1}`)"
        :class="getCellClasses(row - 1, col - 1)"
      >
        {{ match.board[row - 1][col - 1] }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  @reference "../style.css";

  .game-board {
    @apply text-albescent-white-950 flex justify-center gap-4;
  }

  .game-column {
    @apply flex flex-col gap-2;
  }

  .game-cell {
    @apply border-albescent-white-500 flex h-[200px] w-[200px] items-center justify-center rounded-lg border-2 bg-white text-4xl font-bold transition-all duration-200;
  }

  .game-cell--interactive {
    @apply hover:bg-albescent-white-100 hover:border-albescent-white-400 cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95;
  }

  .game-cell--disabled {
    @apply cursor-not-allowed bg-gray-50 opacity-50;
  }
</style>

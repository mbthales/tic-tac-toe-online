<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'

  import useWebSocket from '@composables/useWebSocket'
  import { useMatchStore } from '@stores/match'
  import { usePlayerStore } from '@stores/player'

  const { id, symbol } = storeToRefs(usePlayerStore())
  const { match } = storeToRefs(useMatchStore())
  const { sendMessage } = useWebSocket()

  const isMyTurn = computed(() => symbol.value !== match.value.currentPlayer)

  function handlePlayerMove(cell: string) {
    if (!isMyTurn.value) return

    const [row, col] = cell.split(',').map(Number)

    if (match.value.board[row][col] !== '') return

    sendMessage(
      JSON.stringify({ id: id.value, status: 'playing', details: cell })
    )
  }
</script>

<template>
  <div class="flex justify-center gap-4">
    <div class="flex flex-col gap-2">
      <div
        @click="handlePlayerMove('0,0')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[0][0] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[0][0] }}
      </div>
      <div
        @click="handlePlayerMove('0,1')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[0][1] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[0][1] }}
      </div>
      <div
        @click="handlePlayerMove('0,2')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[0][2] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[0][2] }}
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div
        @click="handlePlayerMove('1,0')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[1][0] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[1][0] }}
      </div>
      <div
        @click="handlePlayerMove('1,1')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[1][1] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[1][1] }}
      </div>
      <div
        @click="handlePlayerMove('1,2')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[1][2] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[1][2] }}
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <div
        @click="handlePlayerMove('2,0')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[2][0] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[2][0] }}
      </div>
      <div
        @click="handlePlayerMove('2,1')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[2][1] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[2][1] }}
      </div>
      <div
        @click="handlePlayerMove('2,2')"
        :class="[
          'w-[200px] h-[200px] border border-gray-300 flex items-center justify-center text-4xl font-bold',
          isMyTurn && match.board[2][2] === ''
            ? 'cursor-pointer hover:bg-gray-100'
            : 'cursor-not-allowed opacity-50',
        ]"
      >
        {{ match.board[2][2] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  import GameBoard from './components/GameBoard.vue'
  import useWebSocket from './composables/useWebSocket'
  import { usePlayerStore } from './stores/player'

  const { id, status } = storeToRefs(usePlayerStore())
  const { connect, sendMessage } = useWebSocket()

  onMounted(() => {
    connect('ws://localhost:3000')
  })
</script>

<template>
  <h1>Tic Tac Toe</h1>
  <button
    @click="
      sendMessage(
        JSON.stringify({
          id,
          status: 'searching',
        })
      )
    "
  >
    Searching Player
  </button>

  <p v-if="status === 'searching'">Searching...</p>
  <GameBoard v-if="status === 'playing'" />
</template>

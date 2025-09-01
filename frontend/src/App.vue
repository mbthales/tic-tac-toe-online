<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  import AppButton from '@components/AppButton.vue'
  import AppTitle from '@components/AppTitle.vue'
  import FinishedGame from '@components/FinishedGame.vue'
  import GameBoard from '@components/GameBoard.vue'
  import SearchingStatus from '@components/SearchingStatus.vue'
  import useWebSocket from '@composables/useWebSocket'
  import { useMatchStore } from '@stores/match'
  import { usePlayerStore } from '@stores/player'

  const { id, status } = storeToRefs(usePlayerStore())
  const { resetPlayer } = usePlayerStore()
  const { ready } = storeToRefs(useMatchStore())
  const { connect, sendMessage } = useWebSocket()

  function searchPlayer() {
    resetPlayer()
    sendMessage(
      JSON.stringify({
        id: id.value,
        status: 'searching',
      })
    )
  }
  onMounted(() => {
    connect('ws://localhost:3000')
  })
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-16">
    <AppTitle />
    <div v-if="!ready">
      <AppButton
        text="Search Player"
        :func="searchPlayer"
        v-if="status === 'connected'"
      />
      <SearchingStatus :status="status" />
    </div>
    <GameBoard v-if="ready" />
    <FinishedGame v-if="status === 'finished'" @restart="searchPlayer" />
  </div>
</template>

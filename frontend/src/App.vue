<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'

  import AppButton from '@components/AppButton.vue'
  import AppTitle from '@components/AppTitle.vue'
  import FinishedGame from '@components/FinishedGame.vue'
  import GameBoard from '@components/GameBoard.vue'
  import GameStats from '@components/GameStats.vue'
  import ReconnectedGame from '@components/ReconnectedGame.vue'
  import SearchingStatus from '@components/SearchingStatus.vue'
  import { config } from '@config/index.ts'
  import { connect, disconnect, sendMessage } from '@services/webSockets'
  import { useMatchStore } from '@stores/match'
  import { usePlayerStore } from '@stores/player'

  const { id, status } = storeToRefs(usePlayerStore())
  const { resetPlayer } = usePlayerStore()
  const { ready } = storeToRefs(useMatchStore())

  const searchPlayer = () => {
    resetPlayer()
    sendMessage(
      JSON.stringify({
        id: id.value,
        status: 'searching',
      })
    )
  }

  onMounted(() => {
    connect(config.websocketUrl)

    window.addEventListener('beforeunload', () => {
      disconnect()
    })
  })
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center gap-16">
    <AppTitle />
    <GameStats />
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
    <ReconnectedGame v-if="status === 'disconnected'" @restart="searchPlayer" />
  </div>
</template>

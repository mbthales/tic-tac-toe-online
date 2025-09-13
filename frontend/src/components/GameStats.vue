<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'

  import { getStats } from '@services/gameApi'

  import type { GameStats } from '@app-types/api'

  const stats = ref<GameStats | null>(null)
  let intervalId: number | null = null

  const updateStats = async () => {
    try {
      stats.value = await getStats()
    } catch (err) {
      console.error('Error getting stats:', err)
    }
  }

  onMounted(async () => {
    await updateStats()

    intervalId = setInterval(updateStats, 10000)
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })
</script>

<template>
  <div
    v-if="stats"
    class="font-sora absolute top-5 left-1/2 flex w-full -translate-x-1/2 transform justify-center gap-10 text-xs text-gray-500 sm:right-5 sm:left-auto sm:w-auto sm:translate-x-0 sm:justify-start sm:text-base"
  >
    <p>Players Connected: {{ stats.playersConnected }}</p>
    <p>Players Searching: {{ stats.playersSearching }}</p>
  </div>
</template>

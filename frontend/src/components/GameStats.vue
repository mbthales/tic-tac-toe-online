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
      console.error('Erro ao buscar stats:', err)
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
    class="font-sora absolute top-5 right-5 flex gap-10 text-gray-500"
  >
    <p>Players Connected: {{ stats.playersConnected }}</p>
    <p>Players Searching: {{ stats.playersSearching }}</p>
  </div>
</template>

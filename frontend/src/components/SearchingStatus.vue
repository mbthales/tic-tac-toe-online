<script setup lang="ts">
  import { onUnmounted, ref, watch } from 'vue'

  import { useMatchStore } from '@stores/match'

  import type { PlayerStatus } from '@app-types/player'

  const { setReady } = useMatchStore()

  const props = defineProps<{
    status: PlayerStatus
  }>()

  const timeSearching = ref(0)
  const timeMatchReady = ref(5)
  let currentInterval: number | null = null

  function startSearchingTimer() {
    timeSearching.value = 0
    currentInterval = setInterval(() => {
      timeSearching.value++
    }, 1000)
  }

  function startMatchReadyTimer() {
    timeMatchReady.value = 5
    currentInterval = setInterval(() => {
      timeMatchReady.value--
      if (timeMatchReady.value <= 0) {
        clearInterval(currentInterval!)
        currentInterval = null
        setReady(true)
      }
    }, 1000)
  }

  function clearCurrentInterval() {
    if (currentInterval) {
      clearInterval(currentInterval)
      currentInterval = null
    }
  }

  watch(
    () => props.status,
    (newStatus) => {
      clearCurrentInterval()

      if (newStatus === 'searching') {
        startSearchingTimer()
      } else if (newStatus === 'playing') {
        startMatchReadyTimer()
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    clearCurrentInterval()
  })
</script>

<template>
  <div v-if="status === 'searching'" class="flex flex-col items-center gap-2">
    <p class="text-albescent-white-950 font-sora text-lg font-medium">
      Searching for opponent...
    </p>
    <p class="font-sora text-sm text-gray-500">{{ timeSearching }}s</p>
  </div>
  <div
    v-else-if="status === 'playing'"
    class="flex flex-col items-center gap-2"
  >
    <p class="text-albescent-white-950 font-sora text-xl font-bold">
      Match found!
    </p>
    <p v-if="timeMatchReady" class="font-sora text-sm text-gray-500">
      {{ timeMatchReady }}s
    </p>
  </div>
</template>

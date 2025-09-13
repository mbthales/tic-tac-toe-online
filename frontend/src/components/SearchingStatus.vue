<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onUnmounted, ref, watch } from 'vue'

  import { useMatchStore } from '@stores/match'
  import { usePlayerStore } from '@stores/player'

  import type { PlayerStatus } from '@app-types/player'

  const { symbol } = storeToRefs(usePlayerStore())
  const { setReady } = useMatchStore()

  const props = defineProps<{
    status: PlayerStatus
  }>()

  const timeSearching = ref(0)
  const timeMatchReady = ref(5)
  let currentInterval: number | null = null

  const startSearchingTimer = () => {
    timeSearching.value = 0
    currentInterval = setInterval(() => {
      timeSearching.value++
    }, 1000)
  }

  const startMatchReadyTimer = () => {
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

  const clearCurrentInterval = () => {
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
    <p
      class="text-albescent-white-950 font-sora text-sm font-medium sm:text-lg"
    >
      Searching for opponent...
    </p>
    <p class="font-sora text-xs text-gray-500 sm:text-sm">
      {{ timeSearching }}s
    </p>
  </div>
  <div
    v-else-if="status === 'playing'"
    class="flex flex-col items-center gap-2"
  >
    <p
      class="text-albescent-white-950 font-sora text-base font-bold sm:text-xl"
    >
      Match found. You are playing as {{ symbol }}.
    </p>
    <p v-if="timeMatchReady" class="font-sora text-xs text-gray-500 sm:text-sm">
      Starting in {{ timeMatchReady }}s
    </p>
  </div>
</template>

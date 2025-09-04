<script setup lang="ts">
  import { storeToRefs } from 'pinia'

  import RestartModal from '@components/RestartModal.vue'
  import { useMatchStore } from '@stores/match'
  import { usePlayerStore } from '@stores/player'

  const { winner, draw } = storeToRefs(useMatchStore())
  const { symbol } = storeToRefs(usePlayerStore())
</script>

<template>
  <RestartModal>
    <p v-if="draw" class="text-center">It's a draw!</p>
    <div v-else class="text-center">
      <p v-if="winner === symbol">You win!</p>
      <p v-else>You lost!</p>
    </div>
  </RestartModal>
</template>

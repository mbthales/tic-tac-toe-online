<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { watch } from 'vue'

  import AppButton from '@components/AppButton.vue'
  import { useMatchStore } from '@stores/match'
  import { usePlayerStore } from '@stores/player'

  const { winner, tie } = storeToRefs(useMatchStore())
  const { symbol } = storeToRefs(usePlayerStore())

  watch(tie, (newValue) => {
    if (newValue) {
      console.log('ITS A TIE!!!!!!!', newValue)
    }
  })
</script>

<template>
  <div class="bg-albescent-white-50 fixed inset-0 z-40 opacity-50"></div>
  <div
    class="bg-albescent-white-700 text-albescent-white-100 fixed inset-0 z-50 m-auto flex h-[40%] w-[60%] flex-col items-center justify-center gap-10 p-8 text-7xl shadow-lg"
  >
    <p v-if="tie" class="text-center">It's a tie!</p>
    <div v-else class="text-center">
      <p v-if="winner === symbol">You win!</p>
      <p v-else>You lost!</p>
    </div>
    <AppButton :func="() => $emit('restart')" text="Play Again" />
  </div>
</template>
s

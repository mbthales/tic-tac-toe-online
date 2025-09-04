<script setup lang="ts">
  import AppButton from '@components/AppButton.vue'

  defineEmits<{
    restart: []
  }>()
</script>

<template>
  <div class="bg-albescent-white-50 fixed inset-0 z-40 opacity-50"></div>
  <div
    class="bg-albescent-white-700 text-albescent-white-100 fixed inset-0 z-50 m-auto flex h-[40%] w-[60%] flex-col items-center justify-center gap-10 p-8 text-7xl shadow-lg"
  >
    <slot />
    <AppButton :func="() => $emit('restart')" text="Play Again" />
  </div>
</template>

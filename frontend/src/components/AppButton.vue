<script setup lang="ts">
  defineProps<{
    text: string
    func: () => void
  }>()
</script>

<template>
  <button
    class="bg-albescent-white-950 text-albescent-white-100 font-sora hover:bg-albescent-white-200 hover:text-albescent-white-950 cursor-pointer rounded-xl px-4 py-2 text-lg transition-colors duration-300"
    @click="func"
  >
    {{ text }}
  </button>
</template>

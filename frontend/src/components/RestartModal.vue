<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  import AppButton from '@components/AppButton.vue'

  defineEmits<{
    restart: []
  }>()

  const showModal = ref(false)

  onMounted(() => {
    setTimeout(() => {
      showModal.value = true
    }, 50)
  })
</script>

<template>
  <div
    class="fixed inset-0 z-40 bg-black transition-opacity duration-300"
    :class="showModal ? 'opacity-50' : 'opacity-0'"
  ></div>
  <div
    class="bg-albescent-white-700 text-albescent-white-100 fixed inset-0 z-50 m-auto flex h-[40%] w-[60%] max-w-[700px] flex-col items-center justify-center gap-10 p-8 text-3xl shadow-lg transition-all duration-500 ease-out sm:text-7xl"
    :class="showModal ? 'scale-100 opacity-100' : 'scale-75 opacity-0'"
  >
    <slot />
    <AppButton :func="() => $emit('restart')" text="Play Again" />
  </div>
</template>

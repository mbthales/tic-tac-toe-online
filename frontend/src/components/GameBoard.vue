<script setup lang="ts">
function handlePlayerMove(cell: string) {
  console.log(`Player moved to cell: ${cell}`)
}
</script>

<template>
  <div class="flex justify-center gap-4">
    <div class="flex flex-col gap-2">
      <div
        @click="handlePlayerMove('0,0')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
      <div
        @click="handlePlayerMove('0,1')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
      <div
        @click="handlePlayerMove('0,2')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
    </div>
    <div class="flex flex-col gap-2">
      <div
        @click="handlePlayerMove('1,0')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
      <div
        @click="handlePlayerMove('1,1')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
      <div
        @click="handlePlayerMove('1,2')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
    </div>
    <div class="flex flex-col gap-2">
      <div
        @click="handlePlayerMove('2,0')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
      <div
        @click="handlePlayerMove('2,1')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
      <div
        @click="handlePlayerMove('2,2')"
        class="w-[200px] h-[200px] border border-gray-300"
      ></div>
    </div>
  </div>
</template>

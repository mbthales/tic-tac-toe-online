<script setup lang="ts">
import { onMounted } from 'vue';

import useWebSocket from './composables/useWebSocket';

const {connect, sendMessage} = useWebSocket();

onMounted(() => {
  connect('ws://localhost:3000');
});
</script>

<template>
  <h1>
    Tic Tac Toe
  </h1>
  <button @click="sendMessage(JSON.stringify({id: Math.floor(Math.random() * 11), status: 'searching for player'}))">
    Searching Player
  </button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

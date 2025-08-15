import { ref } from "vue"

export default function useWebSocket() {
  const socket = ref<WebSocket | null>(null);

  const connect = (url: string) => {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.value.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
    };

    socket.value.onclose = () => {
      console.log("WebSocket disconnected");
    };
  };

  const sendMessage = (message: string) => {
    if (socket.value) {
      socket.value.send(message);
    }
  };

  return {
    connect,
    sendMessage,
  };
}

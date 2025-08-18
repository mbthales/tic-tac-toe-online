import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@stores': '/src/stores',
      '@app-types': '/src/types',
      '@helpers': '/src/helpers',
      '@components': '/src/components',
      '@composables': '/src/composables',
    },
  },
})

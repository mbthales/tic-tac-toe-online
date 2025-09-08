import { defineConfig } from 'vite'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@stores': '/src/stores',
      '@app-types': '/src/types',
      '@helpers': '/src/helpers',
      '@components': '/src/components',
      '@services': '/src/services',
      '@config': '/src/config',
    },
  },
})

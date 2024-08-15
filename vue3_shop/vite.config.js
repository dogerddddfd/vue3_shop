import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
    ElementPlus({
      // options
    }),
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/*\/api/, '/api/private/v1/')
      }
    }
  }
})


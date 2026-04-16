import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // node-sass used to implicitly resolve imports from the src root;
        // mimic that so existing @import "variables" statements keep working.
        loadPaths: [resolve(__dirname, 'src')],
      },
    },
  },
})

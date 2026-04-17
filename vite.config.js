import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

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
        // Silence @import deprecation warnings (still valid, removal is Dart Sass 3.x)
        silenceDeprecations: ['import'],
      },
    },
  },
})

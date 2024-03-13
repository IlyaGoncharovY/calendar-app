/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  base: "/calendar-app",
  plugins: [react()],
  assetsInclude:  ["**/*.docx"],
  define: { global: "window" },
  build: {
    target: 'es6',
    minify: false,
    // rollupOptions: {
    //   output: {
    //     entryFileNames: `[name].js`,
    //     chunkFileNames: `[name].js`,
    //     assetFileNames: `[name].[ext]`,
    //   }
    // }
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
})

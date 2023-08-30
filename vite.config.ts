import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/calendar-app",
  plugins: [react()],
  assetsInclude: ["**/*.docx"],
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
  }
})

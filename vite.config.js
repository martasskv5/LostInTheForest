import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './',
  base: '/LostInTheForest/',
  /*server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    hmr: {
      clientPort: 443,
    },
  },*/
});
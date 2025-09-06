import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: false, // 개발 환경에서는 HTTP 사용
    proxy: {
      '/api': {
        target: 'https://warhero.site',
        changeOrigin: true,
        secure: true, // HTTPS 인증서 검증
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    // 프로덕션 빌드 시 HTTPS 강제
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});

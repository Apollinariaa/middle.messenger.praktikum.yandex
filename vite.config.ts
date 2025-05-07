import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: { port: 3000, },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.ts'),
        profile: resolve(__dirname, 'src/pages/profile/profile/index.ts'),
        not_found: resolve(__dirname, 'src/pages/404/index.ts'),
        server_error: resolve(__dirname, 'src/pages/500/index.ts'),
        auth: resolve(__dirname, 'src/pages/auth/index.ts'),
        registration: resolve(__dirname, 'src/pages/registration/index.ts'),
        chat: resolve(__dirname, 'src/pages/chat/index.ts'),
        change_data: resolve(__dirname, 'src/pages/profile/changeData/index.ts'),
        change_password: resolve(__dirname, 'src/pages/profile/changePassword/index.ts'),
      },
    },
  },
});

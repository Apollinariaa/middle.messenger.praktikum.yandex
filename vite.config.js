import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

export default defineConfig({
  server: { port: 3000, historyApiFallback: true },
  build: {
    // outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        profile: resolve(__dirname, 'src/pages/profile/Profile.html'),
        not_found: resolve(__dirname, 'src/pages/404/NotFound.html'),
        server_error: resolve(__dirname, 'src/pages/500/ServerError.html'),
        auth: resolve(__dirname, 'src/pages/auth/Auth.html'),
        registration: resolve(__dirname, 'src/pages/registration/Registration.html'),
        chat: resolve(__dirname, 'src/pages/chat/Chat.html'),
        change_data: resolve(__dirname, 'src/pages/profile/ChangeData.html'),
        change_password: resolve(__dirname, 'src/pages/profile/ChangePassword.html'),
      }
    }
  },
  plugins: [handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        email: 'pochta@yandex.ru',
        login: 'ivanivanov',
        first_name: 'Иван',
        second_name: 'Иванов',
        display_name: 'Иван',
        phone: '+7 (999) 999 99 99'
      },
    })],
})

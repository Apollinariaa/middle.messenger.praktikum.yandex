import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [handlebars()],
  server: { port: 3000, },
  preview: { port: 3000 },
  build: {
    outDir: 'dist'
  },
});

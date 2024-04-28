// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'PDF-generator-client.ts'),
      name: 'pdf-generator-client',
      fileName: 'pdf-generator-client',
    },
  },
  plugins: [dts()],
});
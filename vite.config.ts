import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'MyLibrary',
      fileName: (format) => `minimal-calendar-component.${format}.js`,
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
});

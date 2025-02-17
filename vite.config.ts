import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';

export default defineConfig({
  base: './',
  plugins: [
    electron({
      entry: 'electron/main.ts',
    }),
    electron({
      entry: 'electron/preload.ts',
    }),
  ],
});

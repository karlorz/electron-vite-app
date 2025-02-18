import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as electronPlugin from 'vite-plugin-electron/simple';

export default defineConfig(({ command }) => {
  const isElectron = process.env.ELECTRON === 'true';
  const base = command === 'build' && !isElectron ? '/electron-vite-app/' : './';
  
  return {
    base,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: 'index.html'
        }
      }
    },
    plugins: [
      react(),
      isElectron && electronPlugin.default({
        main: {
          entry: 'electron/main.ts',
          onstart({ startup }) {
            startup();
          },
        },
        preload: {
          input: 'electron/preload.ts',
        }
      })
    ].filter(Boolean)
  };
});

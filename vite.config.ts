import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const isElectron = process.env.ELECTRON === 'true';
  const base = command === 'build' && !isElectron ? '/electron-vite-app/' : './';
  
  return {
    base,
    build: {
      outDir: isElectron ? 'dist-electron' : 'dist',
      rollupOptions: {
        input: {
          main: isElectron ? 'electron/main.ts' : 'index.html'
        }
      }
    },
    plugins: [
      react(),
      isElectron && electron({
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

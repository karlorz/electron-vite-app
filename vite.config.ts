import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const isElectron = process.env.ELECTRON === 'true';
  const base = command === 'build' && !isElectron ? '/electron-vite-app/' : './';
  
  return {
    base,
    plugins: [
      react(),
      isElectron && electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: 'electron/preload.ts',
        }
      })
    ]
  };
});

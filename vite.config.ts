/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isServe = command === 'serve';
  const isBuild = command === 'build';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  const isElectron = process.env.NODE_ENV === 'development';

  return {
    base: isElectron ? './' : (process.env.NODE_ENV === 'production' ? '/electron-vite-app/' : '/'),
    root: process.cwd(),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VITE_APP_VERSION': JSON.stringify(process.env.VITE_APP_VERSION),
    },
    plugins: [
      react(),
      electron({
        entry: 'electron/main.ts',
        onstart({ startup }) {
          if (process.env.VSCODE_DEBUG) {
            console.log('[startup] Electron App');
          }
          startup();
        },
        vite: {
          build: {
            sourcemap,
            minify: isBuild,
            outDir: 'dist-electron',
            rollupOptions: {
              external: Object.keys('dependencies' in require('./package.json') ? require('./package.json').dependencies : {}),
            },
          },
        },
      }),
      electron({ // 預加載腳本插件 (新增)
        entry: 'electron/preload.ts',
        vite: {
          build: {
            sourcemap,
            outDir: 'dist-electron', // 預加載腳本輸出目錄 (與主進程相同)
          },
        },
      }),
    ],
    build: {
      outDir: 'dist', // Web 應用輸出目錄
      emptyOutDir: true,
      sourcemap: sourcemap,
    },
  };
});

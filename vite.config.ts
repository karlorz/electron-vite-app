import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  const isBuild = command === 'build';
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  return {
    base: process.env.GITHUB_ACTIONS ? '/electron-vite-app/' : '/',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
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
    ],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: sourcemap,
    },
  };
});

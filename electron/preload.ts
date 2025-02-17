import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    getAppInfo: () => ipcRenderer.invoke('get-app-info'),
    // Add more IPC methods here as needed
    platform: process.platform,
    versions: {
      node: process.versions.node,
      chrome: process.versions.chrome,
      electron: process.versions.electron,
    },
  }
);

// TypeScript interface for the exposed API
declare global {
  interface Window {
    electron: {
      getAppInfo: () => Promise<{
        version: string;
        name: string;
        electron: string;
        chrome: string;
        node: string;
      }>;
      platform: string;
      versions: {
        node: string;
        chrome: string;
        electron: string;
      };
    };
  }
}

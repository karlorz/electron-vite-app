import { contextBridge } from 'electron';

try {
  contextBridge.exposeInMainWorld('electron', {
    platform: process.platform,
    versions: process.versions,
    isElectron: true,
    getAppInfo: async () => {
      return {
        platform: process.platform,
        versions: process.versions
      };
    }
  });
} catch (error) {
  console.error('Error in preload script:', error);
}

export {};

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

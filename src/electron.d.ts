export interface Versions {
  node: string;
  chrome: string;
  electron: string;
  [key: string]: string;
}

export interface AppInfo {
  platform: string;
  versions: Versions;
}

export interface ElectronAPI {
  platform: string;
  versions: Versions;
  isElectron: boolean;
  getAppInfo(): Promise<AppInfo>;
}

declare global {
  interface Window {
    electron: ElectronAPI | undefined;
  }
}

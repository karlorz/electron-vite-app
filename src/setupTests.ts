import '@testing-library/jest-dom';

// Mock window.electron for tests
window.electron = {
  getAppInfo: () => Promise.resolve({
    version: '1.0.0',
    name: 'Electron Vite App',
    electron: '25.3.1',
    chrome: '114.0.5735.289',
    node: '18.15.0'
  }),
  platform: 'test',
  versions: {
    node: '18.15.0',
    chrome: '114.0.5735.289',
    electron: '25.3.1'
  }
};

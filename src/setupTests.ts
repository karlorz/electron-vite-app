import '@testing-library/jest-dom';

// Mock window.electron for tests
window.electron = {
  getAppInfo: () => Promise.resolve({
    platform: 'test',
    versions: {
      node: '18.15.0',
      chrome: '114.0.5735.289',
      electron: '25.3.1'
    }
  }),
  platform: 'test',
  versions: {
    node: '18.15.0',
    chrome: '114.0.5735.289',
    electron: '25.3.1'
  },
  isElectron: false
};

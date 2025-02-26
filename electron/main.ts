import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'node:path';
import * as electronDevtools from 'electron-devtools-installer';

// Determine preload path and environment
const isDev = process.env.NODE_ENV === 'development' && process.env.ELECTRON === 'true';
const preloadPath = isDev
  ? join(process.cwd(), 'dist-electron', 'preload.js')
  : join(process.cwd(), 'dist-electron', 'preload.js');

async function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath,
      sandbox: false
    },
  });

  // Load the app
  if (isDev) {
    // Development mode
    try {
      await mainWindow.loadURL('http://localhost:5173');
      mainWindow.webContents.openDevTools();

      // Install React DevTools
      try {
        await electronDevtools.default(electronDevtools.REACT_DEVELOPER_TOOLS);
        console.log('Added React DevTools');
      } catch (err) {
        console.log('An error occurred adding React DevTools: ', err);
      }
    } catch (err) {
      console.error('Failed to load dev server:', err);
    }
  } else {
    // Production mode
    try {
      await mainWindow.loadFile(join(process.cwd(), 'dist/index.html'));
    } catch (err) {
      console.error('Failed to load app:', err);
    }
  }

  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log('Renderer process console message:', message);
  });

  mainWindow.webContents.on('unresponsive', () => {
    console.log('Renderer process unresponsive');
  });

  mainWindow.webContents.on('render-process-gone', (event, details) => {
    console.log('Renderer process gone:', details);
    if (details.reason === 'crashed') {
      console.log('Renderer process crashed');
    }
  });


  // Set up IPC handlers
  setupIpcHandlers();

  return mainWindow;
}

function setupIpcHandlers() {
  // Example IPC handler
  ipcMain.handle('get-app-info', () => {
    return {
      version: app.getVersion(),
      name: app.getName(),
      electron: process.versions.electron,
      chrome: process.versions.chrome,
      node: process.versions.node,
    };
  });
}

// App ready
app.whenReady()
  .then(async () => {
    const mainWindow = await createWindow();

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await createWindow();
      }
    });
  })
  .catch(console.error);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle any uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

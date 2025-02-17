import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

async function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
    },
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    // Development mode
    try {
      await mainWindow.loadURL('http://localhost:5173');
      mainWindow.webContents.openDevTools();
      
      // Install React DevTools
      try {
        await installExtension(REACT_DEVELOPER_TOOLS);
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
      await mainWindow.loadFile(join(__dirname, '../dist/index.html'));
    } catch (err) {
      console.error('Failed to load app:', err);
    }
  }

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

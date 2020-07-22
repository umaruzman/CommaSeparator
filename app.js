const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const url = require('url');
const ipc = require('electron').ipcMain;

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 900,
    height: 600,
    minHeight: 600,
    minWidth: 900,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/index.html')

  // Open the DevTools.
  // win.webContents.openDevTools()


  //Menu Section

  Menu.setApplicationMenu(null);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipc.on('update-selector', function (event, arg) {
  win.webContents.send('new-selector' , arg);
});
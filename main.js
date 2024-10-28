const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // ipcRenderer kullanımı için gerekli
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Klasör seçimi için IPC kanalını dinleyin
ipcMain.handle('open-folder-dialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (result.canceled) {
    return null;
  } else {
    return result.filePaths[0];
  }
});

ipcMain.handle('select-manga-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  });

  if (result.canceled || result.filePaths.length === 0) {
    throw new Error('No folder selected');
  }

  const mangaFolderPath = result.filePaths[0];
  const normalizedPath = path.resolve(mangaFolderPath);

  // Bölüm klasörlerini bulma ve sıralama
  const chapters = fs.readdirSync(normalizedPath)
    .filter(file => fs.statSync(path.join(normalizedPath, file)).isDirectory())
    .sort((a, b) => {
      const numA = parseInt(a, 10);
      const numB = parseInt(b, 10);
      return numA - numB;
    })
    .map(chapter => {
      const chapterPath = path.join(normalizedPath, chapter);
      const pages = fs.readdirSync(chapterPath)
        .filter(file => path.extname(file).toLowerCase() === '.webp')
        .sort();
      return { name: chapter, pages };
    });

  if (chapters.length === 0) {
    throw new Error('No valid chapters found in the selected folder.');
  }

  return { folderPath: mangaFolderPath, chapters };
});

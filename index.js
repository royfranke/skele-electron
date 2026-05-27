// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs')

const CHUNKS_DIR = path.join(__dirname, 'game', 'assets', 'chunks')

function resolveSlotChunkDir(slot) {
  if (slot === undefined || slot === null) {
    return null
  }

  const slotNumber = Number(slot)
  if (!Number.isInteger(slotNumber) || slotNumber < 0) {
    return null
  }

  return path.join(__dirname, 'game', 'data', 'saves', `slot_${slotNumber}`, 'chunks')
}

function saveData(data) {
  console.log("Trying to save data... for slot "+data.slot);
  fs.writeFile("./game/data/saves/slot_"+data.slot+".json", JSON.stringify(data.data), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  }); 
}

function saveSettings(data) {
  console.log("Trying to save settings... for "+data.type);
  fs.writeFile("./game/data/config_"+(data.type.toLowerCase())+".json", JSON.stringify(data.data), function(err) {
    if(err) {
        return console.log(err);
    }
    return console.log(data.type+" settings were saved!");
  }); 
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'electron-preload.js'),
      contextIsolation: true,
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('./game/index.html')

  // Open the DevTools.
   mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

ipcMain.handle('save-data', async (event, data) => {
  saveData(data); 
});

ipcMain.handle('save-settings', async (event, data) => {
  saveSettings(data); 
});

ipcMain.handle('load-chunk', async (_event, data) => {
  const { chunkX, chunkY, slot } = data || {}

  if (!Number.isInteger(chunkX) || !Number.isInteger(chunkY)) {
    return { ok: false, reason: 'invalid-coordinates' }
  }

  const fileName = `chunk_${chunkX}_${chunkY}.json`
  const slotChunkDir = resolveSlotChunkDir(slot)
  const candidatePaths = []

  if (slotChunkDir) {
    candidatePaths.push(path.join(slotChunkDir, fileName))
  }
  candidatePaths.push(path.join(CHUNKS_DIR, fileName))

  try {
    for (const filePath of candidatePaths) {
      try {
        const raw = await fs.promises.readFile(filePath, 'utf8')
        return { ok: true, data: JSON.parse(raw), sourcePath: filePath }
      } catch (error) {
        if (!error || error.code !== 'ENOENT') {
          return {
            ok: false,
            reason: 'read-failed',
            code: error?.code,
            message: error?.message,
            path: filePath,
          }
        }
      }
    }

    return { ok: false, reason: 'not-found' }
  } catch (error) {
    return {
      ok: false,
      reason: 'read-failed',
      code: error?.code,
      message: error?.message,
    }
  }
})

ipcMain.handle('save-chunk', async (_event, data) => {
  const { chunkX, chunkY, chunkData, slot } = data || {}

  if (!Number.isInteger(chunkX) || !Number.isInteger(chunkY) || chunkData == null) {
    return {
      ok: false,
      reason: 'invalid-payload',
      details: {
        chunkXType: typeof chunkX,
        chunkYType: typeof chunkY,
        hasChunkData: chunkData != null,
      },
    }
  }

  const fileName = `chunk_${chunkX}_${chunkY}.json`
  const slotChunkDir = resolveSlotChunkDir(slot)
  const targetDir = slotChunkDir || CHUNKS_DIR
  const filePath = path.join(targetDir, fileName)

  try {
    await fs.promises.mkdir(targetDir, { recursive: true })
    await fs.promises.writeFile(filePath, JSON.stringify(chunkData), 'utf8')
    return { ok: true, path: filePath }
  } catch (error) {
    return {
      ok: false,
      reason: 'write-failed',
      code: error?.code,
      message: error?.message,
      path: filePath,
      targetDir,
    }
  }
})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
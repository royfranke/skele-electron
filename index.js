// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs')

const CHUNKS_DIR = path.join(__dirname, 'game', 'assets', 'chunks')
const PORTAL_INDEX_FILE = 'portal_index.json'
const SETTINGS_DEFAULTS_FILE = path.join(__dirname, 'game', 'data', 'config_settings.json')
const SETTINGS_FILE = 'settings.json'

let settingsDefaultsCache = null

function settingsFilePath() {
  return path.join(app.getPath('userData'), SETTINGS_FILE)
}

async function readSettingsDefaults() {
  if (settingsDefaultsCache) {
    return settingsDefaultsCache
  }

  const raw = await fs.promises.readFile(SETTINGS_DEFAULTS_FILE, 'utf8')
  settingsDefaultsCache = JSON.parse(raw)
  return settingsDefaultsCache
}

// Overrides arrive from the renderer, so every key/value is checked against the
// shipped defaults before it is written to disk.
function sanitizeOverrides(defaults, incoming) {
  const clean = {}

  if (!incoming || typeof incoming !== 'object') {
    return clean
  }

  for (const category of Object.keys(defaults)) {
    const categoryDefaults = defaults[category] && defaults[category].DEFAULT
    const submitted = incoming[category]

    if (!categoryDefaults || !submitted || typeof submitted !== 'object') {
      continue
    }

    const available = defaults[category] && defaults[category].AVAILABLE
    const categoryClean = {}

    for (const [key, value] of Object.entries(submitted)) {
      if (!Object.prototype.hasOwnProperty.call(categoryDefaults, key)) {
        continue
      }

      const fallback = categoryDefaults[key]
      if (typeof value !== typeof fallback) {
        continue
      }

      if (typeof fallback === 'number') {
        if (!Number.isFinite(value)) {
          continue
        }
        // Every numeric setting today is a 0-10 level.
        categoryClean[key] = Math.min(10, Math.max(0, Math.round(value)))
        continue
      }

      if (typeof fallback === 'string') {
        if (available && !Object.prototype.hasOwnProperty.call(available, value)) {
          continue
        }
      }

      categoryClean[key] = value
    }

    if (Object.keys(categoryClean).length > 0) {
      clean[category] = categoryClean
    }
  }

  return clean
}

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

ipcMain.handle('load-settings', async () => {
  let defaults

  try {
    defaults = await readSettingsDefaults()
  } catch (error) {
    return {
      ok: false,
      reason: 'defaults-unreadable',
      code: error && error.code,
      message: error && error.message,
    }
  }

  const filePath = settingsFilePath()

  try {
    const raw = await fs.promises.readFile(filePath, 'utf8')
    return { ok: true, data: sanitizeOverrides(defaults, JSON.parse(raw)), path: filePath }
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return { ok: true, data: {}, path: filePath }
    }

    return {
      ok: false,
      reason: 'read-failed',
      code: error && error.code,
      message: error && error.message,
      path: filePath,
    }
  }
});

ipcMain.handle('save-settings', async (_event, data) => {
  let defaults

  try {
    defaults = await readSettingsDefaults()
  } catch (error) {
    return {
      ok: false,
      reason: 'defaults-unreadable',
      code: error && error.code,
      message: error && error.message,
    }
  }

  const overrides = sanitizeOverrides(defaults, data && data.overrides)
  const filePath = settingsFilePath()

  try {
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
    await fs.promises.writeFile(filePath, JSON.stringify(overrides, null, 2), 'utf8')
    return { ok: true, data: overrides, path: filePath }
  } catch (error) {
    return {
      ok: false,
      reason: 'write-failed',
      code: error && error.code,
      message: error && error.message,
      path: filePath,
    }
  }
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

ipcMain.handle('load-portal-index', async (_event, data) => {
  const { slot } = data || {}

  const slotChunkDir = resolveSlotChunkDir(slot)
  const candidatePaths = []

  if (slotChunkDir) {
    candidatePaths.push(path.join(slotChunkDir, PORTAL_INDEX_FILE))
  }
  candidatePaths.push(path.join(CHUNKS_DIR, PORTAL_INDEX_FILE))

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

ipcMain.handle('save-portal-index', async (_event, data) => {
  const { slot, portalIndex } = data || {}

  if (portalIndex == null || typeof portalIndex !== 'object') {
    return {
      ok: false,
      reason: 'invalid-payload',
      details: {
        hasPortalIndex: portalIndex != null,
        portalIndexType: typeof portalIndex,
      },
    }
  }

  const slotChunkDir = resolveSlotChunkDir(slot)
  const targetDir = slotChunkDir || CHUNKS_DIR
  const filePath = path.join(targetDir, PORTAL_INDEX_FILE)

  try {
    await fs.promises.mkdir(targetDir, { recursive: true })
    await fs.promises.writeFile(filePath, JSON.stringify(portalIndex), 'utf8')
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
import { ipcMain, globalShortcut } from "electron";

const path = require("path");
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, "../dist/preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer.html"));

  globalShortcut.register("F24", () => {
    console.log("F24 Pressed - Toggle Menu");
    mainWindow?.webContents.send("toggle-menu");
  });

  ipcMain.on("rotate", (_, direction) => {
    console.log(`Rotate: ${direction}`);
    mainWindow?.webContents.send("rotate", direction);
  });

  // mainWindow.webContents.openDevTools();
});

ipcMain.on("exit-app", () => {
  console.log("Exit app...");
  app.quit();
});

app.on("window-all-closed", () => {
  app.quit();
});

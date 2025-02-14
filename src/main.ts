import { ipcMain } from "electron";
import { GlobalKeyboardListener } from "node-global-key-listener";

const path = require("path");
import { app, BrowserWindow } from "electron";

let mainWindow: BrowserWindow | null = null;
const keyboard = new GlobalKeyboardListener();

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

  keyboard.addListener((event) => {
    // console.log(event.name)
    if (event.name === "F24" && event.state === "DOWN") {
      console.log("F24 Pressed - Toggle Menu");
      mainWindow?.webContents.send("toggle-menu");
    }
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

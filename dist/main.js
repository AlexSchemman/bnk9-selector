"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_global_key_listener_1 = require("node-global-key-listener");
const path = require("path");
const electron_2 = require("electron");
let mainWindow = null;
const keyboard = new node_global_key_listener_1.GlobalKeyboardListener();
electron_2.app.whenReady().then(() => {
    mainWindow = new electron_2.BrowserWindow({
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
    electron_1.ipcMain.on("rotate", (_, direction) => {
        console.log(`Rotate: ${direction}`);
        mainWindow?.webContents.send("rotate", direction);
    });
    // mainWindow.webContents.openDevTools();
});
electron_1.ipcMain.on("exit-app", () => {
    console.log("Exit app...");
    electron_2.app.quit();
});
electron_2.app.on("window-all-closed", () => {
    electron_2.app.quit();
});

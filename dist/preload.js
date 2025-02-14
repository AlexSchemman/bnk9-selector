"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("electron", {
    toggleMenu: (callback) => electron_1.ipcRenderer.on("toggle-menu", callback),
    sendRotate: (direction) => electron_1.ipcRenderer.send("rotate", direction),
    rotate: (callback) => electron_1.ipcRenderer.on("rotate", (_, direction) => callback(direction)),
    exitApp: () => electron_1.ipcRenderer.send("exit-app"),
});

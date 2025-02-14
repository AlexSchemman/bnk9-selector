import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  toggleMenu: (callback: () => void) => ipcRenderer.on("toggle-menu", callback),
  sendRotate: (direction: string) => ipcRenderer.send("rotate", direction),
  rotate: (callback  : any) => ipcRenderer.on("rotate", (_, direction) => callback(direction)),
  exitApp: () => ipcRenderer.send("exit-app"),
});

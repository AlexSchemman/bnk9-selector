export {};

declare global {
  interface Window {
    electron: {
      toggleMenu: (callback: () => void) => void;
      rotate: (callback: (direction: "left" | "right") => void) => void;
      sendRotate: (direction: string) => void;
      exitApp: () => void;
    };
  }
}

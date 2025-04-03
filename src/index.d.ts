export {};

declare global {
  interface Window {
    parentIframe?: {
      sendMessage: (message: {
        type: "resize";
        newChildHeight: number;
      }) => void;
    };
  }
}

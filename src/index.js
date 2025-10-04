import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/win11-animations.css";
import App from "./App";

// Performance optimizations - preload non-critical assets during idle time
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    const preloadAssets = () => {
      const assets = [

        '/images/apps/chrome.png',
        '/images/apps/vscode.png',
        '/images/apps/edge.png',
        '/images/apps/settings.png'
      ];
      
      assets.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadAssets();
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import soundManager from '../../utils/soundManager';
import { useWindowSizing } from "../../hooks/useWindowSizing";

function VsCode({ isAppOpen, toggleVsCode, bounds, minimizeWindow, isMinimized }) {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { width: windowWidth, height: windowHeight, isMobile } = useWindowSizing(1128, 720, {
    minWidth: 360,
    minHeight: 420,
    desktopMargin: 160,
    tabletMargin: 112,
    mobileMargin: 40
  });

  const isFullViewport = isFullscreen || isMobile;

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  return (
    <div className={`${isAppOpen && !isMinimized ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
      <Draggable handle=".title-bar" bounds={isFullViewport ? false : bounds} disabled={isFullViewport}>
        <motion.div 
          className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto ${
            isFullViewport ? 'rounded-none fixed inset-0 z-50 max-h-[100dvh]' : 'rounded-xl'
          }`}
          layout
          animate={{
            width: isFullViewport ? '100vw' : `${windowWidth}px`,
            height: isFullViewport ? '100vh' : `${windowHeight}px`,
            x: isFullViewport ? 0 : undefined,
            y: isFullViewport ? 0 : undefined,
            borderRadius: isFullViewport ? 0 : 12
          }}
          style={isFullViewport ? { width: '100vw', height: '100dvh', maxHeight: '100dvh' } : undefined}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            layout: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          <div className="title-bar glass-titlebar">
            <div className="h-9 flex items-center justify-between px-3 select-none">
              <div className="font-normal flex items-center gap-2 titlebar-section">
                <span className="material-symbols-outlined text-blue-400">code</span>
                <span>Visual Studio Code</span>
              </div>
              <div className="flex items-center titlebar-section">
                <button
                  type="button"
                  className="titlebar-button"
                  onClick={() => {
                    soundManager.play('minimize');
                    minimizeWindow('vscode');
                  }}
                  title="Minimize"
                  aria-label="Minimize VS Code window"
                >
                  <span className="material-symbols-outlined">minimize</span>
                </button>
                <motion.button
                  type="button"
                  className="titlebar-button"
                  onClick={() => {
                    soundManager.play(isFullscreen ? 'minimize' : 'maximize');
                    setIsFullscreen(!isFullscreen);
                  }}
                  title={isFullscreen ? 'Restore Down' : 'Maximize'}
                  aria-label={isFullscreen ? 'Restore VS Code window' : 'Maximize VS Code window'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                </motion.button>
                <button
                  type="button"
                  className="titlebar-button titlebar-button--close"
                  onClick={toggleVsCode}
                  title="Close"
                  aria-label="Close VS Code window"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          </div>
          <div className="content text-white select-none text-center flex justify-center h-full">
            {contentLoaded && (
              <iframe
                src="https://github1s.com/Soumedhik/portfolio"
                title="VsCode"
                className="h-full w-full bg-ub-cool-grey"
              ></iframe>
            )}
          </div>
        </motion.div>
      </Draggable>
    </div>
  );
}

export default VsCode;
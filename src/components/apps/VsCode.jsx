import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import soundManager from '../../utils/soundManager';

function VsCode({ isAppOpen, toggleVsCode, bounds, minimizeWindow, isMinimized }) {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  return (
    <div className={`${isAppOpen && !isMinimized ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
      <Draggable handle=".title-bar" bounds={bounds} disabled={isFullscreen}>
        <motion.div 
          className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto ${isFullscreen ? 'rounded-none fixed top-0 left-0 z-50' : 'rounded-xl'}`}
          layout
          animate={{
            width: isFullscreen ? '100vw' : '70.5rem',
            height: isFullscreen ? '100vh' : '45rem',
            x: isFullscreen ? 0 : undefined,
            y: isFullscreen ? 0 : undefined,
            borderRadius: isFullscreen ? 0 : 12
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            layout: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          <div className="title-bar flex justify-between items-center bg-neutral-800 text-white h-9 select-none">
            <div className="m-1 ml-4 font-normal flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-400">code</span>
              <span>Visual Studio Code</span>
            </div>
            <div className="flex">
              <div
                className="material-symbols-outlined hover:bg-neutral-700 mb-2 w-11 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                onClick={() => {
                  soundManager.play('minimize');
                  minimizeWindow('vscode');
                }}
                title="Minimize"
              >
                minimize
              </div>
              <motion.div
                className="material-symbols-outlined hover:bg-neutral-700 mb-2 w-11 flex justify-center items-center text-sm cursor-pointer transition-all duration-200"
                onClick={() => {
                  soundManager.play(isFullscreen ? 'minimize' : 'maximize');
                  setIsFullscreen(!isFullscreen);
                }}
                title={isFullscreen ? 'Restore Down' : 'Maximize'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: [0.76, 0, 0.24, 1] }}
              >
                {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
              </motion.div>
              <div
                className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                onClick={toggleVsCode}
                title="Close"
              >
                close
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
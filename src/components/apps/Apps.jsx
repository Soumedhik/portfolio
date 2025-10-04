import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import soundManager from '../../utils/soundManager';
import { useWindowSizing } from "../../hooks/useWindowSizing";

function Apps({ isAppOpen, toggleApp, bounds, input, minimizeWindow, isMinimized }) {
  const [contentLoaded, setContentLoaded] = useState(false);
  const [commands, setCommands] = useState("");
  const [output, setOutput] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { width: windowWidth, height: windowHeight, isMobile } = useWindowSizing(1128, 720, {
    minWidth: 360,
    minHeight: 420,
    desktopMargin: 160,
    tabletMargin: 112,
    mobileMargin: 40
  });
  const isFullViewport = isFullscreen || isMobile;

  const handleInput = (e) => {
    if (e.key === "Enter") {
      if (input.trim() === "cls") {
        setOutput([]);
      }
      const newOutput = [...output, { commands, result: `Executed: ${input}` }];
      setOutput(newOutput);
      setCommands("");
    }
  };

  useEffect(() => {
    if (isAppOpen && !contentLoaded) {
      setContentLoaded(true);
    }
  }, [isAppOpen, contentLoaded]);

  // Handle ambient music when Spotify is active
  useEffect(() => {
    if (isAppOpen && !isMinimized && input === "spotify") {
      // Pause ambient music when Spotify opens or is switched to
      soundManager.pauseAmbientForExternal();
    } else if (isAppOpen && !isMinimized && input !== "spotify") {
      // Resume ambient music when switching away from Spotify
      soundManager.resumeAmbientFromExternal();
    } else if ((!isAppOpen || isMinimized)) {
      // Resume ambient music when Apps window closes or minimizes
      soundManager.resumeAmbientFromExternal();
    }
  }, [isAppOpen, isMinimized, input]);

  // Cleanup: Resume ambient music when component unmounts
  useEffect(() => {
    return () => {
      if (input === "spotify") {
        soundManager.resumeAmbientFromExternal();
      }
    };
  }, [input]);

  return (
    <>
      <div
        className={`${
          isAppOpen && !isMinimized ? "" : "hidden"
        } z-30 w-full h-screen pointer-events-none absolute`}
      >
        <Draggable
          handle=".title-bar"
          bounds={isFullViewport ? false : bounds}
          disabled={isFullViewport}
        >
          {input === "spotify" ? (
            <motion.div 
              className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] font-semibold pointer-events-auto ${
                isFullViewport ? 'rounded-none fixed inset-0 z-50 max-h-[100dvh]' : 'rounded-xl'
              }`}
              layout
              animate={{
                width: isFullViewport ? '100vw' : `${windowWidth}px`,
                height: isFullViewport ? '100vh' : `${windowHeight}px`,
                maxWidth: isFullViewport ? '100vw' : '95vw',
                maxHeight: isFullViewport ? '100vh' : '90vh',
                x: isFullViewport ? 0 : undefined,
                y: isFullViewport ? 0 : undefined,
                borderRadius: isFullViewport ? 0 : 12
              }}
              style={isFullViewport ? { width: '100vw', height: '100dvh', maxHeight: '100dvh' } : undefined}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                layout: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
              }}
            >
              <div className="title-bar glass-titlebar">
                <div className="h-9 flex items-center justify-between px-3 select-none">
                  <div className="font-normal titlebar-section">Spotify</div>
                  <div className="flex items-center titlebar-section">
                    <button
                      type="button"
                      className="titlebar-button"
                      onClick={() => {
                        soundManager.play('minimize');
                        soundManager.resumeAmbientFromExternal();
                        minimizeWindow('apps');
                      }}
                      title="Minimize"
                      aria-label="Minimize Spotify"
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
                      aria-label={isFullscreen ? 'Restore Spotify window' : 'Maximize Spotify window'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                    </motion.button>
                    <button
                      type="button"
                      className="titlebar-button titlebar-button--close"
                      onClick={() => {
                        soundManager.resumeAmbientFromExternal();
                        toggleApp();
                      }}
                      title="Close"
                      aria-label="Close Spotify"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="content text-white select-none text-center flex justify-center h-full">
                {contentLoaded && (
                  <iframe
                    title="Spotify"
                    style={{ borderRadius: "20px", border: "2px solid black" }}
                    src="https://open.spotify.com/embed/playlist/3rxbSirTaXLDgKUOKzLpYL?utm_source=generator&theme=0"
                    width="100%"
                    height="100%"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}
              </div>
            </motion.div>
          ) : input === "terminal" ? (
            <motion.div 
              className={`window bg-neutral-800 overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto ${
                isFullViewport ? 'rounded-none fixed inset-0 z-50 max-h-[100dvh]' : ''
              }`}
              layout
              animate={{
                width: isFullViewport ? '100vw' : `${windowWidth}px`,
                height: isFullViewport ? '100vh' : `${windowHeight}px`,
                maxWidth: isFullViewport ? '100vw' : '95vw',
                maxHeight: isFullViewport ? '100vh' : '90vh',
                x: isFullViewport ? 0 : undefined,
                y: isFullViewport ? 0 : undefined,
                borderRadius: isFullViewport ? 0 : 12
              }}
              style={isFullViewport ? { width: '100vw', height: '100dvh', maxHeight: '100dvh' } : undefined}
              transition={{
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1],
                layout: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
              }}
            >
              <div className="title-bar glass-titlebar">
                <div className="h-9 w-full flex items-center justify-end px-3 select-none">
                  <div className="flex-1" />
                  <div className="flex items-center titlebar-section">
                    <button
                      type="button"
                      className="titlebar-button"
                      onClick={() => {
                        soundManager.play('minimize');
                        minimizeWindow('apps');
                      }}
                      title="Minimize"
                      aria-label="Minimize terminal"
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
                      aria-label={isFullscreen ? 'Restore terminal window' : 'Maximize terminal window'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                    </motion.button>
                    <button
                      type="button"
                      className="titlebar-button titlebar-button--close"
                      onClick={toggleApp}
                      title="Close"
                      aria-label="Close terminal"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute bg-black top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
                <div className="flex justify-between items-center w-full">
                  <div className="pl-2 text-sm">Windows Powershell</div>
                  <div className="material-symbols-outlined hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
                    close
                  </div>
                </div>
                <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
                  add
                </div>
              </div>
              <div className="bg-black text-white h-screen p-4 font-mono">
                <div className="">Windows PowerShell</div>
                <div className="text-sm">
                  Copyright (C) Microsoft Corporation. All rights reserved.
                </div>
                <div className="my-4 flex gap-2">
                  Install the latest PowerShell for new features and
                  improvements!
                  <div className="hover:underline hover:cursor-pointer">
                    https://aka.ms/PSWindows
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {output.map((line, index) => (
                    <div key={index}>
                      <div className="">PS C:\ {line.commands}</div>
                      <div>{line.result}</div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-2 gap-2">
                  <span className="">PS C:\ </span>
                  <input
                    className="bg-transparent focus:outline-none flex-1"
                    value={commands}
                    onChange={(e) => setCommands(e.target.value)}
                    onKeyDown={handleInput}
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <>hi</>
          )}
        </Draggable>
      </div>
    </>
  );
}

export default Apps;

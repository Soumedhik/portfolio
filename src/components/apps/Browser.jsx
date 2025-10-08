import React, { useRef } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { generateInitials } from "../user/UserProfile";
import { useParams } from "react-router-dom";
import RightClick from "../utilities/RightClick";
import { useWindowSizing } from "../../hooks/useWindowSizing";

const TitleBar = ({ toggleBrowser, isFullscreen, setIsFullscreen, minimizeWindow }) => (
  <div className="title-bar glass-titlebar">
    <div className="h-9 w-full flex items-center justify-between px-3 select-none">
      <div className="flex-1 titlebar-section">
        <RightClick />
      </div>
      <div className="flex items-center titlebar-section">
        <button
          type="button"
          className="titlebar-button"
          onClick={() => minimizeWindow('browser')}
          title="Minimize"
          aria-label="Minimize browser"
        >
          <span className="material-symbols-outlined">minimize</span>
        </button>
        <motion.button
          type="button"
          className="titlebar-button"
          onClick={() => {
            setIsFullscreen(!isFullscreen);
          }}
          title={isFullscreen ? 'Restore Down' : 'Maximize'}
          aria-label={isFullscreen ? 'Restore browser window' : 'Maximize browser window'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
        </motion.button>
        <button
          type="button"
          className="titlebar-button titlebar-button--close"
          onClick={toggleBrowser}
          title="Close"
          aria-label="Close browser"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  </div>
);

const AddressBar = ({ name }) => (
  <div className="flex bg-neutral-800 w-full h-10 border-neutral-700 border-b-[1.5px] mt-1 items-center">
    <div className="flex py-1 w-28 justify-around">
      <div className="material-symbols-outlined font-extralight text-xl opacity-45">arrow_back</div>
      <div className="material-symbols-outlined font-extralight text-xl opacity-45">arrow_forward</div>
      <div className="material-symbols-outlined font-extralight text-xl hover:bg-neutral-600 rounded-xl hover:bg-opacity-50">
        refresh
      </div>
    </div>
    <div className="flex-1 mx-4 my-1.5 rounded-xl bg-neutral-700 relative max-w-[60vw]">
      <div className="opacity-50 text-left pl-3 flex items-center h-full">
        <span className="material-symbols-outlined text-[20px] pr-3">search</span>
        Search Google or type a URL
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg opacity-80 material-symbols-outlined">star</div>
    </div>
    <div className="flex items-center gap-3 pr-4">
      <div className="avatar placeholder flex justify-center items-center">
        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
          {name && <div className="text-white text-xs font-normal">{generateInitials(name)}</div>}
        </div>
      </div>
  <img src="/assets/icons/ui/dots.png" alt="options" className="h-4 w-4 rotate-90 opacity-60" />
    </div>
  </div>
);

const TabBar = () => (
  <div className="absolute bg-neutral-800 top-[6.5px] h-[2em] left-[6px] right-auto w-60 rounded-t-lg flex z-10">
    <div className="flex justify-between items-center w-full">
      <div className="pl-2 text-sm truncate">New Tab</div>
      <div className="material-symbols-outlined hover:bg-neutral-700 m-0.5 w-6 h-6 rounded-md flex justify-center items-center text-lg transition-colors duration-200">
        close
      </div>
    </div>
    <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-700 rounded-md items-center text-xl transition-colors duration-200">
      add
    </div>
  </div>
);

function Browser({ isAppOpen, toggleBrowser, bounds, minimizeWindow, isMinimized }) {
  const explorerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const homeUrl = "https://www.google.com/webhp?igu=1";
  const { name } = useParams();

  const { width: windowWidth, height: windowHeight, isMobile } = useWindowSizing(1128, 720, {
    minWidth: 360,
    minHeight: 420,
    desktopMargin: 180,
    tabletMargin: 112,
    mobileMargin: 40
  });

  const isFullViewport = isFullscreen || isMobile;

  return (
    <>
      <div className={`${isAppOpen && !isMinimized ? "" : "hidden"} z-30 w-full h-screen pointer-events-none absolute`}>
        <Draggable 
          handle=".title-bar"
          nodeRef={explorerRef}
          bounds={isFullViewport ? false : bounds}
          disabled={isFullViewport}
        >
          <motion.div
            ref={explorerRef}
            data-window="browser"
            className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto ${
              isFullViewport
                ? 'rounded-none fixed inset-0 z-50 max-h-[100dvh]'
                : 'rounded-xl'
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
          <TitleBar 
            toggleBrowser={toggleBrowser} 
            isFullscreen={isFullscreen} 
            setIsFullscreen={setIsFullscreen} 
            minimizeWindow={minimizeWindow}
          />
            <div className="content text-white select-none text-center flex flex-col h-full">
              <TabBar />
              <AddressBar name={name} />
              <div className={`flex-grow ${isFullscreen ? 'h-[calc(100vh-130px)]' : 'h-[calc(100%-130px)]'}`}>
                <div className="h-full w-full flex flex-col">
                  <iframe 
                    src={homeUrl} 
                    className="flex-grow w-full border-0" 
                    id="chrome-screen" 
                    title="Chrome Url"
                    style={{ height: '100%' }}
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </Draggable>
      </div>
    </>
  );
}

export default Browser;
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import AboutMe from "../apps/AboutMe";
import soundManager from '../../utils/soundManager';
import { win11Duration, win11Easing } from '../../utils/win11Animations';
import { useWindowSizing } from "../../hooks/useWindowSizing";

const Explorer = ({ isExplorerOpen, toggleExplorer, aboutMe, bounds, minimizeWindow, isMinimized }) => {
  const [page, setPage] = useState("About Me");
  const [icon, setIcon] = useState(null);
  const explorerRef = useRef(null);
  const [expandedDiv, setExpandedDiv] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDivClick = (divNumber) => {
    setExpandedDiv(divNumber === expandedDiv ? 0 : divNumber);
  };

  useEffect(() => {
    if (aboutMe === true) setIcon("home");
    else if (page === "Education") setIcon("edu");
    else if (page === "Skills") setIcon("skills");
    else if (page === "Projects") setIcon("projects");
    else if (page === "Research Experience") setIcon("edu");
    else if (page === "Work Experience") setIcon("projects");
    else if (page === "Position of Responsibility") setIcon("management");
    else if (page === "Conferences") setIcon("edu");
    else if (page === "Awards and Achievements") setIcon("skills");
    else if (page === "Resume") setIcon("resume");
    else if (page === "CV") setIcon("resume");
    else setIcon("me");
  }, [page, aboutMe]);

  // Listen for page change events from About Me buttons
  useEffect(() => {
    const handlePageChange = (event) => {
      setPage(event.detail);
    };
    
    window.addEventListener('changeExplorerPage', handlePageChange);
    
    return () => {
      window.removeEventListener('changeExplorerPage', handlePageChange);
    };
  }, []);

  const {
    width: windowWidth,
    height: windowHeight,
    isMobile
  } = useWindowSizing(1440, 832, {
    minWidth: 420,
    minHeight: 520,
    desktopMargin: 180,
    tabletMargin: 120,
    mobileMargin: 32,
  });

  const windowAnimation = useMemo(() => ({
    width: isFullscreen ? '100vw' : windowWidth,
    height: isFullscreen ? '100vh' : windowHeight,
    x: isFullscreen || isMobile ? 0 : undefined,
    y: isFullscreen || isMobile ? 0 : undefined,
    borderRadius: isFullscreen || isMobile ? 0 : 12,
  }), [isFullscreen, isMobile, windowHeight, windowWidth]);

  const windowClasses = useMemo(() => (
    `window bg-win11-surface bg-opacity-95 backdrop-blur-2xl text-win11-text border border-win11-border shadow-2xl pointer-events-auto ${
      isMobile || isFullscreen ? 'rounded-none fixed top-0 left-0 z-50' : 'rounded-xl'
    } ${
      isMobile || isFullscreen ? 'resize-none' : 'resize'
    }`
  ), [isFullscreen, isMobile]);

  return (
    <div
      className={`${
        isExplorerOpen && !isMinimized ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable handle=".title-bar" nodeRef={explorerRef} bounds={isMobile ? false : bounds} disabled={isMobile || isFullscreen}>
        <motion.div
          ref={explorerRef}
          data-window="explorer"
          className={`${windowClasses} overflow-hidden`}
          style={{
            width: isFullscreen ? '100vw' : windowWidth,
            height: isFullscreen ? '100vh' : windowHeight,
          }}
          layout
          animate={windowAnimation}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1], // Windows 11 signature easing
            layout: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          <div className="title-bar glass-titlebar">
            <div className="h-9 w-full flex items-center justify-end px-3 select-none">
              <div className="flex items-center titlebar-section">
                <button
                  type="button"
                  className="titlebar-button"
                  onClick={() => {
                    soundManager.play('minimize');
                    minimizeWindow('explorer');
                  }}
                  title="Minimize"
                  aria-label="Minimize explorer"
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
                  aria-label={isFullscreen ? 'Restore explorer window' : 'Maximize explorer window'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: win11Duration.faster, ease: win11Easing.fluent }}
                >
                  <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                </motion.button>
                <button
                  type="button"
                  className="titlebar-button titlebar-button--close"
                  onClick={toggleExplorer}
                  title="Close"
                  aria-label="Close explorer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          </div>
          <div className="content text-win11-text select-none">
            <div className="absolute bg-win11-surface/80 border border-win11-border/60 top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
              <div className="flex justify-between items-center w-full">
                <div className="pl-2 text-xs flex text-win11-text-secondary">
                  <img
                    src={`/images/folders/${icon}.png`}
                    alt="main icons"
                    className="w-5 h-5 mr-2"
                  />
                  {aboutMe === true ? "Home" : page}
                </div>
                <div className="material-symbols-outlined hover:bg-win11-surface-hover/70 m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
                  close
                </div>
              </div>
              <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-win11-surface-hover/70 rounded-md items-center text-xl">
                add
              </div>
            </div>
            <div className="bg-win11-surface/80 w-full h-12 border-win11-border border-b mt-1 flex">
              <div className="flex items-center gap-1 px-3 py-1">
                <div className="material-symbols-outlined font-extralight text-xl rounded-md p-1.5 flex items-center justify-center w-8 h-8 transition-colors duration-200 hover:bg-win11-glass-hover">
                  arrow_back
                </div>
                <div className="material-symbols-outlined font-extralight text-xl opacity-45 rounded-md p-1.5 flex items-center justify-center w-8 h-8">
                  arrow_forward
                </div>
                <div className="material-symbols-outlined font-extralight text-xl rounded-md p-1.5 flex items-center justify-center w-8 h-8 transition-colors duration-200 hover:bg-win11-glass-hover">
                  arrow_upward
                </div>
                <div className="material-symbols-outlined font-extralight text-xl rounded-md p-1.5 flex items-center justify-center w-8 h-8 transition-colors duration-200 hover:bg-win11-glass-hover">
                  refresh
                </div>
              </div>
              <div className="flex bg-win11-surface-hover/60 my-1.5 rounded-md items-center text-sm px-2 mx-2 flex-grow gap-2 font-extralight">
                <div className="material-symbols-outlined font-extralight">
                  home
                </div>
                <div className="material-symbols-outlined font-extralight">
                  navigate_next
                </div>
                <div> {aboutMe === true ? "Home" : page}</div>
                <div className="material-symbols-outlined font-extralight">
                  navigate_next
                </div>
                <div>
                  {expandedDiv === 1 && "Technical Skills"}
                  {expandedDiv === 2 && "Soft Skills"}
                  {expandedDiv === 3 && "Design Skills"}
                </div>
              </div>
              <div className="flex justify-between bg-win11-surface-hover/60 my-1.5 rounded-md items-center text-sm px-4 mr-3 w-[19.3em]">
                <div className="opacity-80">
                  Search {aboutMe === true ? "Home" : page}
                </div>
                <div className="material-symbols-outlined font-extralight text-sm">
                  search
                </div>
              </div>
            </div>
            <div className="bg-win11-surface w-full h-[3.4rem] border-win11-border border-b flex justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-24 h-full text-xs gap-1 border-win11-border border-r opacity-45">
                  <img
                    src="/images/options/new.png"
                    alt="new"
                    className="w-5 h-5"
                  />
                  New
                  <div className="material-symbols-outlined text-sm">
                    expand_more
                  </div>
                </div>
                <div className="flex h-full items-center gap-3 px-4 border-win11-border border-r opacity-45">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-win11-glass-hover transition-colors duration-200">
                    <img
                      src="/images/options/cut.png"
                      alt="cut"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-win11-glass-hover transition-colors duration-200">
                    <img
                      src="/images/options/copy.png"
                      alt="copy"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-win11-glass-hover transition-colors duration-200">
                    <img
                      src="/images/options/paste.png"
                      alt="paste"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-win11-glass-hover transition-colors duration-200">
                    <img
                      src="/images/options/rename.png"
                      alt="rename"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-win11-glass-hover transition-colors duration-200">
                    <img
                      src="/images/options/share.png"
                      alt="share"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-win11-glass-hover transition-colors duration-200">
                    <img
                      src="/images/options/delete.png"
                      alt="delete"
                      className="h-5 w-5"
                    />
                  </div>
                </div>
                <div className="flex h-full items-center w-72 justify-around border-win11-border border-r">
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-45">
                    <img
                      src="/images/options/sort.png"
                      alt="sort"
                      className="w-5 h-5"
                    />
                    Sort
                    <div className="material-symbols-outlined text-sm">
                      expand_more
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-80">
                    <img
                      src="/images/options/view.png"
                      alt="view"
                      className="w-5 h-5"
                    />
                    View
                    <div className="material-symbols-outlined text-sm">
                      expand_more
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-full text-xs gap-1 opacity-80">
                    <img
                      src="/images/options/filter.png"
                      alt="filter"
                      className="w-5 h-5"
                    />
                    Filter
                    <div className="material-symbols-outlined text-sm">
                      expand_more
                    </div>
                  </div>
                </div>
                <img
                  src="/images/options/dots.png"
                  alt="dots"
                  className="w-3.5 h-3.5 ml-4"
                />
              </div>
              <div className="flex items-center mr-8 text-xs">
                <img
                  src="/images/options/details.png"
                  alt="details"
                  className="w-5 h-5 mr-1"
                />
                Details
              </div>
            </div>
            {aboutMe === true ? (
              <>
                <div className="flex flex-row h-full bg-win11-surface">
                  <div className="w-40 h-[100vh] pt-2 border-win11-border border-r px-[2px]">
                    <div className="border-b border-win11-border h-20">
                      <div className="flex items-center justify-center mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/home.png"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Home
                      </div>
                      <div className="flex items-center justify-center mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/gallery.png"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Gallery
                      </div>
                    </div>
                    <div className="mt-3.5 border-b border-win11-border h-52">
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Desktop.ico"
                          alt="Desktop"
                          className="w-5 h-5 mr-1"
                        />
                        Desktop
                        <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Downloads.ico"
                          alt="Downloads"
                          className="w-5 h-5 mr-1"
                        />
                        Downloads
                        <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Documents.ico"
                          alt="Documents"
                          className="w-5 h-5 mr-1"
                        />
                        Documents
                        <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Photos.ico"
                          alt="Pictures"
                          className="w-5 h-5 mr-1"
                        />
                        Pictures
                        <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Music.ico"
                          alt="Music"
                          className="w-5 h-5 mr-1"
                        />
                        Music
                        <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Videos.ico"
                          alt="Videos"
                          className="w-5 h-5 mr-1"
                        />
                        Videos
                        <div className="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                    </div>
                    <div className="mt-3.5 border-b border-win11-border h-52">
                      <div className="flex items-center pl-12 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm relative">
                        <img
                          src="/images/folders/Computer.ico"
                          alt="This PC"
                          className="w-4 h-4 mr-1"
                        />
                        This PC
                        <div className="material-symbols-outlined absolute left-2 text-lg opacity-30">
                          chevron_right
                        </div>
                      </div>
                      <div className="flex items-center pl-12 mr-8 text-xs hover:bg-win11-glass-hover w-full h-8 rounded-sm relative">
                        <img
                          src="/images/folders/Network.ico"
                          alt="Network"
                          className="w-4 h-4 mr-1"
                        />
                        Network
                        <div className="material-symbols-outlined absolute left-2 text-lg opacity-30">
                          chevron_right
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-0 ml-5 mt-2">
                    <div className="flex items-center hover:bg-win11-glass-hover rounded-md">
                      <div className="material-symbols-outlined text-2xl font-extralight">
                        expand_more
                      </div>
                      <div className="text-xs ml-3 mr-4">Quick access</div>
                    </div>
                    <div className="h-32 w-[87vh] mr-32 grid grid-cols-3 grid-rows-2">
                      <div className="flex justify-center items-center h-16 w-full hover:bg-win11-glass-hover rounded-md">
                        <img
                          src="/images/folders/Desktop.ico"
                          alt="Desktop"
                          className="w-14 h-14 mr-4"
                        />
                        <div className="text-xs">
                          Desktop
                          <div>
                            <div className="font-light opacity-50">
                              Stored Locally
                            </div>
                            <div className="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-win11-glass-hover rounded-md">
                        <img
                          src="/images/folders/Downloads.ico"
                          alt="Downloads"
                          className="w-14 h-14 mr-4"
                        />
                        <div className="text-xs">
                          Downloads
                          <div>
                            <div className="font-light opacity-50">
                              Stored Locally
                            </div>
                            <div className="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-win11-glass-hover rounded-md">
                        <img
                          src="/images/folders/Documents.ico"
                          alt="Documents"
                          className="w-14 h-14 mr-4"
                        />
                        <div className="text-xs">
                          Documents
                          <div>
                            <div className="font-light opacity-50">
                              Stored Locally
                            </div>
                            <div className="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-win11-glass-hover rounded-md">
                        <img
                          src="/images/folders/Photos.ico"
                          alt="Pictures"
                          className="w-14 h-14 mr-4"
                        />
                        <div className="text-xs">
                          Pictures
                          <div>
                            <div className="font-light opacity-50">
                              Stored Locally
                            </div>
                            <div className="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-win11-glass-hover rounded-md">
                        <img
                          src="/images/folders/Music.ico"
                          alt="Music"
                          className="w-14 h-14 mr-4"
                        />
                        <div className="text-xs">
                          Music
                          <div>
                            <div className="font-light opacity-50">
                              Stored Locally
                            </div>
                            <div className="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-win11-glass-hover rounded-md">
                        <img
                          src="/images/folders/Videos.ico"
                          alt="Videos"
                          className="w-14 h-14 mr-4"
                        />
                        <div className="text-xs">
                          Videos
                          <div>
                            <div className="font-light opacity-50">
                              Stored Locally
                            </div>
                            <div className="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs ml-3 mr-4">Favourites</div>
                    <div className="text-xs m-2 ml-9 opacity-50 font-light">
                      After you've favourited some files, we'll show theme here.
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 h-5 bg-win11-surface w-full text-xs py-1 pl-2">
                  <div className="flex items-center justify-center w-16 border-r-[1.5px] h-full text-xs font-extralight">
                    6 items
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-row h-full bg-win11-surface">
                <div className="w-40 h-[100vh] pt-2 border-win11-border border-r px-[2px]">
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "About Me"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("About Me");
                    }}
                  >
                    <img
                      src="/images/folders/me.png"
                      alt="me"
                      className="w-5 h-5 mr-2.5"
                    />
                    About Me
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Education"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Education");
                    }}
                  >
                    <img
                      src="/images/folders/edu.png"
                      alt="edu"
                      className="w-5 h-5 mr-2.5"
                    />
                    Education
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Skills"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Skills");
                    }}
                  >
                    <img
                      src="/images/folders/skills.png"
                      alt="skills"
                      className="w-5 h-5 mr-2.5"
                    />
                    Skills
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Projects"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Projects");
                    }}
                  >
                    <img
                      src="/images/folders/projects.png"
                      alt="Projects"
                      className="w-5 h-5 mr-2.5"
                    />
                    Projects
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Resume"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Resume");
                    }}
                  >
                    <img
                      src="/images/folders/resume.png"
                      alt="Resume"
                      className="w-5 h-5 mr-2.5"
                    />
                    Resume
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "CV"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("CV");
                    }}
                  >
                    <img
                      src="/images/folders/resume.png"
                      alt="CV"
                      className="w-5 h-5 mr-2.5"
                    />
                    CV
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Research Experience"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Research Experience");
                    }}
                  >
                    <img
                      src="/images/folders/edu.png"
                      alt="Research"
                      className="w-5 h-5 mr-2.5"
                    />
                    Research Experience
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Work Experience"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Work Experience");
                    }}
                  >
                    <img
                      src="/images/folders/projects.png"
                      alt="Work"
                      className="w-5 h-5 mr-2.5"
                    />
                    Work Experience
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Position of Responsibility"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Position of Responsibility");
                    }}
                  >
                    <img
                      src="/images/folders/management.png"
                      alt="Leadership"
                      className="w-5 h-5 mr-2.5"
                    />
                    Position of Responsibility
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Conferences"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Conferences");
                    }}
                  >
                    <img
                      src="/images/folders/edu.png"
                      alt="Conferences"
                      className="w-5 h-5 mr-2.5"
                    />
                    Conferences
                  </div>
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "Awards and Achievements"
                        ? "bg-win11-accent/20 text-win11-accent-text"
                        : "hover:bg-win11-glass-hover text-win11-text"
                    }`}
                    onClick={() => {
                      setPage("Awards and Achievements");
                    }}
                  >
                    <img
                      src="/images/folders/skills.png"
                      alt="Awards"
                      className="w-5 h-5 mr-2.5"
                    />
                    Awards and Achievements
                  </div>
                </div>
                <AboutMe
                  page={page}
                  expandedDiv={expandedDiv}
                  handleDivClick={handleDivClick}
                />
              </div>
            )}
          </div>
        </motion.div>
      </Draggable>
    </div>
  );
};

export default Explorer;

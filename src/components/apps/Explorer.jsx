import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import AboutMe from "../apps/AboutMe";
import soundManager from '../../utils/soundManager';

const Explorer = ({ isExplorerOpen, toggleExplorer, aboutMe, bounds, minimizeWindow, isMinimized }) => {
  const [page, setPage] = useState("About Me");
  const [icon, setIcon] = useState(null);
  const explorerRef = useRef(null);
  const [expandedDiv, setExpandedDiv] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [easterEgg, setEasterEgg] = useState({ count: 0, activated: false });

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

  // Responsive detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive dimensions for Explorer
  const getResponsiveDimensions = () => {
    if (isMobile) {
      return { 
        width: 'w-screen', 
        height: 'h-[calc(100vh-3rem)]', 
        position: 'fixed top-0 left-0',
        borderRadius: 'rounded-none'
      };
    }
    if (isTablet) {
      return { 
        width: 'w-[95vw]', 
        height: 'h-[85vh]', 
        position: '',
        borderRadius: 'rounded-lg'
      };
    }
    return { 
      width: 'w-[70.5rem] max-w-[95vw]', 
      height: 'h-[39rem] max-h-[90vh]', 
      position: '',
      borderRadius: 'rounded-xl'
    };
  };

  const dimensions = getResponsiveDimensions();

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
          className={`window bg-black overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto ${
            isMobile ? 'resize-none' : 'resize'
          } ${
            isFullscreen 
              ? 'rounded-none fixed top-0 left-0 z-50' 
              : `${dimensions.borderRadius} ${dimensions.position}`
          }`}
          layout
          animate={{
            width: isFullscreen ? '100vw' : dimensions.width.replace('w-', '').replace('[', '').replace(']', '') === 'auto' ? 'auto' : 
              dimensions.width.includes('w-1/2') ? '50vw' : 
              dimensions.width.includes('w-3/4') ? '75vw' : 
              dimensions.width.includes('w-full') ? '100vw' : '700px',
            height: isFullscreen ? '100vh' : dimensions.height.replace('h-', '').replace('[', '').replace(']', '') === 'auto' ? 'auto' :
              dimensions.height.includes('h-1/2') ? '50vh' :
              dimensions.height.includes('h-3/4') ? '75vh' :
              dimensions.height.includes('h-full') ? '100vh' : '500px',
            x: isFullscreen ? 0 : undefined,
            y: isFullscreen ? 0 : undefined,
            borderRadius: isFullscreen ? 0 : 8
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1], // Windows 11 signature easing
            layout: {
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          <div className="title-bar">
            <div className="text-white h-9 w-full flex justify-end select-none">
              <div 
                className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                onClick={() => {
                  soundManager.play('minimize');
                  minimizeWindow('explorer');
                }}
                title="Minimize"
              >
                minimize
              </div>
              <motion.div 
                className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm cursor-pointer transition-all duration-200"
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
                className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl"
                onClick={toggleExplorer}
              >
                close
              </div>
            </div>
          </div>
          <div className="content text-white select-none">
            <div className="absolute bg-neutral-800 top-[6.5px] h-[2em] left-[6px] w-60 rounded-t-lg flex">
              <div className="flex justify-between items-center w-full">
                <div className="pl-2 text-xs flex">
                  <img
                    src={`/images/folders/${icon}.png`}
                    alt="main icons"
                    className="w-5 h-5 mr-2"
                  />
                  {aboutMe === true ? "Home" : page}
                </div>
                <div className="material-symbols-outlined hover:bg-neutral-800 m-0.5 w-6 rounded-md flex justify-center items-center text-lg">
                  close
                </div>
              </div>
              <div className="material-symbols-outlined absolute left-60 ml-0.5 h-7 w-8 flex justify-center hover:bg-neutral-800 rounded-md items-center text-xl">
                add
              </div>
            </div>
            <div className="bg-neutral-800 w-full h-12 border-neutral-700 border-b-[1.5px] mt-1 flex">
              <div className="flex items-center gap-1 px-3 py-1">
                <button
                  className={`material-symbols-outlined font-extralight text-xl rounded-md p-1.5 flex items-center justify-center w-8 h-8 transition-colors duration-200 ${
                    handleDivClick === !0 ? "opacity-45" : "font-bold hover:bg-neutral-600 hover:bg-opacity-50"
                  }`}
                  onClick={() => handleDivClick(0)}
                >
                  arrow_back
                </button>
                <div className="material-symbols-outlined font-extralight text-xl opacity-45 rounded-md p-1.5 flex items-center justify-center w-8 h-8">
                  arrow_forward
                </div>
                <div className="material-symbols-outlined font-extralight text-xl rounded-md p-1.5 flex items-center justify-center w-8 h-8 transition-colors duration-200 hover:bg-neutral-600 hover:bg-opacity-50">
                  arrow_upward
                </div>
                <div className="material-symbols-outlined font-extralight text-xl rounded-md p-1.5 flex items-center justify-center w-8 h-8 transition-colors duration-200 hover:bg-neutral-600 hover:bg-opacity-50">
                  refresh
                </div>
              </div>
              <div className="flex bg-neutral-700 bg-opacity-50 my-1.5 rounded-md items-center text-sm px-2 mx-2 flex-grow gap-2 font-extralight">
                <div class="material-symbols-outlined font-extralight">
                  home
                </div>
                <div class="material-symbols-outlined font-extralight">
                  navigate_next
                </div>
                <div> {aboutMe === true ? "Home" : page}</div>
                <div class="material-symbols-outlined font-extralight">
                  navigate_next
                </div>
                <div>
                  {expandedDiv === 1 && "Technical Skills"}
                  {expandedDiv === 2 && "Soft Skills"}
                  {expandedDiv === 3 && "Design Skills"}
                </div>
              </div>
              <div className="flex justify-between bg-neutral-700 bg-opacity-50 my-1.5 rounded-md items-center text-sm px-4 mr-3 w-[19.3em]">
                <div className="opacity-80">
                  Search {aboutMe === true ? "Home" : page}
                </div>
                <div class="material-symbols-outlined font-extralight text-sm">
                  search
                </div>
              </div>
            </div>
            <div className="bg-neutral-900 w-full h-[3.4rem] border-neutral-700 border-b-[1.5px] flex justify-between">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-24 h-full text-xs gap-1 border-neutral-700 border-r-[1.5px] opacity-45">
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
                <div className="flex h-full items-center gap-3 px-4 border-neutral-700 border-r-[1.5px] opacity-45">
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-600 hover:bg-opacity-30 transition-colors duration-200">
                    <img
                      src="/images/options/cut.png"
                      alt="cut"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-600 hover:bg-opacity-30 transition-colors duration-200">
                    <img
                      src="/images/options/copy.png"
                      alt="copy"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-600 hover:bg-opacity-30 transition-colors duration-200">
                    <img
                      src="/images/options/paste.png"
                      alt="paste"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-600 hover:bg-opacity-30 transition-colors duration-200">
                    <img
                      src="/images/options/rename.png"
                      alt="rename"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-600 hover:bg-opacity-30 transition-colors duration-200">
                    <img
                      src="/images/options/share.png"
                      alt="share"
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-neutral-600 hover:bg-opacity-30 transition-colors duration-200">
                    <img
                      src="/images/options/delete.png"
                      alt="delete"
                      className="h-5 w-5"
                    />
                  </div>
                </div>
                <div className="flex h-full items-center w-72 justify-around border-neutral-700 border-r-[1.5px]">
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
                <div className="flex flex-row h-full bg-neutral-900">
                  <div className="w-40 h-[100vh] pt-2 border-neutral-700 border-r-[1.5px] px-[2px]">
                    <div className="border-b-[1.5px] border-neutral-700 h-20">
                      <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/home.png"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Home
                      </div>
                      <div className="flex items-center justify-center mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/gallery.png"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Gallery
                      </div>
                    </div>
                    <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Desktop.ico"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Desktop
                        <div class="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Downloads.ico"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Downloads
                        <div class="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Documents.ico"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        <div class="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                        Documents
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Photos.ico"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Pictures
                        <div class="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Music.ico"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Music
                        <div class="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                      <div className="flex relative items-center pl-6 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm">
                        <img
                          src="/images/folders/Videos.ico"
                          alt="details"
                          className="w-5 h-5 mr-1"
                        />
                        Videos
                        <div class="material-symbols-outlined absolute right-1 text-sm opacity-40 rotate-45">
                          keep
                        </div>
                      </div>
                    </div>
                    <div className="mt-3.5 border-b-[1.5px] border-neutral-700 h-52">
                      <div className="flex items-center pl-12 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm relative">
                        <img
                          src="/images/folders/Computer.ico"
                          alt="details"
                          className="w-4 h-4 mr-1"
                        />
                        This PC
                        <div class="material-symbols-outlined absolute left-2 text-lg opacity-30">
                          chevron_right
                        </div>
                      </div>
                      <div className="flex items-center pl-12 mr-8 text-xs hover:bg-neutral-700 w-full h-8 rounded-sm relative">
                        <img
                          src="/images/folders/Network.ico"
                          alt="details"
                          className="w-4 h-4 mr-1"
                        />
                        Network
                        <div class="material-symbols-outlined absolute left-2 text-lg opacity-30">
                          chevron_right
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-0 ml-5 mt-2">
                    <div className="flex items-center hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
                      <div className="material-symbols-outlined text-2xl font-extralight">
                        expand_more
                      </div>
                      <div className="text-xs ml-3 mr-4">Quick access</div>
                    </div>
                    <div className="h-32 w-[87vh] mr-32 grid grid-cols-3 grid-rows-2">
                      <div className="flex justify-center items-center h-16 w-full hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
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
                            <div class="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
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
                            <div class="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
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
                            <div class="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
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
                            <div class="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
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
                            <div class="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center h-16 w-full hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
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
                            <div class="material-symbols-outlined text-sm opacity-40 rotate-45">
                              keep
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center hover:bg-neutral-700 rounded-md hover:bg-opacity-30">
                      <div className="material-symbols-outlined text-2xl font-extralight">
                        expand_more
                      </div>
                      <div className="text-xs ml-3 mr-4">Favourites</div>
                    </div>
                    <div className="text-xs m-2 ml-9 opacity-50 font-light">
                      After you've favourited some files, we'll show theme here.
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 h-5 bg-neutral-900 w-full text-xs py-1 pl-2">
                  <div className="flex items-center justify-center w-16 border-r-[1.5px] h-full text-xs font-extralight">
                    6 items
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-row h-full bg-neutral-900">
                <div className="w-40 h-[100vh] pt-2 border-neutral-700 border-r-[1.5px] px-[2px]">
                  <div
                    className={`flex items-center pl-2.5 mr-8 text-xs w-full h-8 rounded-sm ${
                      page === "About Me"
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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
                        ? "bg-gray-200 bg-opacity-80 text-neutral-900"
                        : "hover:bg-neutral-700 text-white"
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

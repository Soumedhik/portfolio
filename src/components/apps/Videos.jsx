import React, { useState, useRef, memo, useMemo } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { useWindowSizing } from "../../hooks/useWindowSizing";

const Videos = memo(({ isAppOpen, toggleVideos, bounds, minimizeWindow, isMinimized }) => {
  const videosRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { width: windowWidth, height: windowHeight, isMobile } = useWindowSizing(1280, 720, {
    minWidth: 360,
    minHeight: 420,
    desktopMargin: 160,
    tabletMargin: 112,
    mobileMargin: 40
  });

  const isFullViewport = isFullscreen || isMobile;

  // Memoized list of videos for performance
  // Extract YouTube video IDs from URLs
  const videos = useMemo(() => [
    {
      id: "Ol_nqe6hzeM",
      title: "Video 1",
      thumbnail: `https://img.youtube.com/vi/Ol_nqe6hzeM/maxresdefault.jpg`
    },
    {
      id: "xTBdBR8DfpY",
      title: "Video 2",
      thumbnail: `https://img.youtube.com/vi/xTBdBR8DfpY/maxresdefault.jpg`
    },
    {
      id: "N_22iya4jf8",
      title: "Video 3",
      thumbnail: `https://img.youtube.com/vi/N_22iya4jf8/maxresdefault.jpg`
    },
    {
      id: "QP2e54EYIwE",
      title: "Video 4",
      thumbnail: `https://img.youtube.com/vi/QP2e54EYIwE/maxresdefault.jpg`
    },
    {
      id: "8raUyT1S3_Y",
      title: "Video 5",
      thumbnail: `https://img.youtube.com/vi/8raUyT1S3_Y/maxresdefault.jpg`
    },
    {
      id: "YN1WX3UTZOg",
      title: "Video 6",
      thumbnail: `https://img.youtube.com/vi/YN1WX3UTZOg/maxresdefault.jpg`
    }
  ], []);

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div
      className={`${
        isAppOpen && !isMinimized ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable
        handle=".title-bar"
        nodeRef={videosRef}
        bounds={isFullViewport ? false : bounds}
        disabled={isFullViewport}
      >
        <motion.div
          ref={videosRef}
          className={`window bg-neutral-900 bg-opacity-95 overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto ${
            isFullViewport
              ? "rounded-none fixed inset-0 z-50 max-h-[100dvh]"
              : "rounded-xl resize"
          }`}
          layout
          animate={{
            width: isFullViewport ? "100vw" : `${windowWidth}px`,
            height: isFullViewport ? "100vh" : `${windowHeight}px`,
            maxWidth: isFullViewport ? "100vw" : "95vw",
            maxHeight: isFullViewport ? "100vh" : "90vh",
            x: isFullViewport ? 0 : undefined,
            y: isFullViewport ? 0 : undefined,
            borderRadius: isFullViewport ? 0 : 12
          }}
          style={isFullViewport ? { width: "100vw", height: "100dvh", maxHeight: "100dvh" } : undefined}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            layout: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="title-bar glass-titlebar">
            <div className="h-9 flex items-center justify-between px-3 select-none">
              <div className="flex items-center gap-2 font-normal titlebar-section">
                <img src="/assets/icons/apps/videos.png" alt="Videos" className="w-4 h-4" />
                <span>Videos</span>
              </div>
              <div className="flex items-center titlebar-section">
                <button
                  type="button"
                  className="titlebar-button"
                  onClick={() => minimizeWindow('videos')}
                  title="Minimize"
                  aria-label="Minimize videos window"
                >
                  <span className="material-symbols-outlined">minimize</span>
                </button>
                <motion.button
                  type="button"
                  className="titlebar-button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Restore Down' : 'Maximize'}
                  aria-label={isFullscreen ? 'Restore videos window' : 'Maximize videos window'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                </motion.button>
                <button
                  type="button"
                  className="titlebar-button titlebar-button--close"
                  onClick={toggleVideos}
                  title="Close"
                  aria-label="Close videos window"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          </div>

          <div className="h-full pb-9 overflow-hidden bg-neutral-800">
            {/* Videos Grid */}
            <div className="h-full p-4 overflow-y-auto">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {videos.map((video, index) => (
                  <div
                    key={index}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden bg-neutral-700 border border-neutral-600"
                    onClick={() => openVideo(video)}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-20 transition-all">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-white text-4xl">play_arrow</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 text-white text-sm">
                      <p className="font-medium">{video.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Draggable>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center pointer-events-auto">
          <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            {/* Left Navigation */}
            {videos.length > 1 && (
              <button
                onClick={() => {
                  const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
                  setSelectedVideo(videos[prevIndex]);
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all text-2xl"
              >
                ‹
              </button>
            )}
            
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            {/* YouTube Video Player */}
            <div className="w-full max-w-6xl aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            
            {/* Right Navigation */}
            {videos.length > 1 && (
              <button
                onClick={() => {
                  const currentIndex = videos.findIndex(v => v.id === selectedVideo.id);
                  const nextIndex = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
                  setSelectedVideo(videos[nextIndex]);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all text-2xl"
              >
                ›
              </button>
            )}
            
            {/* Video Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-sm flex gap-4">
              <span>{selectedVideo.title}</span>
              {videos.length > 1 && (
                <span>{videos.findIndex(v => v.id === selectedVideo.id) + 1} / {videos.length}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Videos;

import React, { useState, useRef, memo, useMemo } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { useWindowSizing } from "../../hooks/useWindowSizing";

const Pictures = memo(({ isAppOpen, togglePictures, bounds, minimizeWindow, isMinimized }) => {
  const picturesRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { width: windowWidth, height: windowHeight, isMobile } = useWindowSizing(1280, 720, {
    minWidth: 360,
    minHeight: 420,
    desktopMargin: 160,
    tabletMargin: 112,
    mobileMargin: 40
  });
  const isFullViewport = isFullscreen || isMobile;

  // Memoized list of pictures for performance
  const pictures = useMemo(() => [
    "1.jpg", "2.jpg", "3.jpg", "4.jpg", "6.jpg", "23.jpg",
    "5282793844502556354.jpg", "DSC01991.JPG", "DSC02987.JPG", 
    "DSC06707.JPG", "DSC06743.JPG", "DSC08981.JPG", "haong ya dong.jpg",
    "International-team1.JPG", "team photo 3.JPG", "Untitled.jpg",
    "Untitled1.jpg", "Untitled2.jpg", "Untitled3.jpg", "Untitled4.jpg",
    "Untitled5.jpg", "Untitled6.jpg", "合影2.jpg", "合照Team Photo.jpg",
    "微信图片_20241106104127.jpg",
    "WhatsApp Image 2025-06-19 at 4.16.59 PM.jpeg",
    "WhatsApp Image 2025-06-19 at 4.17.01 PM.jpeg", 
    "WhatsApp Image 2025-06-19 at 4.17.02 PM.jpeg"
  ], []);

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div
      className={`${
        isAppOpen && !isMinimized ? "" : "hidden"
      } z-30 w-full h-screen pointer-events-none absolute`}
    >
      <Draggable
        handle=".title-bar"
        nodeRef={picturesRef}
        bounds={isFullViewport ? false : bounds}
        disabled={isFullViewport}
      >
        <motion.div
          ref={picturesRef}
          className={`window bg-neutral-900 bg-opacity-95 overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto resize ${
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
              <div className="flex items-center gap-2 font-normal titlebar-section">
                <img src="/assets/branding/pic_logo.png" alt="Pictures" className="w-4 h-4" />
                <span>Pictures</span>
              </div>
              <div className="flex items-center titlebar-section">
                <button
                  type="button"
                  className="titlebar-button"
                  onClick={() => minimizeWindow('pictures')}
                  title="Minimize"
                  aria-label="Minimize pictures window"
                >
                  <span className="material-symbols-outlined">minimize</span>
                </button>
                <motion.button
                  type="button"
                  className="titlebar-button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Restore Down' : 'Maximize'}
                  aria-label={isFullscreen ? 'Restore pictures window' : 'Maximize pictures window'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                >
                  <span className="material-symbols-outlined">{isFullscreen ? 'fullscreen_exit' : 'fullscreen'}</span>
                </motion.button>
                <button
                  type="button"
                  className="titlebar-button titlebar-button--close"
                  onClick={togglePictures}
                  title="Close"
                  aria-label="Close pictures window"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>
          </div>

          <div className="h-full pb-9 overflow-hidden bg-neutral-800">
            {/* Pictures Grid */}
            <div className="h-full p-4 overflow-y-auto">
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                {pictures.map((picture, index) => (
                  <div
                    key={index}
                    className="aspect-square cursor-pointer hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden bg-neutral-700 border border-neutral-600"
                    onClick={() => openImage(picture)}
                  >
                    <img
                      src={`/assets/gallery/${picture}`}
                      alt={`Gallery item ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Draggable>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center pointer-events-auto">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Left Navigation */}
            <button
              onClick={() => {
                const currentIndex = pictures.indexOf(selectedImage);
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : pictures.length - 1;
                setSelectedImage(pictures[prevIndex]);
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all text-2xl"
            >
              ‹
            </button>
            
            {/* Close Button */}
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            {/* Main Image */}
            <img
              src={`/assets/gallery/${selectedImage}`}
              alt={`Preview of ${selectedImage}`}
              className="max-w-[85vw] max-h-[85vh] object-contain rounded-lg"
            />
            
            {/* Right Navigation */}
            <button
              onClick={() => {
                const currentIndex = pictures.indexOf(selectedImage);
                const nextIndex = currentIndex < pictures.length - 1 ? currentIndex + 1 : 0;
                setSelectedImage(pictures[nextIndex]);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-75 transition-all text-2xl"
            >
              ›
            </button>
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded text-sm flex gap-4">
              <span>{selectedImage}</span>
              <span>{pictures.indexOf(selectedImage) + 1} / {pictures.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Pictures;
import React, { useState, useRef, memo, useMemo } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

const Pictures = memo(({ isAppOpen, togglePictures, bounds, minimizeWindow, isMinimized }) => {
  const picturesRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      <Draggable handle=".title-bar" nodeRef={picturesRef} bounds={bounds} disabled={isFullscreen}>
        <motion.div
          ref={picturesRef}
          className="window bg-neutral-900 bg-opacity-95 overflow-hidden border-neutral-700 border-[1.5px] pointer-events-auto resize rounded-xl"
          layout
          animate={{
            width: isFullscreen ? '100vw' : '80rem',
            height: isFullscreen ? '100vh' : '45rem',
            maxWidth: isFullscreen ? '100vw' : '95vw',
            maxHeight: isFullscreen ? '100vh' : '90vh',
            x: isFullscreen ? 0 : undefined,
            y: isFullscreen ? 0 : undefined,
            borderRadius: isFullscreen ? 0 : 12
          }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            layout: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="title-bar">
            <div className="text-white h-9 flex justify-between select-none">
              <div className="m-1 ml-4 font-normal flex items-center gap-2">
                <img src="/pic_logo.png" alt="Pictures" className="w-4 h-4" />
                <span>Pictures</span>
              </div>
              <div className="flex">
                <div
                  className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                  onClick={() => minimizeWindow('pictures')}
                  title="Minimize"
                >
                  minimize
                </div>
                <motion.div 
                  className="material-symbols-outlined hover:bg-neutral-800 mb-2 w-11 flex justify-center items-center text-sm cursor-pointer transition-all duration-200"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? 'Restore Down' : 'Maximize'}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: [0.76, 0, 0.24, 1] }}
                >
                  {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                </motion.div>
                <div
                  className="material-symbols-outlined hover:bg-red-700 mb-2 w-12 flex justify-center items-center text-xl cursor-pointer transition-colors duration-200"
                  onClick={togglePictures}
                  title="Close"
                >
                  close
                </div>
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
                      src={`/pictures/${picture}`}
                      alt={`Picture ${index + 1}`}
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
              src={`/pictures/${selectedImage}`}
              alt="Selected"
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
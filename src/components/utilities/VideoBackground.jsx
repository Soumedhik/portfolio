import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const VideoBackground = ({ 
  src = "/desktop_background.mp4",
  fallbackImage = "/wallpaper.jpg",
  className = "",
  style = {}
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Video event handlers
    const handleLoadedData = () => {
      setIsLoaded(true);
      console.log('🎬 Desktop background video loaded successfully');
    };

    const handleError = (e) => {
      console.warn('⚠️ Video background failed to load:', e);
      setHasError(true);
    };

    const handleCanPlay = () => {
      video.play().then(() => {
        setIsPlaying(true);
        console.log('🎬 Desktop background video playing');
      }).catch(e => {
        console.warn('⚠️ Video autoplay prevented:', e);
        setHasError(true);
      });
    };

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Retry video loading on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      const video = videoRef.current;
      if (video && hasError && !isPlaying) {
        video.load();
        video.play().then(() => {
          setIsPlaying(true);
          setHasError(false);
          console.log('🎬 Video background resumed after user interaction');
        }).catch(e => {
          console.warn('⚠️ Video still cannot play:', e);
        });
      }
    };

    // Try to resume video on any user interaction
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [hasError, isPlaying]);

  return (
    <div 
      className={`fixed inset-0 w-full h-full overflow-hidden ${className}`}
      style={{ 
        zIndex: -1,
        ...style 
      }}
    >
      {/* Video Background */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{
          filter: 'brightness(0.8) contrast(1.1)',
          opacity: isLoaded && isPlaying && !hasError ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && isPlaying && !hasError ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Fallback Image Background */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${fallbackImage}")`,
          opacity: !isLoaded || hasError || !isPlaying ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: !isLoaded || hasError || !isPlaying ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Loading Overlay */}
      {!isLoaded && !hasError && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-white text-sm opacity-50">
            Loading desktop background...
          </div>
        </motion.div>
      )}

      {/* Optional: Video Controls for debugging (hidden by default) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              const video = videoRef.current;
              if (video) {
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            }}
            className="bg-black/50 text-white px-2 py-1 rounded text-xs"
          >
            {isPlaying ? '⏸️' : '▶️'} Video BG
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoBackground;
import React, { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';

const VideoBackground = memo(({ 
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

    // Load video in background, don't block wallpaper display
    video.muted = true; // Ensure autoplay works
    video.preload = 'auto'; // Load entire video
    
    // Set video source with cache busting if needed
    if (src) {
      video.src = src;
      video.load();
    }

    // Video event handlers
    const handleLoadedData = () => {
      setIsLoaded(true);
      if (process.env.NODE_ENV === 'development') {
        console.log('🎬 Desktop background video loaded successfully');
      }
    };

    const handleError = (e) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Video background failed to load:', e);
      }
      setHasError(true);
    };

    const handleCanPlay = () => {
      // Aggressive video playing
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
          if (process.env.NODE_ENV === 'development') {
            console.log('🎬 Desktop background video playing immediately');
          }
        }).catch(e => {
          if (process.env.NODE_ENV === 'development') {
            console.warn('⚠️ Video autoplay prevented, trying muted:', e);
          }
          // Try muted autoplay as fallback
          video.muted = true;
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(err => {
            if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Video completely failed:', err);
            }
            setHasError(true);
          });
        });
      }
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
  }, [src]);

  // Retry video loading on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      const video = videoRef.current;
      if (video && hasError && !isPlaying) {
        video.load();
        video.play().then(() => {
          setIsPlaying(true);
          setHasError(false);
        }).catch(() => {
          // Video still cannot play, keep fallback
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
      {/* Video Background - Optimized for Immediate Loading */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted={true}
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{
          filter: 'brightness(0.8) contrast(1.1)',
          opacity: isLoaded && isPlaying && !hasError ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          willChange: 'opacity, transform',
          transform: 'translate3d(0, 0, 0)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded && isPlaying && !hasError ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Fallback Image Background - Always show immediately, fade out when video ready */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("${fallbackImage}")`,
          opacity: !isLoaded || hasError || !isPlaying ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
          willChange: 'opacity'
        }}
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
});

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground;
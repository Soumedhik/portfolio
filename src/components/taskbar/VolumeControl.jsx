import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Win11VolumeSlider from '../utilities/Win11VolumeSlider';
import soundManager from '../../utils/soundManager';

const VolumeControl = ({ className = "" }) => {
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const buttonRef = useRef(null);

  // Load volume state from localStorage
  useEffect(() => {
    const savedVolume = localStorage.getItem('masterVolume');
    const savedMuted = localStorage.getItem('volumeMuted') === 'true';
    
    if (savedVolume) setCurrentVolume(parseInt(savedVolume));
    setIsMuted(savedMuted);
  }, []);

  // Listen for volume changes from the slider
  useEffect(() => {
    const handleStorageChange = () => {
      const volume = localStorage.getItem('masterVolume');
      const muted = localStorage.getItem('volumeMuted') === 'true';
      
      if (volume) setCurrentVolume(parseInt(volume));
      setIsMuted(muted);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for direct changes (same tab)
    const interval = setInterval(handleStorageChange, 100);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getVolumeIcon = () => {
    if (isMuted || currentVolume === 0) return 'volume_off';
    if (currentVolume < 30) return 'volume_down';
    return 'volume_up';
  };

  const getSliderPosition = () => {
    if (!buttonRef.current) return { x: 0, y: 0 };
    
    const rect = buttonRef.current.getBoundingClientRect();
    const sliderWidth = 320;
    const sliderHeight = 420;
    
    // Calculate optimal position to keep mixer on screen
    let x = rect.left - (sliderWidth / 2) + (rect.width / 2);
    let y = rect.top - sliderHeight - 10;
    
    // Ensure mixer doesn't go off screen horizontally
    const screenWidth = window.innerWidth;
    if (x + sliderWidth > screenWidth - 20) {
      x = screenWidth - sliderWidth - 20;
    }
    if (x < 20) {
      x = 20;
    }
    
    // Ensure mixer doesn't go off screen vertically
    if (y < 20) {
      y = rect.bottom + 10; // Position below if not enough space above
    }
    
    return { x, y };
  };

  const handleVolumeClick = (e) => {
    e.stopPropagation();
    soundManager.play('button-click');
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleQuickMute = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('volumeMuted', newMuted.toString());
    
    if (newMuted) {
      localStorage.setItem('previousVolume', currentVolume.toString());
      setCurrentVolume(0);
      localStorage.setItem('masterVolume', '0');
    } else {
      const previousVolume = localStorage.getItem('previousVolume') || '60';
      setCurrentVolume(parseInt(previousVolume));
      localStorage.setItem('masterVolume', previousVolume);
    }
    
    soundManager.play('button-click');
  };

  return (
    <>
      <motion.div
        ref={buttonRef}
        className={`relative flex items-center justify-center w-10 h-8 rounded-md cursor-pointer select-none group ${className}`}
        onClick={handleVolumeClick}
        onContextMenu={handleQuickMute}
        whileHover={{ 
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          scale: 1.05
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
        title={`Volume: ${currentVolume}% (Right-click to ${isMuted ? 'unmute' : 'mute'})`}
      >
        {/* Volume Icon */}
        <span 
          className={`material-symbols-outlined text-lg transition-colors duration-200 ${
            isMuted || currentVolume === 0 
              ? 'text-red-400' 
              : 'text-white group-hover:text-blue-300'
          }`}
        >
          {getVolumeIcon()}
        </span>

        {/* Volume Level Indicator */}
        {!isMuted && currentVolume > 0 && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-0.5 bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${currentVolume}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        )}

        {/* Muted Indicator */}
        {isMuted && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-gray-800" />
        )}

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-md opacity-0 group-hover:opacity-100 pointer-events-none"
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Volume Slider Panel */}
      <Win11VolumeSlider
        isOpen={showVolumeSlider}
        onClose={() => setShowVolumeSlider(false)}
        position={getSliderPosition()}
      />
    </>
  );
};

export default VolumeControl;
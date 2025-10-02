import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import soundManager from '../../utils/soundManager';

const Win11VolumeSlider = ({ 
  isOpen, 
  onClose, 
  position = { x: 0, y: 0 },
  className = ""
}) => {
  const [ambientVolume, setAmbientVolume] = useState(50);
  const [spotifyVolume, setSpotifyVolume] = useState(70);
  const [masterVolume, setMasterVolume] = useState(60);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(60);
  const panelRef = useRef(null);

  // Load saved volumes from localStorage on mount
  useEffect(() => {
    const savedAmbient = localStorage.getItem('ambientVolume');
    const savedSpotify = localStorage.getItem('spotifyVolume');
    const savedMaster = localStorage.getItem('masterVolume');
    const savedMuted = localStorage.getItem('volumeMuted') === 'true';

    if (savedAmbient) setAmbientVolume(parseInt(savedAmbient));
    if (savedSpotify) setSpotifyVolume(parseInt(savedSpotify));
    if (savedMaster) setMasterVolume(parseInt(savedMaster));
    setIsMuted(savedMuted);
  }, []);

  // Save volumes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ambientVolume', ambientVolume.toString());
    localStorage.setItem('spotifyVolume', spotifyVolume.toString());
    localStorage.setItem('masterVolume', masterVolume.toString());
    localStorage.setItem('volumeMuted', isMuted.toString());
  }, [ambientVolume, spotifyVolume, masterVolume, isMuted]);

  // Apply volume changes to sound manager
  useEffect(() => {
    const effectiveVolume = isMuted ? 0 : masterVolume / 100;
    soundManager.setMasterVolume(effectiveVolume);
    
    // Update individual track volumes
    const ambientEffectiveVolume = ambientVolume / 100;
    const spotifyEffectiveVolume = spotifyVolume / 100;
    
    soundManager.setCategoryVolume('ambient', ambientEffectiveVolume);
    soundManager.setCategoryVolume('spotify', spotifyEffectiveVolume);
    // Add Spotify volume control when implemented
  }, [ambientVolume, spotifyVolume, masterVolume, isMuted]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleMasterVolumeChange = (value) => {
    const newVolume = parseInt(value);
    setMasterVolume(newVolume);
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setMasterVolume(previousVolume);
    } else {
      setPreviousVolume(masterVolume);
      setIsMuted(true);
      setMasterVolume(0);
    }
    soundManager.play('button-click');
  };

  const getVolumeIcon = () => {
    if (isMuted || masterVolume === 0) return 'volume_off';
    if (masterVolume < 30) return 'volume_down';
    return 'volume_up';
  };

  const VolumeControl = ({ 
    label, 
    value, 
    onChange, 
    icon, 
    color = "blue" 
  }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined text-lg text-${color}-400`}>
            {icon}
          </span>
          <span className="text-sm text-white font-medium">{label}</span>
        </div>
        <span className="text-xs text-gray-300">{value}%</span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-1 rounded-lg appearance-none cursor-pointer win11-slider"
          style={{
            background: `linear-gradient(to right, ${color === 'blue' ? '#0078d4' : color === 'purple' ? '#8b5cf6' : '#10b981'} 0%, ${color === 'blue' ? '#0078d4' : color === 'purple' ? '#8b5cf6' : '#10b981'} ${value}%, rgba(255, 255, 255, 0.2) ${value}%, rgba(255, 255, 255, 0.2) 100%)`,
            outline: 'none'
          }}
        />
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Volume Panel */}
          <motion.div
            ref={panelRef}
            className={`fixed z-50 ${className}`}
            style={{
              left: position.x,
              top: position.y,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 20,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 20,
              filter: "blur(5px)"
            }}
            transition={{
              duration: 0.2,
              ease: [0.76, 0, 0.24, 1]
            }}
          >
            <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-6 w-80" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.button
                    className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onClick={toggleMute}
                    whileHover={{ 
                      scale: 1.05,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="material-symbols-outlined text-xl text-white">
                      {getVolumeIcon()}
                    </span>
                  </motion.button>
                  <div>
                    <h3 className="text-white font-semibold">Volume Mixer</h3>
                    <p className="text-xs text-gray-400">System Audio Controls</p>
                  </div>
                </div>
                
                <motion.button
                  className="flex items-center justify-center w-8 h-8 hover:bg-gray-600/50 rounded-lg transition-colors"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="material-symbols-outlined text-lg text-gray-400">
                    close
                  </span>
                </motion.button>
              </div>

              {/* Master Volume */}
              <div className="mb-6 p-4 rounded-xl border border-white/10" style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}>
                <VolumeControl
                  label="Master Volume"
                  value={masterVolume}
                  onChange={handleMasterVolumeChange}
                  icon="volume_up"
                  color="blue"
                />
              </div>

              {/* Individual Controls */}
              <div className="space-y-1">
                <VolumeControl
                  label="Ambient Music"
                  value={ambientVolume}
                  onChange={setAmbientVolume}
                  icon="music_note"
                  color="purple"
                />
                
                <VolumeControl
                  label="Spotify Music"
                  value={spotifyVolume}
                  onChange={setSpotifyVolume}
                  icon="library_music"
                  color="green"
                />
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors text-sm text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setAmbientVolume(50);
                      setSpotifyVolume(50);
                      setMasterVolume(50);
                      setIsMuted(false);
                    }}
                  >
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Reset
                  </motion.button>
                  
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-colors text-sm text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleMute}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                    {isMuted ? 'Unmute' : 'Mute'}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Win11VolumeSlider;
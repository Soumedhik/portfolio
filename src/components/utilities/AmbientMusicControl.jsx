import React, { useState, useEffect } from 'react';
import soundManager from '../../utils/soundManager';

const AmbientMusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('comfort-chain');

  useEffect(() => {
    // Check if ambient music is already playing
    const checkPlayingState = () => {
      const ambientSound = soundManager.sounds.ambientMusic;
      if (ambientSound) {
        setIsPlaying(!ambientSound.paused);
      }
    };

    checkPlayingState();
    const interval = setInterval(checkPlayingState, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAmbientMusic = () => {
    if (isPlaying) {
      soundManager.stopAmbient();
      setIsPlaying(false);
    } else {
      soundManager.startAmbient();
      setIsPlaying(true);
    }
  };

  return (
    <div className="ambient-control flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg">
      <button
        onClick={toggleAmbientMusic}
        className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
      >
        <span className="material-symbols-outlined text-sm">
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
        {isPlaying ? 'Pause' : 'Play'} Ambient
      </button>
      
      <div className="flex items-center gap-1 text-xs text-gray-300">
        <span className="material-symbols-outlined text-sm text-purple-400">
          music_note
        </span>
        <span>{currentTrack}</span>
      </div>
    </div>
  );
};

export default AmbientMusicControl;
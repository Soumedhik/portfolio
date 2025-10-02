// Sound management system for Windows 11 Portfolio
// Provides centralized audio control for all user interactions

class SoundManager {
  constructor() {
    this.sounds = {};
    this.failedSounds = new Set();
    this.isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    console.log(`🎵 SoundManager initialized (${this.isLocalDev ? 'Development' : 'Production'} mode)`);
    
    // Audio file mapping with fallbacks
    this.audioFiles = {
      // System sounds
      startup: ['/audio/switch.mp3'],
      shutdown: ['/audio/shutdown.mp3'],
      sleep: ['/audio/sleep.mp3'],
      
      // Window management
      windowOpen: ['/audio/window-open.mp3'],
      windowClose: ['/audio/window-close.mp3'],
      minimize: ['/audio/minimize.mp3'],
      maximize: ['/audio/maximize.mp3'],
      
      // UI interactions
      buttonClick: ['/audio/button-click.mp3'],
      hover: ['/audio/hover.mp3'],
      typing: ['/audio/typing.mp3'],
      
      // Background music - try comfort-chain first with multiple fallback paths
      ambientMusic: [
        '/audio/comfort-chain.mp3',
        './audio/comfort-chain.mp3',
        'audio/comfort-chain.mp3',
        '/audio/lullaby.mp3'
      ]
    };
    
    this.initializeSounds();

    this.isMuted = false;
    this.masterVolume = 1.0; // Increased to maximum for better audibility
    this.ambientWasPaused = false;
    
    // Individual volume controls
    this.volumeLevels = {
      master: 0.6,
      ambient: 0.5,
      spotify: 0.7,
      effects: 0.5
    };
    
    // Load saved volumes
    this.loadVolumeSettings();
  }

  // Initialize sounds with fallback system
  initializeSounds() {
    Object.keys(this.audioFiles).forEach(key => {
      this.createSoundWithFallback(key, this.audioFiles[key]);
    });
  }

  // Create sound with fallback URLs
  createSoundWithFallback(soundName, urls) {
    const tryNextUrl = (index = 0) => {
      if (index >= urls.length) {
        console.warn(`⚠️ All audio sources failed for ${soundName}`);
        if (soundName === 'ambientMusic') {
          console.log('🎵 Creating synthetic Comfort Chain...');
          this.sounds[soundName] = this.createSyntheticComfortChain();
          this.configureSoundSettings(soundName, this.sounds[soundName]);
        } else {
          console.log(`🔇 Creating silent fallback for ${soundName}`);
          this.sounds[soundName] = this.createSilentAudio();
          this.failedSounds.add(soundName);
        }
        return;
      }

      const audio = new Audio(urls[index]);
      
      // Add timeout to prevent hanging on server issues
      const loadTimeout = setTimeout(() => {
        console.warn(`⚠️ Load timeout for ${soundName} from ${urls[index]}, trying next...`);
        tryNextUrl(index + 1);
      }, 5000); // 5 second timeout

      audio.addEventListener('loadeddata', () => {
        console.log(`✅ Audio loaded: ${soundName} from ${urls[index]}`);
        clearTimeout(loadTimeout);
        this.sounds[soundName] = audio;
        this.configureSoundSettings(soundName, audio);
      });
      
      audio.addEventListener('error', (e) => {
        console.warn(`⚠️ Failed to load ${soundName} from ${urls[index]} (Error: ${e.type}), trying next...`);
        clearTimeout(loadTimeout);
        tryNextUrl(index + 1);
      });
      
      // Also handle load abort and other failure cases
      audio.addEventListener('abort', () => {
        console.warn(`⚠️ Load aborted for ${soundName} from ${urls[index]}, trying next...`);
        clearTimeout(loadTimeout);
        tryNextUrl(index + 1);
      });
      
      audio.load();
    };
    
    tryNextUrl();
  }

  // Configure individual sound settings
  configureSoundSettings(soundName, audio) {
    if (soundName === 'ambientMusic') {
      audio.loop = true;
      audio.volume = 0.5;
    } else {
      audio.volume = 0.5;
    }
  }

  // Create silent audio as fallback
  createSilentAudio() {
    const audio = new Audio();
    // Create a minimal silent audio data URL
    audio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=';
    audio.load();
    return audio;
  }

  // Create synthetic audio using Web Audio API (for comfort chain fallback)
  createSyntheticComfortChain() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      let currentSource = null;
      let isPlaying = false;
      
      const createBuffer = () => {
        const duration = 30; // 30 seconds loop
        const sampleRate = audioContext.sampleRate;
        const buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
        const data = buffer.getChannelData(0);
        
        // Generate a more pleasant ambient sound
        for (let i = 0; i < data.length; i++) {
          const time = i / sampleRate;
          // Layered ambient tones
          const tone1 = Math.sin(2 * Math.PI * 220 * time) * 0.03;
          const tone2 = Math.sin(2 * Math.PI * 330 * time) * 0.02;
          const tone3 = Math.sin(2 * Math.PI * 440 * time) * 0.01;
          const envelope = Math.sin(2 * Math.PI * 0.1 * time) * 0.5 + 0.5;
          data[i] = (tone1 + tone2 + tone3) * envelope;
        }
        return buffer;
      };
      
      const buffer = createBuffer();
      const gainNode = audioContext.createGain();
      gainNode.gain.value = 0.3;
      gainNode.connect(audioContext.destination);
      
      // Create an Audio-like interface
      const syntheticAudio = {
        play: () => {
          if (isPlaying) return Promise.resolve();
          
          currentSource = audioContext.createBufferSource();
          currentSource.buffer = buffer;
          currentSource.loop = true;
          currentSource.connect(gainNode);
          currentSource.start(0);
          isPlaying = true;
          console.log('🎵 Playing synthetic Comfort Chain');
          return Promise.resolve();
        },
        pause: () => {
          if (currentSource && isPlaying) {
            currentSource.stop();
            currentSource = null;
            isPlaying = false;
            console.log('⏸️ Paused synthetic Comfort Chain');
          }
        },
        get volume() { return gainNode.gain.value; },
        set volume(val) { gainNode.gain.value = val; },
        loop: true,
        get paused() { return !isPlaying; },
        src: 'synthetic://comfort-chain',
        readyState: 4, // HAVE_ENOUGH_DATA
        load: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        currentTime: 0
      };
      
      return syntheticAudio;
    } catch (e) {
      console.warn('⚠️ Web Audio API not available, using silent fallback');
      return this.createSilentAudio();
    }
  }

  // Play specific sound effect
  play(soundName) {
    if (this.isMuted) {
      console.log(`🔇 Sound ${soundName} not played: audio is muted`);
      return;
    }
    
    if (!this.sounds[soundName]) {
      console.log(`🔇 Sound ${soundName} not available (still loading or failed)`);
      return;
    }
    
    if (this.failedSounds.has(soundName)) {
      // Don't spam console for known failed sounds
      return;
    }
    
    try {
      const sound = this.sounds[soundName];
      sound.currentTime = 0; // Reset to beginning
      sound.volume = this.masterVolume * (soundName === 'ambientMusic' ? 0.8 : 0.5);
      console.log(`🔊 Playing sound: ${soundName} at volume ${sound.volume}`);
      sound.play().then(() => {
        if (soundName === 'ambientMusic') {
          const isComfortChain = sound.src.includes('comfort-chain');
          console.log(`🎵 ${isComfortChain ? 'Comfort Chain' : 'Background music'} started successfully! (Source: ${sound.src})`);
          console.log(`🎵 Ready state: ${sound.readyState} (HAVE_ENOUGH_DATA)`);
          console.log(`🎵 Is paused: ${sound.paused}`);
          console.log(`🎵 Volume: ${sound.volume}`);
          if (isComfortChain) {
            console.log('🎉 SUCCESS: Comfort Chain is now playing!');
          }
        }
      }).catch(e => {
        console.error(`❌ Audio play prevented for ${soundName}:`, e);
        if (soundName === 'ambientMusic') {
          console.log('💡 Try clicking anywhere on the page to enable audio');
        }
      });
    } catch (error) {
      console.log('Sound playback error:', error);
    }
  }

  // Stop specific sound
  stop(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName].pause();
      this.sounds[soundName].currentTime = 0;
    }
  }

  // Toggle mute state
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      Object.values(this.sounds).forEach(sound => {
        sound.pause();
      });
    }
    return this.isMuted;
  }

  // Load volume settings from localStorage
  loadVolumeSettings() {
    try {
      const saved = localStorage.getItem('volumeLevels');
      if (saved) {
        this.volumeLevels = { ...this.volumeLevels, ...JSON.parse(saved) };
      }
      const masterVol = localStorage.getItem('masterVolume');
      if (masterVol) {
        this.volumeLevels.master = parseInt(masterVol) / 100;
      }
    } catch (e) {
      console.log('Failed to load volume settings:', e);
    }
  }

  // Save volume settings to localStorage
  saveVolumeSettings() {
    try {
      localStorage.setItem('volumeLevels', JSON.stringify(this.volumeLevels));
      localStorage.setItem('masterVolume', Math.round(this.volumeLevels.master * 100).toString());
    } catch (e) {
      console.log('Failed to save volume settings:', e);
    }
  }

  // Set master volume (0-1)
  setMasterVolume(volume) {
    this.volumeLevels.master = Math.max(0, Math.min(1, volume));
    this.masterVolume = this.volumeLevels.master;
    this.updateAllVolumes();
    this.saveVolumeSettings();
  }

  // Set volume for specific sound category
  setCategoryVolume(category, volume) {
    if (category in this.volumeLevels) {
      this.volumeLevels[category] = Math.max(0, Math.min(1, volume));
      this.updateAllVolumes();
      this.saveVolumeSettings();
    }
  }

  // Update all sound volumes based on current settings
  updateAllVolumes() {
    Object.keys(this.sounds).forEach(key => {
      if (this.sounds[key]) {
        const category = this.getSoundCategory(key);
        const categoryVolume = this.volumeLevels[category] || 0.5;
        this.sounds[key].volume = this.volumeLevels.master * categoryVolume;
      }
    });
  }

  // Get sound category for volume control
  getSoundCategory(soundName) {
    switch (soundName) {
      case 'ambientMusic':
        return 'ambient';
      case 'spotify':
      case 'spotifyMusic':
        return 'spotify';
      default:
        return 'effects';
    }
  }

  // Legacy method for compatibility
  setVolume(volume) {
    this.setMasterVolume(volume);
  }

  // Start ambient background music
  startAmbient() {
    console.log('🎵 Attempting to start Comfort Chain...');
    if (!this.isMuted) {
      this.play('ambientMusic');
    } else {
      console.log('🔇 Ambient music not started: audio is muted');
    }
  }

  // Stop ambient background music
  stopAmbient() {
    this.stop('ambientMusic');
  }

  // Pause ambient music for external audio (like Spotify)
  pauseAmbientForExternal() {
    if (this.sounds.ambientMusic && !this.sounds.ambientMusic.paused) {
      this.sounds.ambientMusic.pause();
      this.ambientWasPaused = true;
      console.log('🎵 Comfort Chain paused for external audio (Spotify)');
    }
  }

  // Resume ambient music after external audio stops
  resumeAmbientFromExternal() {
    if (this.sounds.ambientMusic && this.ambientWasPaused && !this.isMuted) {
      this.sounds.ambientMusic.play().catch(e => console.log('Ambient resume prevented:', e));
      this.ambientWasPaused = false;
      console.log('🎵 Comfort Chain resumed after external audio stopped');
    }
  }

  // Reduce ambient volume for external audio (alternative to pausing)
  duckAmbientForExternal() {
    if (this.sounds.ambientMusic && !this.sounds.ambientMusic.paused) {
      this.sounds.ambientMusic.volume = 0.05; // Very low volume
      console.log('🎵 Comfort Chain volume reduced for external audio');
    }
  }

  // Restore ambient volume after external audio stops
  restoreAmbientVolume() {
    if (this.sounds.ambientMusic && !this.sounds.ambientMusic.paused) {
      this.sounds.ambientMusic.volume = this.masterVolume * 0.7; // Restore normal volume (increased)
      console.log('🎵 Comfort Chain volume restored');
    }
  }

  // Pause ambient music for external audio (like Spotify)
  pauseAmbientForExternal() {
    if (this.sounds.ambientMusic && !this.sounds.ambientMusic.paused) {
      this.sounds.ambientMusic.pause();
      this.ambientWasPaused = true;
      console.log('🎵 Ambient music paused for external audio (Spotify)');
    }
  }

  // Resume ambient music after external audio stops
  resumeAmbientFromExternal() {
    if (this.sounds.ambientMusic && this.ambientWasPaused && !this.isMuted) {
      this.sounds.ambientMusic.play().catch(e => console.log('Ambient resume prevented:', e));
      this.ambientWasPaused = false;
      console.log('🎵 Ambient music resumed after external audio stopped');
    }
  }

  // Preload all sounds for better performance
  preloadSounds() {
    console.log('🔄 Preloading all audio files...');
    // Reinitialize sounds in case they failed initially
    this.initializeSounds();
  }

  // Test if ambient music can play (for debugging)
  testAmbientMusic() {
    console.log('🧪 Testing Comfort Chain playback...');
    console.log(`🌐 Environment: ${this.isLocalDev ? 'Development (localhost)' : 'Production (deployed)'}`);
    console.log(`🔇 Failed sounds: ${Array.from(this.failedSounds).join(', ') || 'None'}`);
    
    const sound = this.sounds.ambientMusic;
    if (sound) {
      console.log(`📁 Audio source: ${sound.src}`);
      console.log(`🔊 Current volume: ${sound.volume}`);
      console.log(`⏸️ Is paused: ${sound.paused}`);
      if (sound.readyState !== undefined) {
        console.log(`📊 Ready state: ${sound.readyState} (${this.getReadyStateText(sound.readyState)})`);
      }
      console.log(`🎵 Audio type: ${sound.src.includes('synthetic') ? 'Synthetic' : 'File-based'}`);
      this.startAmbient();
    } else {
      console.error('❌ Ambient music sound object not found!');
      console.log('🔄 Attempting to reinitialize...');
      this.initializeSounds();
    }
  }

  // Get human-readable ready state
  getReadyStateText(readyState) {
    const states = {
      0: 'HAVE_NOTHING',
      1: 'HAVE_METADATA',
      2: 'HAVE_CURRENT_DATA',
      3: 'HAVE_FUTURE_DATA',
      4: 'HAVE_ENOUGH_DATA'
    };
    return states[readyState] || 'UNKNOWN';
  }

  // Add hover sound effect to elements
  addHoverEffect(element) {
    if (!element) return;
    
    element.addEventListener('mouseenter', () => {
      this.play('hover');
    });
  }

  // Add click sound effect to elements
  addClickEffect(element) {
    if (!element) return;
    
    element.addEventListener('click', () => {
      this.play('buttonClick');
    });
  }

  // Batch add sound effects to multiple elements
  addSoundEffects(selector, effects = ['hover', 'click']) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      if (effects.includes('hover')) {
        this.addHoverEffect(element);
      }
      if (effects.includes('click')) {
        this.addClickEffect(element);
      }
    });
  }
}

// Create global sound manager instance
const soundManager = new SoundManager();

// Initialize sound effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  soundManager.preloadSounds();
  
  // Add sound effects to common interactive elements
  setTimeout(() => {
    soundManager.addSoundEffects('.taskbar-item', ['hover', 'click']);
    soundManager.addSoundEffects('button', ['hover', 'click']);
    soundManager.addSoundEffects('.desktop-icon', ['hover', 'click']);
    soundManager.addSoundEffects('.material-symbols-outlined', ['hover', 'click']);
  }, 1000);
});

// Allow user interaction to enable audio context
document.addEventListener('click', () => {
  soundManager.preloadSounds();
}, { once: true });

// Make soundManager globally accessible for debugging
if (typeof window !== 'undefined') {
  window.soundManager = soundManager;
  window.testComfortChain = () => soundManager.testAmbientMusic();
  window.startComfortChain = () => soundManager.startAmbient();
  window.boostVolume = () => {
    soundManager.setVolume(1.0);
    if (soundManager.sounds.ambientMusic) {
      soundManager.sounds.ambientMusic.volume = 0.9;
      console.log('� Volume boosted to maximum!');
      console.log(`🎵 Ambient volume: ${soundManager.sounds.ambientMusic.volume}`);
      console.log(`🎵 Is playing: ${!soundManager.sounds.ambientMusic.paused}`);
    }
  };
  window.forceComfortChain = () => {
    console.log('🔄 Force loading Comfort Chain...');
    
    // Try multiple approaches to load comfort-chain.mp3
    const tryMethods = [
      () => new Audio('/audio/comfort-chain.mp3'),
      () => new Audio(`${window.location.origin}/audio/comfort-chain.mp3`),
      () => new Audio('./audio/comfort-chain.mp3'),
      () => new Audio('audio/comfort-chain.mp3'),
      () => {
        // Last resort: try creating a fetch request first to check if file exists
        console.log('🔄 Trying fetch method...');
        fetch('/audio/comfort-chain.mp3')
          .then(response => {
            console.log(`📡 Fetch response: ${response.status} - ${response.headers.get('content-type')}`);
            if (response.ok && response.headers.get('content-type')?.includes('audio')) {
              return response.blob();
            } else {
              throw new Error(`Server returned: ${response.status} with content-type: ${response.headers.get('content-type')}`);
            }
          })
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.volume = 0.8;
            audio.loop = true;
            audio.addEventListener('loadeddata', () => {
              console.log('✅ Comfort Chain loaded via fetch + blob!');
              soundManager.sounds.ambientMusic = audio;
              audio.play();
            });
            audio.load();
          })
          .catch(e => {
            console.log('❌ Fetch method failed:', e);
            console.log('🔄 Falling back to lullaby...');
            window.forceLoadLullaby();
          });
        return null; // Don't try Audio constructor for this method
      }
    ];
    
    let currentMethod = 0;
    
    const tryNext = () => {
      if (currentMethod >= tryMethods.length) {
        console.log('❌ All Comfort Chain methods failed, falling back to lullaby...');
        window.forceLoadLullaby();
        return;
      }
      
      const audio = tryMethods[currentMethod]();
      currentMethod++;
      
      if (!audio) return; // Skip null returns (like fetch method)
      
      audio.volume = 0.8;
      audio.loop = true;
      
      const loadTimeout = setTimeout(() => {
        console.log(`⏱️ Method ${currentMethod} timed out, trying next...`);
        tryNext();
      }, 8000);
      
      audio.addEventListener('loadeddata', () => {
        clearTimeout(loadTimeout);
        console.log(`✅ Comfort Chain loaded with method ${currentMethod}!`);
        soundManager.sounds.ambientMusic = audio;
        audio.play().then(() => {
          console.log('🎉 Comfort Chain is now playing!');
        });
      });
      
      audio.addEventListener('error', (e) => {
        clearTimeout(loadTimeout);
        console.log(`❌ Method ${currentMethod} failed:`, e);
        tryNext();
      });
      
      audio.load();
    };
    
    tryNext();
  };
  
  window.forceLoadLullaby = () => {
    console.log('🔄 Loading lullaby as fallback...');
    const audio = new Audio('/audio/lullaby.mp3');
    audio.volume = 0.8;
    audio.loop = true;
    
    audio.addEventListener('loadeddata', () => {
      console.log('✅ Lullaby loaded successfully!');
      soundManager.sounds.ambientMusic = audio;
      audio.play().then(() => {
        console.log('🎵 Lullaby is now playing (Comfort Chain unavailable)');
      });
    });
    
    audio.addEventListener('error', (e) => {
      console.log('❌ Even lullaby failed! Creating synthetic audio...');
      soundManager.sounds.ambientMusic = soundManager.createSyntheticComfortChain();
      soundManager.sounds.ambientMusic.play();
    });
    
    audio.load();
  };
  
  window.checkAudio = () => {
    const sound = soundManager.sounds.ambientMusic;
    if (sound) {
      console.log('🎵 Audio Status:');
      console.log(`   Source: ${sound.src}`);
      console.log(`   Volume: ${sound.volume}`);
      console.log(`   Playing: ${!sound.paused}`);
      console.log(`   Ready: ${sound.readyState === 4}`);
      console.log(`   Current Time: ${sound.currentTime}`);
    }
  };
  console.log('🔧 Debug Commands Available:');
  console.log('   window.testComfortChain() - Full test');
  console.log('   window.forceComfortChain() - Force load Comfort Chain');
  console.log('   window.forceLoadLullaby() - Force load lullaby');
  console.log('   window.boostVolume() - Max volume');
  console.log('   window.checkAudio() - Check status');
}

export default soundManager;
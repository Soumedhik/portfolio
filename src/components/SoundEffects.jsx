// Enhanced Sound Effects for Windows 11 Portfolio
// This component adds comprehensive audio feedback

import { useEffect } from 'react';
import soundManager from '../utils/soundManager';

const SoundEffects = () => {
  useEffect(() => {
    // Initialize sound system when component mounts
    soundManager.preloadSounds();

    // Add global sound effects to interactive elements
    const addGlobalSounds = () => {
      // Desktop icons
      const desktopIcons = document.querySelectorAll('[data-app]');
      desktopIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => soundManager.play('hover'));
        icon.addEventListener('click', () => soundManager.play('buttonClick'));
      });

      // Taskbar items
      const taskbarItems = document.querySelectorAll('.taskbar-item');
      taskbarItems.forEach(item => {
        item.addEventListener('mouseenter', () => soundManager.play('hover'));
        item.addEventListener('click', () => soundManager.play('buttonClick'));
      });

      // Window controls (minimize, maximize, close)
      const windowControls = document.querySelectorAll('.window-control');
      windowControls.forEach(control => {
        control.addEventListener('mouseenter', () => soundManager.play('hover'));
      });

      // Menu items
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => soundManager.play('hover'));
        item.addEventListener('click', () => soundManager.play('buttonClick'));
      });

      // Navigation buttons
      const navButtons = document.querySelectorAll('.nav-button');
      navButtons.forEach(button => {
        button.addEventListener('mouseenter', () => soundManager.play('hover'));
        button.addEventListener('click', () => soundManager.play('buttonClick'));
      });

      // Form elements
      const formElements = document.querySelectorAll('input, textarea, select');
      formElements.forEach(element => {
        element.addEventListener('focus', () => soundManager.play('buttonClick'));
        element.addEventListener('input', () => soundManager.play('typing'));
      });
    };

    // Add sounds with delay to ensure DOM is ready
    const timeoutId = setTimeout(addGlobalSounds, 1500);

    // Keyboard shortcuts with sound
    const handleKeyDown = (event) => {
      // System shortcuts
      if (event.altKey && event.key === 'Tab') {
        soundManager.play('switch');
      }
      if (event.key === 'Escape') {
        soundManager.play('buttonClick');
      }
      if (event.ctrlKey && event.key === 'z') {
        soundManager.play('buttonClick');
      }
    };

    // Easter egg sounds
    const handleSpecialKeys = (event) => {
      const konamiKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
      if (konamiKeys.includes(event.code)) {
        soundManager.play('hover');
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleSpecialKeys);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleSpecialKeys);
    };
  }, []);

  // Start ambient music after user interaction
  useEffect(() => {
    const startAmbientMusic = () => {
      console.log('🎵 User interacted - starting Comfort Chain in 3 seconds...');
      setTimeout(() => {
        soundManager.startAmbient();
        // Test method for debugging
        setTimeout(() => {
          soundManager.testAmbientMusic();
        }, 1000);
      }, 3000); // Start after 3 seconds
    };

    // Wait for user interaction to start audio
    const handleFirstInteraction = () => {
      console.log('👆 First user interaction detected!');
      startAmbientMusic();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    // Listen for multiple types of user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    // Also try to start immediately (will fail if no interaction, but worth trying)
    setTimeout(() => {
      if (!soundManager.isMuted) {
        console.log('🔄 Attempting immediate audio start (might fail due to autoplay policy)...');
        soundManager.startAmbient();
      }
    }, 1000);

    // Check if we're using synthetic audio after a delay
    setTimeout(() => {
      const ambientSound = soundManager.sounds.ambientMusic;
      if (ambientSound && ambientSound.src && ambientSound.src.includes('synthetic')) {
        console.log('🎵 Using synthetic Comfort Chain - audio files not available in production');
        // Could add a toast notification here if desired
      }
    }, 5000);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SoundEffects;
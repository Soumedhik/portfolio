import React, { useCallback, useEffect, useMemo, useState, lazy, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import appsData from "../data/data";
import soundManager from '../utils/soundManager';
import SoundEffects from '../components/SoundEffects';
import { win11Duration, win11Easing } from '../utils/win11Animations';
import { createMinimizedState, createWindowState, MINIMIZABLE_WINDOWS } from '../constants/windows';
import { 
  Win11DesktopIcon, 
  Win11Notification,
  Win11StaggeredList
} from '../components/Win11Components';

// Critical components loaded immediately
import Taskbar from "../components/layout/Taskbar";
import RightClick from "../components/utilities/RightClick";
import StartMenu from "../components/layout/StartMenu";
import VideoBackground from '../components/utilities/VideoBackground';

// Lazy load heavy components to improve initial load
const Explorer = lazy(() => import("../components/apps/Explorer"));
const Browser = lazy(() => import("../components/apps/Browser"));
const VsCode = lazy(() => import("../components/apps/VsCode"));
const Slider = lazy(() => import("../components/utilities/Slider"));
const RecycleBin = lazy(() => import("../components/apps/RecycleBin"));
const Apps = lazy(() => import("../components/apps/Apps"));
const Torch = lazy(() => import("../components/apps/Torch"));
const Pictures = lazy(() => import("../components/apps/Pictures"));
const Notepad = lazy(() => import("../components/apps/Notepad"));
const ContactMe = lazy(() => import("../components/apps/ContactMe"));
const LinkedIn = lazy(() => import("../components/apps/LinkedIn"));
const GitHub = lazy(() => import("../components/apps/GitHub"));
const Videos = lazy(() => import("../components/apps/Videos"));
// const PortfolioChatbot = lazy(() => import("../components/apps/PortfolioChatbot")); // Removed from UI
const SnapLayouts = lazy(() => import("../components/utilities/SnapLayouts"));
const QuickSettings = lazy(() => import("../components/utilities/QuickSettings"));
const SystemTray = lazy(() => import("../components/utilities/SystemTray"));

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

const calculateScreenLayout = (width, height) => {
  const orientation = width >= height ? 'landscape' : 'portrait';
  const compactHeight = height < 520;
  const isMobileWidth = width < 768;
  const isMobile = isMobileWidth || (orientation === 'landscape' && compactHeight);
  const isTablet = !isMobile && width >= 768 && width < 1024;
  const isSmallDesktop = !isMobile && !isTablet && (width < 1440 || height < 820);

  return {
    width,
    height,
    orientation,
    isMobile,
    isMobileLandscape: isMobile && orientation === 'landscape',
    isTablet,
    isSmallDesktop,
    isLargeDesktop: !isMobile && !isTablet && !isSmallDesktop
  };
};

function Main({ isMobile = false }) {
  const constraintsRef = useRef(null);
  const notificationTimeouts = useRef(new Map());
  const [isSleeping, setIsSleeping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [actionType, setActionType] = useState(null);

  const [windows, setWindows] = useState(() => createWindowState());

  // Minimized windows state
  const [minimizedWindows, setMinimizedWindows] = useState(() => createMinimizedState());

  // Windows 11 Features State
  const [windows11Features, setWindows11Features] = useState({
    focusAssist: false,
    darkMode: true,
    systemSounds: true,
    animationsEnabled: true,
  });

  const [toastNotifications, setToastNotifications] = useState([]);

  // Additional Windows 11 UI State
  const [showSnapLayouts, setShowSnapLayouts] = useState(false);
  const [showQuickSettings, setShowQuickSettings] = useState(false);
  const [showSystemTray, setShowSystemTray] = useState(false);

  const [aboutMe, setAboutMe] = useState(null);
  const [input, setInput] = useState(null);

  // Easter Eggs State
  const [easterEggs, setEasterEggs] = useState({
    konamiActivated: false,
    developerMode: false,
    desktopPet: false,
    soundEffects: true,
    clickCount: 0,
    lastClickTime: 0,
  });

  // Konami Code sequence
  const [konamiSequence, setKonamiSequence] = useState([]);
  
  // Sound management state
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [soundVolume, setSoundVolume] = useState(0.7);
  
  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsSoundMuted(muted);
  };
  
  const adjustVolume = (volume) => {
    setSoundVolume(volume);
    soundManager.setVolume(volume);
  };

  // Responsive screen size detection
  const [screenSize, setScreenSize] = useState(() => calculateScreenLayout(window.innerWidth, window.innerHeight));

  // Update screen size on resize with debounce for performance
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        setScreenSize(calculateScreenLayout(width, height));
      }, 150); // Debounce resize events
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Responsive scaling calculations
  const getResponsiveScale = () => {
    if (screenSize.isMobile) {
      if (screenSize.isMobileLandscape) {
        return { iconSize: 'w-8 h-8', containerSize: 'w-16 h-16', textSize: 'text-[10px]', gap: 'gap-2' };
      }
      return { iconSize: 'w-3 h-3', containerSize: 'w-6 h-6', textSize: 'text-[8px]', gap: 'gap-0.5' };
    }
    if (screenSize.isTablet) return { iconSize: 'w-8 h-8', containerSize: 'w-12 h-12', textSize: 'text-xs', gap: 'gap-2' };
    if (screenSize.isSmallDesktop) return { iconSize: 'w-12 h-12', containerSize: 'w-18 h-18', textSize: 'text-sm', gap: 'gap-4' };
    return { iconSize: 'w-14 h-14', containerSize: 'w-20 h-20', textSize: 'text-base', gap: 'gap-6' };
  };

  const responsiveScale = getResponsiveScale();

  const screenWidth = screenSize.width;
  const screenHeight = screenSize.height;
  const mobileLandscapePadding = screenSize.isMobileLandscape ? { right: 60, bottom: 90 } : { right: 20, bottom: 60 };
  const bounds = {
    left: screenSize.isMobile ? -10 : -50,
    top: screenSize.isMobile ? -10 : -50,
    right: screenWidth - (screenSize.isMobile ? mobileLandscapePadding.right : 100),
    bottom: screenHeight - (screenSize.isMobile ? mobileLandscapePadding.bottom : 100),
  };

  function handleFadeOutClick() {
    setFadeOut(true);
    setTimeout(() => {
      setIsSleeping(false);
      setFadeOut(false);
    }, 1000);
  }

  // Desktop Easter Egg - Multiple rapid clicks
  const handleDesktopClick = () => {
    const currentTime = Date.now();
    const timeDiff = currentTime - easterEggs.lastClickTime;
    
    if (timeDiff < 1000) { // Within 1 second
      const newCount = easterEggs.clickCount + 1;
      setEasterEggs(prev => ({ 
        ...prev, 
        clickCount: newCount, 
        lastClickTime: currentTime 
      }));
      
      if (newCount === 7) {
        setEasterEggs(prev => ({ ...prev, desktopPet: !prev.desktopPet, clickCount: 0 }));
        playSystemSound('switch');
      }
    } else {
      setEasterEggs(prev => ({ ...prev, clickCount: 1, lastClickTime: currentTime }));
    }
  };

  const systemSoundsEnabled = windows11Features.systemSounds;
  const focusAssistEnabled = windows11Features.focusAssist;

  // Windows 11 System Sounds
  const playSystemSound = useCallback((soundType) => {
    if (!systemSoundsEnabled) return;

    const sounds = {
      notification: '/audio/switch.mp3',
      switch: '/audio/switch.mp3',
      error: '/audio/shutdown.mp3',
      focus: '/audio/sleep.mp3'
    };

    if (sounds[soundType]) {
      const audio = new Audio(sounds[soundType]);
      audio.volume = 0.15;
      audio.play().catch(() => {});
    }
  }, [systemSoundsEnabled]);

  const addNotification = useCallback((title, message, icon = '💼') => {
    const id = Date.now();
    const newNotification = {
      id,
      title,
      message,
      icon,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setToastNotifications(prev => {
      const withoutDuplicate = prev.filter(notification => notification.id !== id);
      const nextStack = [...withoutDuplicate, newNotification];
      return nextStack.slice(-3);
    });

    playSystemSound('notification');

    if (notificationTimeouts.current.has(id)) {
      clearTimeout(notificationTimeouts.current.get(id));
    }

    const timeoutId = setTimeout(() => {
      setToastNotifications(prev => prev.filter(notification => notification.id !== id));
      notificationTimeouts.current.delete(id);
    }, 6000);

    notificationTimeouts.current.set(id, timeoutId);
  }, [playSystemSound]);

  useEffect(() => {
    const timeouts = notificationTimeouts.current;

    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
      timeouts.clear();
    };
  }, []);

  // Toggle Windows 11 Features
  const toggleWindows11Feature = useCallback((feature) => {
    setWindows11Features(prev => {
      const nextValue = !prev[feature];

      if (feature === 'focusAssist') {
        playSystemSound(nextValue ? 'focus' : 'notification');
      }

      return {
        ...prev,
        [feature]: nextValue
      };
    });
  }, [playSystemSound]);

  // Minimize window function
  const minimizeWindow = useCallback((windowName) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [windowName]: true
    }));

    playSystemSound('switch');

    if (!focusAssistEnabled) {
      addNotification(
        'Window Minimized', 
        `${windowName.charAt(0).toUpperCase() + windowName.slice(1)} minimized to taskbar`,
        '➖'
      );
    }
  }, [addNotification, focusAssistEnabled, playSystemSound]);

  // Restore window function
  const restoreWindow = useCallback((windowName) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [windowName]: false
    }));

    setWindows(prev => ({
      ...prev,
      [windowName]: true
    }));

    playSystemSound('switch');
  }, [playSystemSound]);

  const toggleWindow = useCallback((windowName, input = null) => {
    // Special handling for LinkedIn - open external link without affecting other windows
    if (windowName === 'linkedin') {
      setWindows(prev => {
        const isOpen = Boolean(prev.linkedin);
        soundManager.play(isOpen ? 'windowClose' : 'windowOpen');
        return {
          ...prev,
          linkedin: !isOpen
        };
      });
      return;
    }

    if (minimizedWindows[windowName]) {
      soundManager.play('windowOpen');
      restoreWindow(windowName);
      return;
    }

    if (windows[windowName]) {
      if (windowName === "app" && input !== null) {
        setInput(input);
        soundManager.play('buttonClick');
        return;
      }

      if (MINIMIZABLE_WINDOWS.includes(windowName)) {
        soundManager.play('minimize');
        minimizeWindow(windowName);
        return;
      }

      soundManager.play('windowClose');
    } else {
      soundManager.play('windowOpen');
    }

    setWindows(prev => {
      const nextState = createWindowState();
      nextState[windowName] = !prev[windowName];
      return nextState;
    });

    if (windowName === "explorer" && input !== null) {
      setAboutMe(input);
    } else if (windowName === "app" && input !== null) {
      setInput(input);
    }
  }, [minimizedWindows, minimizeWindow, restoreWindow, windows]);

  const images = useMemo(
    () => [
      "/images/fun/1.gif",
      "/images/fun/2.jpg",
      "/images/fun/3.jpg",
      "/images/fun/4.jpg",
    ],
    []
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  // Welcome notification on load
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification(
        'Welcome to Portfolio!', 
        'Explore Soumedhik\'s professional journey',
        '👋'
      );
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [addNotification]);

  // Konami Code Easter Egg
  useEffect(() => {
    const handleKeyDown = (event) => {
  const newSequence = [...konamiSequence, event.code].slice(-KONAMI_CODE.length);
      setKonamiSequence(newSequence);
      
  if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
        setEasterEggs(prev => ({ ...prev, konamiActivated: !prev.konamiActivated }));
        setKonamiSequence([]);
        
        // Play fun sound
        const audio = new Audio('/audio/switch.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
        
        // Show notification
        alert(easterEggs.konamiActivated ? '🎮 Konami Mode Disabled!' : '🎮 Konami Code Activated! 30 extra lives!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiSequence, easterEggs.konamiActivated]);

  // Developer Mode Easter Egg (Ctrl+Shift+D)
  useEffect(() => {
    const handleDevMode = (event) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyD') {
        event.preventDefault();
        setEasterEggs(prev => {
          const next = { ...prev, developerMode: !prev.developerMode };
          console.log(next.developerMode ? '🚀 Developer mode activated!' : '💻 Developer mode disabled.');
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleDevMode);
    return () => window.removeEventListener('keydown', handleDevMode);
  }, []);

  // Windows 11 Keyboard Shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (event) => {
      // Win + A for Quick Settings
      if (event.code === 'KeyA' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setShowQuickSettings(prev => !prev);
        playSystemSound('switch');
      }
      
      // Win + Z for Snap Layouts
      if (event.code === 'KeyZ' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setShowSnapLayouts(prev => !prev);
        playSystemSound('switch');
      }
    };

    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, [playSystemSound]);
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        scale: 0.95, 
        filter: "blur(20px)",
        y: 20 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        filter: "blur(0px)",
        y: 0 
      }}
      transition={{ 
        duration: win11Duration.slower, 
        ease: win11Easing.fluent,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }}
      className="win11-desktop-container"
    >
      {isSleeping && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-1000 ease-in-out ${
            fadeOut ? "opacity-0" : "opacity-100"
          } z-50`}
          onClick={handleFadeOutClick}
        >
          {actionType === "sleep" && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src={images[currentImageIndex]}
                alt="Random"
                className="w-64 h-64 object-cover rounded-lg shadow-lg"
              />
              <div>Windows is now sleeping💤</div>
              <audio src="/audio/sleep.mp3" autoPlay loop />
            </div>
          )}
          {actionType === "shutdown" && (
            <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
              <img
                src="/images/fun/xp.jpg"
                alt="Random"
                className="w-1/2 h-1/2 object-cover rounded-lg shadow-lg"
              />
              <div>BYE BYE👋🏻</div>
              <audio src="/audio/shutdown.mp3" autoPlay />
            </div>
          )}
        </div>
      )}
      <VideoBackground 
        src="/desktop_background.mp4"
        fallbackImage="/wallpaper.jpg"
        className="win11-desktop-background"
      />
      <SoundEffects />
  <Torch input={input} setInput={setInput} />
  <div className="relative h-[100dvh] min-h-[100dvh]" ref={constraintsRef}>
        <div 
          className="relative h-full w-full top-0 left-0 z-10 text-white"
          onClick={handleDesktopClick}
        >
          <RightClick option={true} />
          
          {/* Desktop Pet Easter Egg */}
          {easterEggs.desktopPet && (
            <div className="fixed bottom-16 right-4 z-40 animate-bounce">
              <div className="text-6xl cursor-pointer hover:scale-110 transition-transform"
                   onClick={() => {
                     const messages = ['🐱 Meow!', '🐶 Woof!', '🦄 Neigh!', '🐧 Squawk!', '🦊 What does the fox say?'];
                     alert(messages[Math.floor(Math.random() * messages.length)]);
                   }}>
                🐱
              </div>
              <div className="text-xs text-center bg-black bg-opacity-50 rounded px-2 py-1 mt-1">
                Pet me!
              </div>
            </div>
          )}
          
          {/* Konami Mode Effects */}
          {easterEggs.konamiActivated && (
            <div className="fixed top-4 right-4 z-40 animate-pulse">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow-lg">
                🎮 KONAMI MODE ACTIVE! 🎮
              </div>
            </div>
          )}
          
          {/* Developer Mode Indicator */}
          {easterEggs.developerMode && (
            <div className="fixed top-4 left-4 z-40 font-mono text-green-400 bg-black bg-opacity-80 p-2 rounded border border-green-500">
              <div className="text-xs mb-1">🚀 DEV MODE</div>
              <div className="text-xs opacity-75">Ctrl+Shift+I for more</div>
            </div>
          )}
          
          
          {/* Focus Assist Indicator */}
          <AnimatePresence>
            {windows11Features.focusAssist && (
              <Win11Notification
                isVisible={true}
                className="top-4 right-20 px-4 py-2 rounded-lg shadow-xl backdrop-blur-2xl border border-blue-400/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 120, 212, 0.8) 0%, rgba(16, 110, 190, 0.9) 100%)',
                  boxShadow: '0 15px 35px rgba(0, 120, 212, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: win11Duration.normal,
                    ease: win11Easing.fluent 
                  }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: win11Easing.standard 
                    }}
                  >
                    🎯
                  </motion.span>
                  <span className="font-medium">Focus Mode Active</span>
                </motion.div>
              </Win11Notification>
            )}
          </AnimatePresence>
          
          {/* Windows 11 Snap Layouts */}
          <SnapLayouts 
            isVisible={showSnapLayouts}
            onClose={() => setShowSnapLayouts(false)}
            onSnapLayout={(layout) => {
              addNotification('Window Snapped', `Applied ${layout.name} layout`, '📐');
            }}
          />
          
          {/* Windows 11 Quick Settings */}
          <QuickSettings
            isOpen={showQuickSettings}
            onClose={() => setShowQuickSettings(false)}
            windows11Features={windows11Features}
            toggleWindows11Feature={toggleWindows11Feature}
            addNotification={addNotification}
          />
          
          {/* Windows 11 System Tray */}
          <SystemTray
            isVisible={showSystemTray}
            onClose={() => setShowSystemTray(false)}
          />

          {/* Toast Notifications */}
          <div className="fixed bottom-[calc(3.6rem+1.5rem)] right-4 flex flex-col items-end gap-3 z-50 pointer-events-none max-w-full">
            <AnimatePresence>
              {toastNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 24, scale: 0.92 }}
                  transition={{ duration: win11Duration.fast, ease: win11Easing.fluent }}
                  className="pointer-events-auto w-[18rem] max-w-[90vw] rounded-2xl border border-white/15 bg-gradient-to-br from-white/18 to-white/6 backdrop-blur-2xl shadow-2xl px-4 py-3 text-white/90"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl drop-shadow-sm">{notification.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-white">{notification.title}</div>
                      <div className="text-xs text-white/80 leading-relaxed">{notification.message}</div>
                      <div className="text-[0.65rem] text-white/60 mt-1 tracking-wide uppercase">{notification.timestamp}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Desktop Apps Layout - Fully Responsive */}
          {screenSize.isMobile ? (
            // Mobile layout - Compact grid
            <div
              className="fixed left-0 right-0 p-0.5"
              style={{ bottom: screenSize.isMobileLandscape ? '4.5rem' : '3rem' }}
            >
              <Win11StaggeredList className={`grid gap-0.5 mx-auto max-w-full ${
                screenSize.width < 480 ? 'grid-cols-10' : 'grid-cols-12'
              }`}>
                {appsData.map((app, index) => (
                  <Win11DesktopIcon
                    key={app.id}
                    className="flex flex-col items-center"
                    onClick={() => {
                      if (minimizedWindows[app.action]) {
                        restoreWindow(app.action);
                      } else {
                        toggleWindow(app.action, app.subAction);
                      }
                      playSystemSound('switch');
                    }}
                  >
                    <div
                      className={`${responsiveScale.containerSize} flex flex-col justify-center items-center rounded-lg hover:bg-white hover:bg-opacity-20 p-1 touch-action-manipulation transition-all duration-200`}
                      onClick={() => {
                        if (minimizedWindows[app.action]) {
                          restoreWindow(app.action);
                        } else {
                          toggleWindow(app.action, app.subAction);
                        }
                        playSystemSound('switch');
                      }}
                      style={{ touchAction: 'manipulation' }}
                    >
                      {app.isIconFont ? (
                        <div className={`${responsiveScale.iconSize} flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg`}>
                          <span className={`material-symbols-outlined text-white ${app.iconColor || ''} text-lg`}>
                            {app.icon}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={app.icon}
                          alt={app.name}
                          className={`${responsiveScale.iconSize} object-contain`}
                          onDragStart={(e) => e.preventDefault()}
                        />
                      )}
                      <div className={`${responsiveScale.textSize} text-center select-none mt-0.5 truncate w-full leading-tight`}>
                        {app.name.length > 8 ? app.name.substring(0, 8) + '...' : app.name}
                      </div>
                    </div>
                  </Win11DesktopIcon>
                ))}
              </Win11StaggeredList>
            </div>
          ) : screenSize.isTablet ? (
            // Tablet layout - Compact side layout
            <div className={`absolute top-2 left-2 right-2 bottom-20`}>
              <Win11StaggeredList className={`grid grid-cols-6 ${responsiveScale.gap} p-2`}>
                {appsData.map((app, index) => (
                  <Win11DesktopIcon
                    key={app.id}
                    className="cursor-grab active:cursor-grabbing"
                    onClick={() => {
                      if (minimizedWindows[app.action]) {
                        restoreWindow(app.action);
                      } else {
                        toggleWindow(app.action, app.subAction);
                      }
                      playSystemSound('switch');
                    }}
                  >
                    <div
                      className={`${responsiveScale.containerSize} flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 transition-all duration-200 mx-auto`}
                      onDoubleClick={() => {
                        if (minimizedWindows[app.action]) {
                          restoreWindow(app.action);
                        } else {
                          toggleWindow(app.action, app.subAction);
                        }
                        playSystemSound('switch');
                      }}
                    >
                      {app.isIconFont ? (
                        <div className={`${responsiveScale.iconSize} flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg`}>
                          <span className={`material-symbols-outlined text-white ${app.iconColor || ''} text-2xl`}>
                            {app.icon}
                          </span>
                        </div>
                      ) : (
                        <img
                          src={app.icon}
                          alt={app.name}
                          className={`${responsiveScale.iconSize} object-contain`}
                          onDragStart={(e) => e.preventDefault()}
                        />
                      )}
                      <div className={`${responsiveScale.textSize} text-center select-none mt-1 truncate w-full`}>
                        {app.name}
                      </div>
                    </div>
                  </Win11DesktopIcon>
                ))}
              </Win11StaggeredList>
            </div>
          ) : (
            // Desktop layout
            <>
              {/* Left side apps */}
              <Win11StaggeredList className={`flex flex-col gap-[0.92rem] absolute top-4 left-4`}>
                {appsData.filter(app => !['explorer', 'contactme', 'linkedin', 'github'].includes(app.action)).map((app) => (
                  <Win11DesktopIcon
                    key={app.id}
                    className="cursor-grab active:cursor-grabbing"
                    onClick={() => {
                      if (minimizedWindows[app.action]) {
                        restoreWindow(app.action);
                      } else {
                        toggleWindow(app.action, app.subAction);
                      }
                      playSystemSound('switch');
                    }}
                  >
                    <div
                      className={`${responsiveScale.containerSize} flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 transition-all duration-200 mx-auto`}
                      onDoubleClick={() => {
                        // If app is minimized, restore it; otherwise toggle normally
                        if (minimizedWindows[app.action]) {
                          restoreWindow(app.action);
                        } else {
                          toggleWindow(app.action, app.subAction);
                        }
                        
                        playSystemSound('switch');
                        if (!windows11Features.focusAssist) {
                          const actionText = minimizedWindows[app.action] ? 'restored' : windows[app.action] ? 'minimized' : 'opened';
                          addNotification(
                            app.name, 
                            `${app.name} ${actionText}`,
                            app.name === 'VS Code' ? '💻' : '📁'
                          );
                        }
                      }}
                    >
                      <img
                        src={app.icon}
                        alt={app.name}
                        className={`${responsiveScale.iconSize} object-contain`}
                        onDragStart={(e) => e.preventDefault()}
                      />
                      <div
                        className={`text-balance text-center ${responsiveScale.textSize} select-none ${
                          app.name === "Recycle Bin" ? "pt-0" : "pt-1"
                        }`}
                      >
                        {app.name}
                      </div>
                    </div>
                  </Win11DesktopIcon>
                ))}
              </Win11StaggeredList>
              
              {/* Right side apps */}
              <Win11StaggeredList className={`flex flex-col ${responsiveScale.gap} absolute top-2 right-3`}>
                {appsData.filter(app => ['explorer', 'contactme', 'linkedin', 'github'].includes(app.action)).map((app, index) => (
                  <Win11DesktopIcon
                    key={app.id}
                    className="cursor-grab active:cursor-grabbing"
                    onClick={() => {
                      if (minimizedWindows[app.action]) {
                        restoreWindow(app.action);
                      } else {
                        toggleWindow(app.action, app.subAction);
                      }
                      playSystemSound('switch');
                    }}
                    dragMomentum={false}
                    whileHover={{ scale: windows11Features.animationsEnabled ? 1.05 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div
                      className={`${responsiveScale.containerSize} flex flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 mx-auto`}
                      onDoubleClick={() => {
                        if (minimizedWindows[app.action]) {
                          restoreWindow(app.action);
                        } else {
                          toggleWindow(app.action, app.subAction);
                        }
                        playSystemSound('switch');
                      }}
                    >
                      <img
                        src={app.icon}
                        alt={app.name}
                        className={`${responsiveScale.iconSize} object-contain`}
                        onDragStart={(e) => e.preventDefault()}
                      />
                      <div
                        className={`text-balance text-center ${responsiveScale.textSize} select-none ${
                          app.name === "Recycle Bin" ? "pt-0" : "pt-1"
                        }`}
                      >
                        {app.name}
                      </div>
                    </div>
                  </Win11DesktopIcon>
                ))}
              </Win11StaggeredList>
            </>
          )}
          <div className="absolute right-3 bottom-2">
            <div
              className="w-[5em] h-full flex-col justify-center items-center rounded-md hover:bg-white hover:bg-opacity-20 p-2 select-none hidden"
              onDoubleClick={() => toggleWindow("app", "terminal")}
            >
              <img
                src="images/apps/terminal.png"
                alt="terminal"
                className="w-10 h-10"
              />
              <div className="text-balance text-center text-sm select-none pt-2">
                Terminal
              </div>
            </div>
          </div>
        </div>
        <div
          className={`absolute top-0 flex justify-center items-center w-full h-full`}
        >
          <StartMenu
            isStartOpen={windows.start}
            toggleStart={() => toggleWindow("start")}
            setInput={setInput}
            setIsSleeping={setIsSleeping}
            setActionType={setActionType}
          />
          <Browser
            isAppOpen={windows.browser}
            toggleBrowser={() => toggleWindow("browser")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.browser}
          />
          <Explorer
            isExplorerOpen={windows.explorer}
            toggleExplorer={(input) => toggleWindow("explorer", input)}
            aboutMe={aboutMe}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.explorer}
          />
          <RecycleBin
            isRecycleOpen={windows.recycle}
            toggleRecycle={() => toggleWindow("recycle")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.recycle}
          />
          <VsCode
            isAppOpen={windows.vscode}
            toggleVsCode={() => toggleWindow("vscode")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.vscode}
          />
          <Apps
            isAppOpen={windows.app}
            toggleApp={(input) => toggleWindow("app", input)}
            bounds={bounds}
            input={input}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.app}
          />
          <Pictures
            isAppOpen={windows.pictures}
            togglePictures={() => toggleWindow("pictures")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.pictures}
          />
          <Notepad
            isAppOpen={windows.notepad}
            toggleNotepad={() => toggleWindow("notepad")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.notepad}
          />
          <ContactMe
            isContactMeOpen={windows.contactme}
            toggleContactMe={() => toggleWindow("contactme")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.contactme}
          />
          <LinkedIn
            isAppOpen={windows.linkedin}
            toggleLinkedIn={() => toggleWindow("linkedin")}
          />
          <GitHub
            isAppOpen={windows.github}
            toggleGitHub={() => toggleWindow("github")}
          />
          <Videos
            isAppOpen={windows.videos}
            toggleVideos={() => toggleWindow("videos")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.videos}
          />
        </div>
        <Taskbar
          toggleStart={() => toggleWindow("start")}
          toggleExplorer={(input) => toggleWindow("explorer", input)}
          toggleBrowser={() => toggleWindow("browser")}
          toggleQuickSettings={() => setShowQuickSettings(prev => !prev)}
          toggleSystemTray={() => setShowSystemTray(prev => !prev)}
          windows11Features={windows11Features}
          addNotification={addNotification}
          windows={windows}
          minimizedWindows={minimizedWindows}
          restoreWindow={restoreWindow}
          screenSize={screenSize}
          toggleSound={toggleSound}
          isSoundMuted={isSoundMuted}
          soundVolume={soundVolume}
          adjustVolume={adjustVolume}
        />
      </div>
      <Slider
        isMenuOpen={windows.menu}
        setIsMenuOpen={() => toggleWindow("menu")}
        toggleMenu={() => toggleWindow("menu")}
      />
    </motion.div>
  );
}

export default Main;

import React, { useEffect, useMemo, useState } from "react";
import Explorer from "../components/apps/Explorer";
import Taskbar from "../components/layout/Taskbar";
import RightClick from "../components/utilities/RightClick";
import StartMenu from "../components/layout/StartMenu";
import Browser from "../components/apps/Browser";
import Calculator from "../components/apps/Calculator";
import VsCode from "../components/apps/VsCode";
import Slider from "../components/utilities/Slider";
import RecycleBin from "../components/apps/RecycleBin";
import Apps from "../components/apps/Apps";
import Torch from "../components/apps/Torch";
import Pictures from "../components/apps/Pictures";
import ContactMe from "../components/apps/ContactMe";
import LinkedIn from "../components/apps/LinkedIn";
import PortfolioChatbot from "../components/apps/PortfolioChatbot";
import SnapLayouts from "../components/utilities/SnapLayouts";
import QuickSettings from "../components/utilities/QuickSettings";
import SystemTray from "../components/utilities/SystemTray";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import appsData from "../data/data";
import soundManager from '../utils/soundManager';
import SoundEffects from '../components/SoundEffects';
import { win11Variants, win11Duration, win11Easing } from '../utils/win11Animations';
import { 
  Win11Window, 
  Win11TaskbarItem, 
  Win11DesktopIcon, 
  Win11Panel,
  Win11Notification,
  Win11StaggeredList,
  Win11GlassContainer
} from '../components/Win11Components';
import VideoBackground from '../components/utilities/VideoBackground';

function Main({ isMobile = false }) {
  const constraintsRef = useRef(null);
  const [isSleeping, setIsSleeping] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [actionType, setActionType] = useState(null);

  const [windows, setWindows] = useState({
    menu: false,
    start: false,
    explorer: false,
    browser: false,
    calculator: false,
    vscode: false,
    recycle: false,
    app: false,
    pictures: false,
    contactme: false,
    linkedin: false,
    chatbot: false,
    widgets: false,
    notifications: false,
    quickSettings: false,
  });

  // Minimized windows state
  const [minimizedWindows, setMinimizedWindows] = useState({
    explorer: false,
    browser: false,
    calculator: false,
    vscode: false,
    recycle: false,
    app: false,
    pictures: false,
    contactme: false,
    linkedin: false,
    chatbot: false,
  });

  // Windows 11 Features State
  const [windows11Features, setWindows11Features] = useState({
    focusAssist: false,
    darkMode: true,
    notifications: [],
    widgets: {
      weather: { temp: '22°C', condition: 'Sunny', location: 'Your City' },
      calendar: { date: new Date().toDateString(), events: ['Portfolio Review'] },
      news: ['Portfolio getting great reviews!', 'New job opportunities available']
    },
    systemSounds: true,
    animationsEnabled: true,
  });

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
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
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

  const toggleWindow = (window, input = null) => {
    // Special handling for LinkedIn - always open and immediately close
    if (window === 'linkedin') {
      if (!windows.linkedin) {
        soundManager.play('windowOpen');
        setWindows(prev => ({
          ...prev,
          linkedin: true
        }));
      } else {
        // If already open, just close it
        soundManager.play('windowClose');
        setWindows(prev => ({
          ...prev,
          linkedin: false
        }));
      }
      return;
    }
    
    // If window is minimized, restore it
    if (minimizedWindows[window]) {
      soundManager.play('windowOpen');
      restoreWindow(window);
      return;
    }
    
    // If window is open, check if clicking same app should minimize or close
    if (windows[window]) {
      // Special handling for "app" window - always update input even if open
      if (window === "app" && input !== null) {
        setInput(input);
        soundManager.play('buttonClick'); // Different sound for switching apps
        return;
      }
      
      // For apps that support minimizing, minimize instead of close
      const minimizableApps = ['explorer', 'browser', 'calculator', 'vscode', 'recycle', 'app', 'pictures', 'contactme', 'chatbot'];
      if (minimizableApps.includes(window)) {
        soundManager.play('minimize');
        minimizeWindow(window);
        return;
      } else {
        soundManager.play('windowClose');
      }
    } else {
      soundManager.play('windowOpen');
    }
    
    setWindows({
      menu: false,
      start: false,
      explorer: false,
      browser: false,
      calculator: false,
      vscode: false,
      recycle: false,
      app: false,
      pictures: false,
      contactme: false,
      linkedin: false,
      chatbot: false,
      widgets: false,
      notifications: false,
      quickSettings: false,
      [window]: !windows[window],
    });

    if (window === "explorer" && input !== null) {
      setAboutMe(input);
    } else if (window === "app" && input !== null) {
      setInput(input);
    }
  };

  // Responsive screen size detection
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isSmallDesktop: window.innerWidth >= 1024 && window.innerWidth < 1440,
    isLargeDesktop: window.innerWidth >= 1440
  });

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isSmallDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive scaling calculations
  const getResponsiveScale = () => {
    if (screenSize.isMobile) return { iconSize: 'w-8 h-8', containerSize: 'w-12 h-12', textSize: 'text-xs', gap: 'gap-2' };
    if (screenSize.isTablet) return { iconSize: 'w-10 h-10', containerSize: 'w-16 h-16', textSize: 'text-sm', gap: 'gap-3' };
    if (screenSize.isSmallDesktop) return { iconSize: 'w-12 h-12', containerSize: 'w-18 h-18', textSize: 'text-sm', gap: 'gap-4' };
    return { iconSize: 'w-14 h-14', containerSize: 'w-20 h-20', textSize: 'text-base', gap: 'gap-6' };
  };

  const responsiveScale = getResponsiveScale();

  const screenWidth = screenSize.width;
  const screenHeight = screenSize.height;
  const bounds = {
    left: screenSize.isMobile ? -10 : -50,
    top: screenSize.isMobile ? -10 : -50,
    right: screenWidth - (screenSize.isMobile ? 20 : 100),
    bottom: screenHeight - (screenSize.isMobile ? 60 : 100),
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

  // Windows 11 System Sounds
  const playSystemSound = (soundType) => {
    if (!windows11Features.systemSounds) return;
    
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
  };

  // Toggle Windows 11 Features
  const toggleWindows11Feature = (feature) => {
    setWindows11Features(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
    
    if (feature === 'focusAssist') {
      playSystemSound(windows11Features.focusAssist ? 'notification' : 'focus');
    }
  };

  // Minimize window function
  const minimizeWindow = (windowName) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [windowName]: true
    }));
    
    // Keep window state true but hide it
    playSystemSound('switch');
    
    if (!windows11Features.focusAssist) {
      addNotification(
        'Window Minimized', 
        `${windowName.charAt(0).toUpperCase() + windowName.slice(1)} minimized to taskbar`,
        '➖'
      );
    }
  };

  // Restore window function
  const restoreWindow = (windowName) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [windowName]: false
    }));
    
    // Ensure window is open
    if (!windows[windowName]) {
      toggleWindow(windowName);
    }
    
    playSystemSound('switch');
  };

  // Add Windows 11 notification
  const addNotification = (title, message, icon = '💼') => {
    const newNotification = {
      id: Date.now(),
      title,
      message,
      icon,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setWindows11Features(prev => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications.slice(0, 4)] // Keep last 5
    }));
    
    playSystemSound('notification');
  };

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
  }, [images.length]);

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
  }, []);

  // Konami Code Easter Egg
  useEffect(() => {
    const handleKeyDown = (event) => {
      const newSequence = [...konamiSequence, event.code].slice(-konamiCode.length);
      setKonamiSequence(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
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
  }, [konamiSequence, konamiCode, easterEggs.konamiActivated]);

  // Developer Mode Easter Egg (Ctrl+Shift+D)
  useEffect(() => {
    const handleDevMode = (event) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyD') {
        event.preventDefault();
        setEasterEggs(prev => ({ ...prev, developerMode: !prev.developerMode }));
        console.log(prev => prev.developerMode ? '🚀 Developer mode activated!' : '💻 Welcome to the Matrix!');
      }
    };

    window.addEventListener('keydown', handleDevMode);
    return () => window.removeEventListener('keydown', handleDevMode);
  }, []);

  // Windows 11 Keyboard Shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (event) => {
      // Win + A for Action Center (Quick Settings)
      if (event.code === 'KeyA' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setShowQuickSettings(prev => !prev);
        playSystemSound('switch');
      }
      
      // Win + W for Widgets
      if (event.code === 'KeyW' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleWindow('widgets');
        playSystemSound('switch');
      }
      
      // Win + Z for Snap Layouts
      if (event.code === 'KeyZ' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setShowSnapLayouts(prev => !prev);
        playSystemSound('switch');
      }
      
      // Win + N for Notifications
      if (event.code === 'KeyN' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleWindow('notifications');
        playSystemSound('notification');
      }
    };

    window.addEventListener('keydown', handleKeyboardShortcuts);
    return () => window.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);
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
      <div className="relative h-screen" ref={constraintsRef}>
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
          
          {/* Windows 11 Widgets Panel */}
          {windows.widgets && (
            <div className={`fixed left-0 top-0 h-full bg-black bg-opacity-95 z-50 backdrop-blur-md border-r border-gray-600 transition-all duration-300 ease-in-out ${
              screenSize.isMobile ? 'w-full' : screenSize.isTablet ? 'w-80' : 'w-96'
            }`}>
              <div className="p-6 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Widgets</h2>
                  <button 
                    onClick={() => toggleWindow('widgets')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Weather Widget */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 mb-4 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">{windows11Features.widgets.weather.temp}</div>
                      <div className="text-sm opacity-80">{windows11Features.widgets.weather.condition}</div>
                      <div className="text-xs opacity-60">{windows11Features.widgets.weather.location}</div>
                    </div>
                    <div className="text-4xl">☀️</div>
                  </div>
                </div>
                
                {/* Calendar Widget */}
                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  <div className="text-white font-semibold mb-2">📅 Calendar</div>
                  <div className="text-sm text-gray-300 mb-2">{windows11Features.widgets.calendar.date}</div>
                  {windows11Features.widgets.calendar.events.map((event, idx) => (
                    <div key={idx} className="text-xs text-blue-400 bg-blue-900 bg-opacity-30 rounded px-2 py-1 mb-1">
                      {event}
                    </div>
                  ))}
                </div>
                
                {/* Portfolio News Widget */}
                <div className="bg-gray-800 rounded-xl p-4">
                  <div className="text-white font-semibold mb-2">📰 Portfolio News</div>
                  {windows11Features.widgets.news.map((news, idx) => (
                    <div key={idx} className="text-sm text-gray-300 mb-2 p-2 bg-gray-700 rounded">
                      {news}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Windows 11 Notification Center */}
          {windows.notifications && (
            <div className={`fixed right-0 top-0 h-full bg-black bg-opacity-95 z-50 backdrop-blur-md border-l border-gray-600 transition-all duration-300 ease-in-out ${
              screenSize.isMobile ? 'w-full' : screenSize.isTablet ? 'w-80' : 'w-96'
            }`}>
              <div className="p-6 h-full overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Notifications</h2>
                  <button 
                    onClick={() => toggleWindow('notifications')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Focus Assist Toggle */}
                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-semibold">🎯 Focus Assist</div>
                      <div className="text-sm text-gray-400">Minimize distractions</div>
                    </div>
                    <button
                      onClick={() => toggleWindows11Feature('focusAssist')}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        windows11Features.focusAssist ? 'bg-blue-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                        windows11Features.focusAssist ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
                
                {/* Notifications List */}
                <Win11StaggeredList className="space-y-3">
                  {windows11Features.notifications.length > 0 ? (
                    windows11Features.notifications.map((notification) => (
                      <Win11Notification 
                        key={notification.id} 
                        isVisible={true}
                        className="relative bg-win11-surface border border-win11-border rounded-xl p-4 border-l-4 border-win11-accent backdrop-blur-xl"
                      >
                        <div className="flex items-start gap-3">
                          <motion.div 
                            className="text-2xl"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ 
                              duration: win11Duration.normal,
                              ease: win11Easing.fluent,
                              delay: 0.2 
                            }}
                          >
                            {notification.icon}
                          </motion.div>
                          <div className="flex-1">
                            <div className="text-win11-text font-semibold text-sm">{notification.title}</div>
                            <div className="text-win11-text-secondary text-xs">{notification.message}</div>
                            <div className="text-win11-text-disabled text-xs mt-1">{notification.timestamp}</div>
                          </div>
                        </div>
                      </Win11Notification>
                    ))
                  ) : (
                    <motion.div 
                      className="text-center text-win11-text-secondary py-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: win11Duration.normal, ease: win11Easing.fluent }}
                    >
                      <motion.div 
                        className="text-4xl mb-2"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          ease: win11Easing.standard 
                        }}
                      >
                        🔔
                      </motion.div>
                      <div>No new notifications</div>
                    </motion.div>
                  )}
                </Win11StaggeredList>
              </div>
            </div>
          )}
          
          {/* Focus Assist Indicator */}
          <AnimatePresence>
            {windows11Features.focusAssist && (
              <Win11Notification
                isVisible={true}
                className="top-4 right-20 bg-win11-accent text-win11-accent-text px-4 py-2 rounded-lg shadow-xl animate-win11-glow"
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
            windows11Features={windows11Features}
            addNotification={addNotification}
          />
          {/* Desktop Apps Layout - Fully Responsive */}
          {screenSize.isMobile ? (
            // Mobile layout - Compact grid
            <div className="fixed bottom-16 left-0 right-0 p-2">
              <Win11StaggeredList className={`grid gap-2 mx-auto max-w-full ${
                screenSize.width < 480 ? 'grid-cols-6' : 'grid-cols-8'
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
              <Win11StaggeredList className={`grid grid-rows-8 ${responsiveScale.gap} absolute top-2 left-2 h-[calc(100vh-120px)]`}>
                {appsData.filter(app => !['explorer', 'contactme', 'linkedin'].includes(app.action)).map((app, index) => (
                  <Win11DesktopIcon
                    key={app.id}
                    className={`row-start-${index + 1} cursor-grab active:cursor-grabbing`}
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
                            app.name === 'Calculator' ? '📱' : app.name === 'VS Code' ? '💻' : '📁'
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
                {appsData.filter(app => ['explorer', 'contactme', 'linkedin'].includes(app.action)).map((app, index) => (
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
          <Calculator
            isAppOpen={windows.calculator}
            toggleCalculator={() => toggleWindow("calculator")}
            bounds={bounds}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.calculator}
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
          <PortfolioChatbot
            isOpen={windows.chatbot}
            onClose={() => toggleWindow("chatbot")}
            minimizeWindow={minimizeWindow}
            isMinimized={minimizedWindows.chatbot}
          />
        </div>
        <Taskbar
          toggleStart={() => toggleWindow("start")}
          toggleExplorer={(input) => toggleWindow("explorer", input)}
          toggleBrowser={() => toggleWindow("browser")}
          toggleCalculator={() => toggleWindow("calculator")}
          toggleChatbot={() => toggleWindow("chatbot")}
          toggleWidgets={() => toggleWindow("widgets")}
          toggleNotifications={() => toggleWindow("notifications")}
          toggleQuickSettings={() => setShowQuickSettings(prev => !prev)}
          toggleSystemTray={() => setShowSystemTray(prev => !prev)}
          windows11Features={windows11Features}
          addNotification={addNotification}
          windows={windows}
          minimizedWindows={minimizedWindows}
          restoreWindow={restoreWindow}
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

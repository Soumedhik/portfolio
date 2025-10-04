import React, { useState, useEffect } from "react";
import VolumeControl from '../taskbar/VolumeControl';

export default function Taskbar({
  toggleStart,
  toggleExplorer,
  toggleBrowser,
  windows11Features,
  addNotification,
  toggleQuickSettings,
  toggleSystemTray,
  windows,
  minimizedWindows,
  restoreWindow,
  screenSize,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  const layout = screenSize ?? {};
  const isMobile = layout.isMobile ?? false;
  const isTablet = layout.isTablet ?? false;
  const isMobileLandscape = layout.isMobileLandscape ?? false;
  const mobilePortrait = isMobile && !isMobileLandscape;
  const showExpandedSystemArea = !mobilePortrait;

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);
        
  const formatDate = (date) => {
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString([], options).replace(/^0/, "");
  };

  const formatTime = (time) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    return time.toLocaleTimeString([], options);
  };
  const handleKeyActivate = (event, callback) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      callback(event);
    }
  };

  const handleExplorerInteraction = () => {
    if (minimizedWindows.explorer) {
      restoreWindow('explorer');
    } else {
      toggleExplorer(true);
    }
  };

  const handleBrowserInteraction = () => {
    if (minimizedWindows.browser) {
      restoreWindow('browser');
    } else {
      toggleBrowser();
    }
  };

  const handleSystemStatusInteraction = (event) => {
    if (event.shiftKey) {
      toggleSystemTray();
      return;
    }

    toggleQuickSettings();
    addNotification('System Status', 'All systems running smoothly! 🚀', '⚙️');
  };

  const triggerTimeAlert = () => {
    const now = new Date();
    const timeMessages = [
      `⏰ It's ${formatTime(now)}! Time flies!`,
      `📅 Today is ${formatDate(now)}`,
      `🌟 Every second counts!`,
      `⚡ Time waits for no one!`,
      `🎯 Make every moment count!`
    ];
    const randomMsg = timeMessages[Math.floor(Math.random() * timeMessages.length)];
    alert(randomMsg);
  };

  return (
    <>
      <div className={`fixed bottom-0 flex justify-center items-center w-full select-none pointer-events-auto z-40 glass-taskbar ${
        mobilePortrait ? 'h-8 py-0.5' : isMobileLandscape ? 'h-10 py-1' : isTablet ? 'h-14 py-1' : 'h-[3.2rem] py-[0.2rem]'
      }`} style={{
        color: 'var(--w11-text-primary)'
      }}>
        {/* Left Section - Widgets */}
        {/* Center Section - Main App Icons */}
  <div className={`flex justify-center items-center ${mobilePortrait ? 'gap-0.5' : isMobileLandscape ? 'gap-1.5' : 'gap-0'}`}>
          <div
            className={`icon-container win11-icon-shell font-semibold my-1 h-full ${
              mobilePortrait ? 'px-0.5 w-6' : isMobileLandscape ? 'px-1.5 w-12' : isTablet ? 'px-1 w-11' : 'px-1 w-11'
            }`}
            onClick={toggleStart}
            onKeyDown={(event) => handleKeyActivate(event, () => toggleStart())}
            role="button"
            tabIndex={0}
            aria-label="Open Start menu"
            title="Start"
          >
            <img
              src="/images/apps/windows.png"
              alt="windows_logo"
              className={`taskbar-icon ${mobilePortrait ? 'h-3' : isMobileLandscape ? 'h-5' : isTablet ? 'h-6' : 'h-8'}`}
              style={{ imageRendering: 'auto' }}
            />
          </div>
          <div
            className={`icon-container font-semibold text-sm my-1 h-full relative ${
              windows.explorer ? (minimizedWindows.explorer ? 'glass-minimized' : 'glass-active') : 'win11-icon-shell'
            } ${mobilePortrait ? 'px-0.5 w-6' : isMobileLandscape ? 'px-1.5 w-12' : 'px-1 w-11'}`}
            onClick={handleExplorerInteraction}
            onKeyDown={(event) => handleKeyActivate(event, handleExplorerInteraction)}
            role="button"
            tabIndex={0}
            aria-label={minimizedWindows.explorer ? 'Restore File Explorer window' : 'Open File Explorer'}
            aria-pressed={windows.explorer && !minimizedWindows.explorer}
            title={minimizedWindows.explorer ? 'File Explorer (Minimized) - Click to restore' : 'File Explorer'}
          >
            <img
              src="/images/apps/explorer.png"
              alt="File Explorer"
              className={`taskbar-icon ${mobilePortrait ? 'h-3' : isMobileLandscape ? 'h-5' : isTablet ? 'h-5' : 'h-7'}`}
              style={{ imageRendering: 'auto' }}
            />
          </div>
          <div
            className={`icon-container font-semibold text-sm my-1 h-full relative ${
              windows.browser ? (minimizedWindows.browser ? 'glass-minimized' : 'glass-active') : 'win11-icon-shell'
            } ${mobilePortrait ? 'px-0.5 w-6' : isMobileLandscape ? 'px-1.5 w-12' : 'px-1 w-11'}`}
            onClick={handleBrowserInteraction}
            onKeyDown={(event) => handleKeyActivate(event, handleBrowserInteraction)}
            role="button"
            tabIndex={0}
            aria-label={minimizedWindows.browser ? 'Restore Browser window' : 'Open Browser'}
            aria-pressed={windows.browser && !minimizedWindows.browser}
            title={minimizedWindows.browser ? 'Microsoft Edge (Minimized) - Click to restore' : 'Microsoft Edge'}
          >
            <img
              src="/images/apps/edge.png"
              alt="Microsoft Edge"
              className={`taskbar-icon ${mobilePortrait ? 'h-3' : isMobileLandscape ? 'h-5' : isTablet ? 'h-6' : 'h-8'}`}
              style={{ imageRendering: 'auto' }}
            />
          </div>
        </div>
        
        {/* Right Section - System Tray */}
        <div className="absolute right-4 flex items-center">
          <div className={`flex justify-center items-center ${mobilePortrait ? 'gap-0.5' : isMobileLandscape ? 'gap-1.5' : 'gap-0'}`}>
            {showExpandedSystemArea && (
              <div
                className={`material-symbols-outlined h-full flex justify-center items-center rotate-180 win11-icon-shell glass-system-icon font-light cursor-pointer ${
                  isTablet ? 'w-6 text-sm' : isMobileLandscape ? 'w-8 text-base' : 'w-8'
                }`}
                onClick={toggleSystemTray}
                onKeyDown={(event) => handleKeyActivate(event, () => toggleSystemTray())}
                role="button"
                tabIndex={0}
                aria-label="Toggle system tray"
                title="System tray - Performance & system information"
              >
                expand_more
              </div>
            )}
            {/* System Status with Windows 11 Features - Responsive */}
            {showExpandedSystemArea && (
              <div
                className={`my-1 h-full flex justify-center items-center win11-icon-shell cursor-pointer ${
                  isTablet ? 'gap-x-1 px-1' : isMobileLandscape ? 'gap-x-2 px-2' : 'gap-x-1.5 px-2'
                }`}
                onClick={handleSystemStatusInteraction}
                onKeyDown={(event) => handleKeyActivate(event, handleSystemStatusInteraction)}
                role="button"
                tabIndex={0}
                aria-label="System status"
                title="System status - Click to open Quick Settings (Shift+click for System Tray)"
              >
                <div
                  className={`material-symbols-outlined transition-colors ${
                    isTablet ? 'text-xs' : 'text-sm'
                  } ${windows11Features.systemSounds ? 'text-blue-400' : 'text-gray-500'}`}
                >
                  wifi
                </div>
                <VolumeControl className={isTablet || isMobileLandscape ? 'scale-90' : ''} />
                <div
                  className={`material-symbols-outlined text-yellow-400 ${
                    isTablet ? 'text-sm' : isMobileLandscape ? 'text-base' : 'text-lg'
                  }`}
                >
                  battery_full
                </div>
                {/* Focus Assist Indicator */}
                {windows11Features.focusAssist && (
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" title="Focus Assist Active"></div>
                )}
              </div>
            )}
            <div
              className={`flex justify-center items-center font-semibold my-1 h-full win11-icon-shell ${
                mobilePortrait ? 'text-[8px] px-0.5' : isMobileLandscape ? 'text-[10px] px-1.5' : isTablet ? 'text-xs px-1.5' : 'text-sm px-2'
              }`}
            >
              <div
                className={`flex flex-col items-end cursor-pointer ${
                  mobilePortrait ? 'text-[0.55em]' : isMobileLandscape ? 'text-[0.75em] ml-0.5' : isTablet ? 'text-[0.70em] ml-0.5' : 'text-[0.80em] ml-1'
                }`}
                onClick={triggerTimeAlert}
                onKeyDown={(event) => handleKeyActivate(event, () => triggerTimeAlert())}
                role="button"
                tabIndex={0}
                aria-label="Show time inspiration"
                title="Click for wisdom! ⏰"
              >
                <div>{formatTime(currentTime)}</div>
                {!mobilePortrait && <div>{formatDate(currentTime)}</div>}
              </div>
            </div>
            <div className="group w-3 h-full flex justify-center items-center">
              <button className="hidden group-hover:block text-neutral-400 text-md h-full w-full pointer-events-none">
                |
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

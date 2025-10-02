import React, { useState, useEffect } from "react";
import VolumeControl from '../taskbar/VolumeControl';

export default function Taskbar({
  toggleStart,
  toggleExplorer,
  toggleBrowser,
  toggleCalculator,
  toggleChatbot,
  toggleWidgets,
  toggleNotifications,
  windows11Features,
  addNotification,
  toggleQuickSettings,
  toggleSystemTray,
  windows,
  minimizedWindows,
  restoreWindow,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

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
  // Responsive design detection
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={`fixed bottom-0 flex justify-between w-full select-none pointer-events-auto z-40 ${
        isMobile ? 'h-12 py-1' : isTablet ? 'h-14 py-1' : 'h-[3.2rem] py-[0.2rem]'
      }`} style={{backgroundColor: 'var(--w11-bg-secondary)', borderTop: '0.2px solid var(--w11-border)', color: 'var(--w11-text-primary)'}}>
        {/* Widgets Button - Hide on mobile */}
        {!isMobile && (
          <div className="flex items-center pl-4">
            <div
              className={`flex justify-center items-center font-semibold my-1 h-full rounded-md transition-colors duration-200 cursor-pointer hover:bg-white hover:bg-opacity-10 ${
                isTablet ? 'text-xs px-1' : 'text-sm px-2'
              }`}
              onClick={toggleWidgets}
              title="Widgets"
            >
              <div className="flex items-center gap-1">
                <div className={`bg-blue-400 rounded-sm ${isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
                <div className={`bg-green-400 rounded-sm ${isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
                <div className={`bg-orange-400 rounded-sm ${isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
                <div className={`bg-red-400 rounded-sm ${isTablet ? 'w-1.5 h-1.5' : 'w-2 h-2'}`}></div>
              </div>
            </div>
          </div>
        )}
        <div className={`flex justify-center w-auto items-center ${isMobile ? 'gap-1' : 'gap-0'}`}>
          <div
            className={`flex justify-center items-center font-semibold my-1 h-full rounded-md transition-colors duration-200 cursor-pointer ${
              isMobile ? 'px-0.5 w-8' : isTablet ? 'px-1 w-9' : 'px-1 w-11'
            }`}
            onClick={toggleStart}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--w11-surface-hover)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <img
              src="/images/apps/windows.png"
              alt="windows_logo"
              className={isMobile ? 'h-5' : isTablet ? 'h-6' : 'h-8'}
            />
          </div>
          <div
            className={`flex justify-center items-center font-semibold text-sm my-1 h-full rounded-md px-1 w-11 transition-all duration-200 relative ${
              windows.explorer ? (minimizedWindows.explorer ? 'bg-blue-600 bg-opacity-50 hover:bg-opacity-70' : 'bg-blue-600 hover:bg-blue-500') : 'hover:bg-neutral-700'
            }`}
            onClick={() => {
              if (minimizedWindows.explorer) {
                restoreWindow('explorer');
              } else {
                toggleExplorer(true);
              }
            }}
            title={minimizedWindows.explorer ? 'File Explorer (Minimized) - Click to restore' : 'File Explorer'}
          >
            <img
              src="/images/apps/explorer.png"
              alt="File Explorer"
              className={isMobile ? 'h-4' : isTablet ? 'h-5' : 'h-7'}
            />
            {/* Active indicator */}
            {windows.explorer && (
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-t ${
                minimizedWindows.explorer ? 'bg-blue-300' : 'bg-white'
              }`} />
            )}
          </div>
          <div
            className={`flex justify-center items-center font-semibold text-sm my-1 h-full rounded-md px-1 w-11 transition-all duration-200 relative ${
              windows.browser ? (minimizedWindows.browser ? 'bg-blue-600 bg-opacity-50 hover:bg-opacity-70' : 'bg-blue-600 hover:bg-blue-500') : 'hover:bg-neutral-700'
            }`}
            onClick={() => {
              if (minimizedWindows.browser) {
                restoreWindow('browser');
              } else {
                toggleBrowser();
              }
            }}
            title={minimizedWindows.browser ? 'Microsoft Edge (Minimized) - Click to restore' : 'Microsoft Edge'}
          >
            <img
              src="/images/apps/edge.png"
              alt="Microsoft Edge"
              className={isMobile ? 'h-4' : isTablet ? 'h-6' : 'h-8'}
            />
            {/* Active indicator */}
            {windows.browser && (
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-t ${
                minimizedWindows.browser ? 'bg-blue-300' : 'bg-white'
              }`} />
            )}
          </div>
          
          {/* Calculator App */}
          <div
            className={`flex justify-center items-center font-semibold text-sm my-1 h-full rounded-md px-1 w-11 transition-all duration-200 relative ${
              windows.calculator ? (minimizedWindows.calculator ? 'bg-blue-600 bg-opacity-50 hover:bg-opacity-70' : 'bg-blue-600 hover:bg-blue-500') : 'hover:bg-neutral-700'
            }`}
            onClick={() => {
              if (minimizedWindows.calculator) {
                restoreWindow('calculator');
              } else {
                toggleCalculator();
              }
            }}
            title={minimizedWindows.calculator ? 'Calculator (Minimized) - Click to restore' : 'Calculator'}
          >
            <img
              src="/images/apps/calculator.png"
              alt="Calculator"
              className={isMobile ? 'h-4' : isTablet ? 'h-5' : 'h-7'}
            />
            {/* Active indicator */}
            {windows.calculator && (
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-t ${
                minimizedWindows.calculator ? 'bg-blue-300' : 'bg-white'
              }`} />
            )}
          </div>

          {/* AI Chatbot */}
          <div
            className={`flex justify-center items-center font-semibold text-sm my-1 h-full rounded-md px-1 w-11 transition-all duration-200 relative ${
              windows.chatbot ? (minimizedWindows.chatbot ? 'bg-purple-600 bg-opacity-50 hover:bg-opacity-70' : 'bg-purple-600 hover:bg-purple-500') : 'hover:bg-neutral-700'
            }`}
            onClick={() => {
              if (minimizedWindows.chatbot) {
                restoreWindow('chatbot');
              } else {
                toggleChatbot();
              }
            }}
            title={minimizedWindows.chatbot ? 'AI Assistant (Minimized) - Click to restore' : 'AI Assistant'}
          >
            <div className={`rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center ${
              isMobile ? 'w-4 h-4' : isTablet ? 'w-5 h-5' : 'w-7 h-7'
            }`}>
              <span className={`material-symbols-outlined text-white ${
                isMobile ? 'text-xs' : isTablet ? 'text-sm' : 'text-base'
              }`}>
                smart_toy
              </span>
            </div>
            {/* Active indicator */}
            {windows.chatbot && (
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-t ${
                minimizedWindows.chatbot ? 'bg-purple-300' : 'bg-white'
              }`} />
            )}
          </div>
        </div>
        <div className={`flex justify-center items-center ${isMobile ? 'gap-1' : 'gap-0'}`}>
          {!isMobile && (
            <div 
              className={`material-symbols-outlined h-full flex justify-center items-center rounded-lg rotate-180 hover:bg-neutral-700 font-light cursor-pointer transition-colors ${
                isTablet ? 'w-6 text-sm' : 'w-8'
              }`}
              onClick={toggleSystemTray}
              title="System tray - Performance & system information"
            >
              expand_more
            </div>
          )}
          {/* System Status with Windows 11 Features - Responsive */}
          {!isMobile && (
            <div className={`hover:bg-neutral-700 my-1 h-full flex justify-center items-center rounded-lg cursor-pointer ${
              isTablet ? 'gap-x-1 px-1' : 'gap-x-1.5 px-2'
            }`}
                 onClick={(e) => {
                   if (e.shiftKey) {
                     toggleQuickSettings();
                   } else {
                     addNotification('System Status', 'All systems running smoothly! 🚀 (Shift+click for Quick Settings)', '⚙️');
                   }
                 }}
                 title="System status - Click for details (Shift+click for Quick Settings)">
              <div className={`material-symbols-outlined transition-colors ${
                isTablet ? 'text-xs' : 'text-sm'
              } ${windows11Features.systemSounds ? 'text-blue-400' : 'text-gray-500'}`}>wifi</div>
              <VolumeControl className={isTablet ? 'scale-90' : ''} />
              <div className={`material-symbols-outlined text-yellow-400 ${
                isTablet ? 'text-sm' : 'text-lg'
              }`}>
                battery_full
              </div>
              {/* Focus Assist Indicator */}
              {windows11Features.focusAssist && (
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" title="Focus Assist Active"></div>
              )}
            </div>
          )}
          <div className={`flex justify-center items-center font-semibold hover:bg-neutral-700 my-1 h-full rounded-lg ${
            isMobile ? 'text-xs px-1' : isTablet ? 'text-xs px-1.5' : 'text-sm px-2'
          }`}>
            <div 
              className={`flex flex-col items-end cursor-pointer ${
                isMobile ? 'text-[0.65em]' : isTablet ? 'text-[0.70em] ml-0.5' : 'text-[0.80em] ml-1'
              }`}
              onClick={() => {
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
              }}
              title="Click for wisdom! ⏰"
            >
              <div>{formatTime(currentTime)}</div>
              {!isMobile && <div>{formatDate(currentTime)}</div>}
            </div>
            <div 
              className={`material-symbols-outlined cursor-pointer hover:text-blue-400 transition-colors relative ${
                isMobile ? 'text-base ml-0.5' : isTablet ? 'text-lg ml-0.5' : 'text-xl ml-1'
              }`}
              onClick={(e) => {
                if (e.shiftKey) {
                  alert("🎉 You found the secret notification Easter egg! You must be a true explorer! 🔍");
                } else {
                  toggleNotifications();
                }
              }}
              title={windows11Features.notifications.length > 0 ? 
                `${windows11Features.notifications.length} new notifications` : 
                "Notification center (Shift+click for Easter egg) 🔔"
              }
            >
              notifications
              {/* Notification Badge */}
              {windows11Features.notifications.length > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold animate-pulse">
                  {windows11Features.notifications.length > 9 ? '9+' : windows11Features.notifications.length}
                </div>
              )}
            </div>
          </div>
          <div className="group w-3 h-full flex justify-center items-center">
            <button className="hidden group-hover:block text-neutral-400 text-md h-full w-full pointer-events-none">
              |
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

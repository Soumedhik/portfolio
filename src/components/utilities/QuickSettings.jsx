import React from "react";

const QuickSettings = ({ isOpen, onClose, windows11Features, toggleWindows11Feature, addNotification }) => {
  if (!isOpen) return null;

  const quickToggles = [
    {
      id: 'focusAssist',
      name: 'Focus Assist',
      icon: '🎯',
      description: 'Minimize distractions',
      active: windows11Features.focusAssist
    },
    {
      id: 'systemSounds',
      name: 'System Sounds',
      icon: '🔊',
      description: 'Audio feedback',
      active: windows11Features.systemSounds
    },
    {
      id: 'animationsEnabled',
      name: 'Animations',
      icon: '✨',
      description: 'Motion effects',
      active: windows11Features.animationsEnabled
    },
    {
      id: 'darkMode',
      name: 'Dark Mode',
      icon: '🌙',
      description: 'System theme',
      active: windows11Features.darkMode
    }
  ];

  const handleToggle = (featureId) => {
    toggleWindows11Feature(featureId);
    const feature = quickToggles.find(t => t.id === featureId);
    addNotification(
      'Settings Updated',
      `${feature.name} ${windows11Features[featureId] ? 'disabled' : 'enabled'}`,
      '⚙️'
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-end justify-center pb-20" onClick={onClose}>
      <div className="bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-600 w-80" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Quick Settings</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {quickToggles.map((toggle) => (
            <div
              key={toggle.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                toggle.active 
                  ? 'bg-blue-600 border-blue-500 text-white' 
                  : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => handleToggle(toggle.id)}
            >
              <div className="text-2xl mb-2">{toggle.icon}</div>
              <div className="font-medium text-sm">{toggle.name}</div>
              <div className="text-xs opacity-75">{toggle.description}</div>
            </div>
          ))}
        </div>
        
        {/* System Status */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="text-white font-medium mb-2">System Status</div>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex justify-between">
              <span>🔋 Battery</span>
              <span className="text-green-400">100%</span>
            </div>
            <div className="flex justify-between">
              <span>📶 Network</span>
              <span className="text-green-400">Connected</span>
            </div>
            <div className="flex justify-between">
              <span>🔊 Volume</span>
              <span className="text-green-400">75%</span>
            </div>
            <div className="flex justify-between">
              <span>💾 Storage</span>
              <span className="text-yellow-400">78% used</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-400 text-center mt-4">
          💡 Windows 11 Style Quick Controls
        </div>
      </div>
    </div>
  );
};

export default QuickSettings;
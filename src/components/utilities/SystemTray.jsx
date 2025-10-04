import React, { useState } from "react";

const SystemTray = ({ isVisible, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isVisible) return null;

  const systemInfo = {
    cpu: '65%',
    memory: '8.2 GB / 16 GB',
    disk: '256 GB / 512 GB SSD',
    network: 'WiFi Connected',
    uptime: '2 days, 14 hours'
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'performance', name: 'Performance', icon: '⚡' },
    { id: 'network', name: 'Network', icon: '🌐' },
    { id: 'processes', name: 'Apps', icon: '📱' }
  ];

    const runningProcesses = [
    { name: 'System', cpu: '1%', memory: '250 MB' },
    { name: 'Chrome', cpu: '5%', memory: '180 MB' },
    { name: 'VS Code', cpu: '3%', memory: '120 MB' },
    { name: 'Explorer', cpu: '1%', memory: '80 MB' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-gray-900 bg-opacity-95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-600 w-[500px] h-[400px]" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-xl font-semibold text-white">System Information</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-white border-b-2 border-blue-500 bg-gray-800'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-4 h-[280px] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-blue-400 text-sm font-medium">CPU Usage</div>
                  <div className="text-white text-lg">{systemInfo.cpu}</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-green-400 text-sm font-medium">Memory</div>
                  <div className="text-white text-lg">{systemInfo.memory}</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '51%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-3">
                <div className="text-yellow-400 text-sm font-medium mb-2">System Status</div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>💾 Storage</span>
                    <span>{systemInfo.disk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🌐 Network</span>
                    <span className="text-green-400">{systemInfo.network}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>⏱️ Uptime</span>
                    <span>{systemInfo.uptime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-4">
              <div className="text-white text-center">📈 Performance Monitor</div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-green-400 mb-2">System Performance: Excellent</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>CPU Performance</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>GPU Acceleration</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Disk I/O</span>
                      <span>73%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '73%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'network' && (
            <div className="space-y-4">
              <div className="text-white text-center">🌐 Network Status</div>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="text-green-400 mb-3">Connected to WiFi</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>📡 Signal Strength</span>
                    <span className="text-green-400">Excellent (95%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>⬇️ Download Speed</span>
                    <span>150 Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>⬆️ Upload Speed</span>
                    <span>45 Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span>📊 Data Usage</span>
                    <span>2.4 GB today</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'processes' && (
            <div className="space-y-4">
              <div className="text-white text-center">📱 Running Applications</div>
              <div className="space-y-2">
                {runningProcesses.map((app, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-white">{app.name}</div>
                      <div className="text-xs text-gray-400">
                        CPU: {app.cpu} | RAM: {app.memory}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-600 text-xs text-gray-400 text-center">
          Windows 11 Style System Monitor • Portfolio by Soumedhik Bharati
        </div>
      </div>
    </div>
  );
};

export default SystemTray;
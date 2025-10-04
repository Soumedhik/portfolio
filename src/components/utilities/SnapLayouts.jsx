import React from "react";

const SnapLayouts = ({ isVisible, onClose, onSnapLayout }) => {
  const snapLayouts = [
    { id: 1, name: "Split Left", icon: "⬛⬜", description: "Snap to left half" },
    { id: 2, name: "Split Right", icon: "⬜⬛", description: "Snap to right half" },
    { id: 3, name: "Maximize", icon: "⬛", description: "Fill entire screen" },
    { id: 4, name: "Quarter Top-Left", icon: "⬛⬜\n⬜⬜", description: "Top-left quarter" },
    { id: 5, name: "Quarter Top-Right", icon: "⬜⬛\n⬜⬜", description: "Top-right quarter" },
    { id: 6, name: "Quarter Bottom-Left", icon: "⬜⬜\n⬛⬜", description: "Bottom-left quarter" },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-600" onClick={(e) => e.stopPropagation()}>
        <div className="text-white text-lg font-semibold mb-4 flex items-center justify-between">
          <span>📐 Snap Layouts</span>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {snapLayouts.map((layout) => (
            <div
              key={layout.id}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-105 border border-gray-600 hover:border-blue-400"
              onClick={() => {
                onSnapLayout(layout);
                onClose();
              }}
              title={layout.description}
            >
              <div className="text-center mb-2">
                <div className="text-2xl font-mono whitespace-pre-line">{layout.icon}</div>
              </div>
              <div className="text-xs text-gray-300 text-center">{layout.name}</div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-gray-400 text-center">
          💡 Hover over window title bars for quick snap options
        </div>
      </div>
    </div>
  );
};

export default SnapLayouts;
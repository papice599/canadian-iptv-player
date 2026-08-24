import React from 'react';
import { FaHome, FaCalendarAlt, FaSync } from 'react-icons/fa';

function Header({ onViewChange, currentView }) {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🍁</div>
            <div>
              <h1 className="text-2xl font-bold text-white">Canadian IPTV Player</h1>
              <p className="text-sm text-gray-400">Legal Streaming | 100% Canadian Content</p>
            </div>
          </div>

          <nav className="flex gap-2">
            <button
              onClick={() => onViewChange('channels')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentView === 'channels'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <FaHome size={18} />
              <span className="hidden sm:inline">Channels</span>
            </button>
            <button
              onClick={() => onViewChange('epg')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentView === 'epg'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              <FaCalendarAlt size={18} />
              <span className="hidden sm:inline">EPG</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition-all"
              title="Sync with IPTV-Org"
            >
              <FaSync size={18} />
              <span className="hidden sm:inline">Sync</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

function Player({ channel }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  if (!channel) {
    return (
      <div className="bg-black w-full h-96 flex items-center justify-center text-gray-400">
        <p>Select a channel to start playing</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-black rounded-lg overflow-hidden shadow-lg">
      {/* Video Container */}
      <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%' }}>
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
          <div className="text-center">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-bold mb-2">{channel.name}</h2>
            <p className="text-gray-400 mb-4">{channel.callSign} - {channel.category}</p>
            <p className="text-sm text-gray-500">Stream integration with real HLS/DASH streams</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-red-500 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <span className="text-sm text-gray-400">
              {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')}
            </span>
          </div>
          <span className="text-sm font-semibold text-white">{channel.name}</span>
          <div className="flex items-center gap-2">
            {volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 cursor-pointer"
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-1">
          <div
            className="bg-red-500 h-1 rounded-full"
            style={{ width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {/* Channel Info */}
      <div className="bg-gray-800 p-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Channel</p>
            <p className="font-semibold text-white">{channel.name}</p>
          </div>
          <div>
            <p className="text-gray-400">Category</p>
            <p className="font-semibold text-white">{channel.category}</p>
          </div>
          <div>
            <p className="text-gray-400">Call Sign</p>
            <p className="font-semibold text-white">{channel.callSign}</p>
          </div>
          <div>
            <p className="text-gray-400">Country</p>
            <p className="font-semibold text-white">{channel.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;

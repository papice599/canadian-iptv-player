import React, { useState } from 'react';
import { FaStar, FaPlay } from 'react-icons/fa';

function ChannelGrid({ channels, selectedChannel, onSelectChannel }) {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(channels.map(ch => ch.category))];

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         channel.callSign.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || channel.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (channelId) => {
    setFavorites(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-4">Canadian Channels</h2>

      {/* Search and Filter */}
      <div className="mb-4 space-y-3">
        <input
          type="text"
          placeholder="Search channels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                filterCategory === cat
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Channel List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredChannels.map(channel => (
          <div
            key={channel.id}
            onClick={() => onSelectChannel(channel)}
            className={`p-3 rounded-lg cursor-pointer transition-all border flex items-center justify-between ${
              selectedChannel?.id === channel.id
                ? 'bg-red-600 border-red-500'
                : 'bg-gray-800 border-gray-700 hover:border-red-500'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <FaPlay size={16} className={selectedChannel?.id === channel.id ? 'text-white' : 'text-gray-400'} />
              <div>
                <p className={`font-semibold ${selectedChannel?.id === channel.id ? 'text-white' : 'text-white'}`}>
                  {channel.name}
                </p>
                <p className={`text-xs ${selectedChannel?.id === channel.id ? 'text-red-100' : 'text-gray-400'}`}>
                  {channel.callSign} • {channel.category}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(channel.id);
              }}
              className="ml-2"
            >
              <FaStar
                size={18}
                className={favorites.includes(channel.id) ? 'text-yellow-400' : 'text-gray-600'}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Showing {filteredChannels.length} of {channels.length} channels
      </div>
    </div>
  );
}

export default ChannelGrid;

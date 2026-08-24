import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ChannelGrid from './components/ChannelGrid';
import Player from './components/Player';
import EPGView from './components/EPGView';
import { getChannels } from './services/api';

function App() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('channels'); // 'channels' or 'epg'

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    try {
      setLoading(true);
      const response = await getChannels();
      setChannels(response.channels);
      if (response.channels.length > 0) {
        setSelectedChannel(response.channels[0]);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching channels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setView('channels');
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <Header onViewChange={handleViewChange} currentView={view} />
      
      {error && (
        <div className="error-banner bg-red-900 text-white p-4 text-center">
          Error: {error}
        </div>
      )}

      {view === 'channels' ? (
        <div className="flex flex-col lg:flex-row gap-4 p-4">
          <div className="lg:w-2/3">
            {selectedChannel && <Player channel={selectedChannel} />}
          </div>
          <div className="lg:w-1/3">
            {loading ? (
              <div className="text-center py-8">Loading channels...</div>
            ) : (
              <ChannelGrid
                channels={channels}
                selectedChannel={selectedChannel}
                onSelectChannel={handleChannelSelect}
              />
            )}
          </div>
        </div>
      ) : (
        <EPGView selectedChannel={selectedChannel} />
      )}
    </div>
  );
}

export default App;

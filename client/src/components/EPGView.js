import React, { useState, useEffect } from 'react';
import { getAvailableYears, getChannelProgramsByYear, getProgramsByYear } from '../services/api';
import { FaFilter, FaCalendarAlt } from 'react-icons/fa';

function EPGView({ selectedChannel }) {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2013);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterGenre, setFilterGenre] = useState('All');

  useEffect(() => {
    fetchAvailableYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchPrograms();
    }
  }, [selectedYear, selectedChannel]);

  const fetchAvailableYears = async () => {
    try {
      const response = await getAvailableYears();
      setYears(response.years);
      setSelectedYear(response.max);
    } catch (err) {
      setError('Failed to fetch available years');
      console.error(err);
    }
  };

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      let response;
      if (selectedChannel) {
        response = await getChannelProgramsByYear(selectedChannel.id, selectedYear);
      } else {
        response = await getProgramsByYear(selectedYear);
      }
      setPrograms(response.programs || []);
    } catch (err) {
      setError('Failed to fetch programs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const genres = ['All', ...new Set(programs.map(p => p.genre).filter(Boolean))];
  const filteredPrograms = filterGenre === 'All'
    ? programs
    : programs.filter(p => p.genre === filterGenre);

  const formatTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-CA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return 'N/A';
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-CA');
    } catch {
      return 'N/A';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-6 border border-gray-800 mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <FaCalendarAlt /> Electronic Program Guide (EPG)
        </h2>
        <p className="text-gray-400">Browse TV programs from 2005 to 2013</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <FaFilter size={20} className="text-red-500" />
          <span className="font-semibold text-white">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Channel Filter Info */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Channel</label>
            <div className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white">
              {selectedChannel ? selectedChannel.name : 'All Channels'}
            </div>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">
          Programs: {selectedYear}
          {selectedChannel && ` - ${selectedChannel.name}`}
        </h3>

        {error && (
          <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-8 text-gray-400">
            Loading programs...
          </div>
        )}

        {!loading && filteredPrograms.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No programs found for the selected filters.
          </div>
        )}

        {!loading && filteredPrograms.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrograms.map(program => (
              <div
                key={program.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4 hover:border-red-500 transition-all"
              >
                <h4 className="font-bold text-white text-lg mb-2">{program.programTitle}</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-400">
                    <span className="font-semibold">Channel:</span> {program.channelName}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Date:</span> {formatDate(program.startTime)}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Time:</span> {formatTime(program.startTime)} - {formatTime(program.endTime)}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-semibold">Duration:</span> {program.duration} minutes
                  </p>
                  {program.genre && (
                    <p className="text-gray-400">
                      <span className="font-semibold">Genre:</span> {program.genre}
                    </p>
                  )}
                  {program.rating && (
                    <p className="text-gray-400">
                      <span className="font-semibold">Rating:</span> {program.rating}
                    </p>
                  )}
                </div>
                {program.description && (
                  <p className="text-gray-500 text-xs mt-3 italic">
                    {program.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EPGView;

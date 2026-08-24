const express = require('express');
const router = express.Router();

// Sample EPG data structure
const sampleEPGData = [
  {
    id: 1,
    channelId: 1,
    channelName: 'TSN',
    programTitle: 'NHL Hockey',
    description: 'Live NHL hockey game',
    startTime: '2026-08-24T19:00:00Z',
    endTime: '2026-08-24T22:00:00Z',
    duration: 180,
    year: 2026,
    rating: 'PG',
    genre: 'Sports'
  }
];

// Get EPG data with filters
router.get('/', (req, res) => {
  try {
    const { year, channelId, startDate, endDate, genre } = req.query;
    let filtered = [...sampleEPGData];

    // Filter by year
    if (year) {
      filtered = filtered.filter(epg => epg.year === parseInt(year));
    }

    // Filter by channel ID
    if (channelId) {
      filtered = filtered.filter(epg => epg.channelId === parseInt(channelId));
    }

    // Filter by genre
    if (genre) {
      filtered = filtered.filter(epg => epg.genre.toLowerCase() === genre.toLowerCase());
    }

    res.json({
      success: true,
      count: filtered.length,
      epg: filtered,
      filters: {
        year: year || 'all',
        channelId: channelId || 'all',
        genre: genre || 'all'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get available years (2005-2013)
router.get('/years/available', (req, res) => {
  try {
    const years = [];
    for (let year = 2005; year <= 2013; year++) {
      years.push(year);
    }
    res.json({
      success: true,
      years: years,
      min: 2005,
      max: 2013
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get programs by year
router.get('/year/:year', (req, res) => {
  try {
    const year = parseInt(req.params.year);
    if (year < 2005 || year > 2013) {
      return res.status(400).json({ 
        error: 'Year must be between 2005 and 2013' 
      });
    }

    const programs = sampleEPGData.filter(epg => epg.year === year);
    res.json({
      success: true,
      year,
      count: programs.length,
      programs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get programs for specific channel and year
router.get('/channel/:channelId/year/:year', (req, res) => {
  try {
    const channelId = parseInt(req.params.channelId);
    const year = parseInt(req.params.year);

    if (year < 2005 || year > 2013) {
      return res.status(400).json({ 
        error: 'Year must be between 2005 and 2013' 
      });
    }

    const programs = sampleEPGData.filter(epg => 
      epg.channelId === channelId && epg.year === year
    );

    res.json({
      success: true,
      channelId,
      year,
      count: programs.length,
      programs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

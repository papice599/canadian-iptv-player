const express = require('express');
const router = express.Router();

// Canadian specialty channels
const CANADIAN_CHANNELS = [
  { id: 1, name: 'TSN', callSign: 'TSN', category: 'Sports', country: 'CA' },
  { id: 2, name: 'CTV', callSign: 'CTV', category: 'General', country: 'CA' },
  { id: 3, name: 'Global', callSign: 'GLOBAL', category: 'General', country: 'CA' },
  { id: 4, name: 'CBC', callSign: 'CBC', category: 'General', country: 'CA' },
  { id: 5, name: 'Sportsnet', callSign: 'SN', category: 'Sports', country: 'CA' },
  { id: 6, name: 'MuchMusic', callSign: 'MUCH', category: 'Music', country: 'CA' },
  { id: 7, name: 'MTV Canada', callSign: 'MTVC', category: 'Music', country: 'CA' },
  { id: 8, name: 'Discovery Channel Canada', callSign: 'DISC', category: 'Documentary', country: 'CA' },
  { id: 9, name: 'History Channel Canada', callSign: 'HIST', category: 'Documentary', country: 'CA' },
  { id: 10, name: 'Space', callSign: 'SPACE', category: 'Sci-Fi', country: 'CA' },
  { id: 11, name: 'Showcase', callSign: 'SHOW', category: 'Drama', country: 'CA' },
  { id: 12, name: 'W Network', callSign: 'W', category: 'Drama', country: 'CA' },
  { id: 13, name: 'Bravo Canada', callSign: 'BRAVO', category: 'Entertainment', country: 'CA' },
  { id: 14, name: 'CityTV', callSign: 'CITY', category: 'General', country: 'CA' },
  { id: 15, name: 'Treehouse TV', callSign: 'TREE', category: 'Kids', country: 'CA' }
];

// Get all Canadian channels
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      count: CANADIAN_CHANNELS.length,
      channels: CANADIAN_CHANNELS
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get channel by ID
router.get('/:id', (req, res) => {
  try {
    const channel = CANADIAN_CHANNELS.find(ch => ch.id === parseInt(req.params.id));
    if (!channel) {
      return res.status(404).json({ error: 'Channel not found' });
    }
    res.json({ success: true, channel });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get channels by category
router.get('/category/:category', (req, res) => {
  try {
    const channels = CANADIAN_CHANNELS.filter(ch => 
      ch.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json({
      success: true,
      category: req.params.category,
      count: channels.length,
      channels
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
router.get('/categories/all', (req, res) => {
  try {
    const categories = [...new Set(CANADIAN_CHANNELS.map(ch => ch.category))];
    res.json({
      success: true,
      count: categories.length,
      categories: categories.sort()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

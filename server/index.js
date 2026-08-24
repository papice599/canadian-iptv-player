const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const channelsRouter = require('./routes/channels');
const epgRouter = require('./routes/epg');
const streamRouter = require('./routes/streams');
const iptvOrgRouter = require('./routes/iptv-org');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Routes
app.use('/api/channels', channelsRouter);
app.use('/api/epg', epgRouter);
app.use('/api/streams', streamRouter);
app.use('/api/iptv-org', iptvOrgRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    status: err.status || 500
  });
});

app.listen(PORT, () => {
  console.log(`Canadian IPTV Player API running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;

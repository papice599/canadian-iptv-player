const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../data/epg.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database at:', DB_PATH);
    initializeTables();
  }
});

function initializeTables() {
  // Channels table
  db.run(`
    CREATE TABLE IF NOT EXISTS channels (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      callSign TEXT,
      category TEXT,
      country TEXT DEFAULT 'CA',
      logoUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // EPG data table
  db.run(`
    CREATE TABLE IF NOT EXISTS epg (
      id INTEGER PRIMARY KEY,
      channelId INTEGER NOT NULL,
      programTitle TEXT NOT NULL,
      description TEXT,
      startTime DATETIME NOT NULL,
      endTime DATETIME NOT NULL,
      year INTEGER,
      rating TEXT,
      genre TEXT,
      duration INTEGER,
      FOREIGN KEY(channelId) REFERENCES channels(id)
    )
  `);

  // Streams table
  db.run(`
    CREATE TABLE IF NOT EXISTS streams (
      id TEXT PRIMARY KEY,
      channelId INTEGER NOT NULL,
      url TEXT NOT NULL,
      type TEXT,
      quality TEXT,
      bitrate INTEGER,
      status TEXT DEFAULT 'active',
      lastChecked DATETIME,
      FOREIGN KEY(channelId) REFERENCES channels(id)
    )
  `);

  // Sync history table
  db.run(`
    CREATE TABLE IF NOT EXISTS sync_history (
      id INTEGER PRIMARY KEY,
      syncType TEXT,
      source TEXT,
      status TEXT,
      recordsAffected INTEGER,
      lastSyncTime DATETIME,
      nextSyncTime DATETIME
    )
  `);

  console.log('Database tables initialized');
}

module.exports = db;

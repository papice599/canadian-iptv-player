const express = require('express');
const axios = require('axios');
const router = express.Router();

const GITHUB_API_BASE = 'https://api.github.com';
const IPTV_ORG_REPO = process.env.IPTV_ORG_REPO || 'iptv-org/iptv';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const axiosConfig = {
  headers: {
    'Accept': 'application/vnd.github.v3.raw',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
  }
};

// Fetch Canadian channels from IPTV-Org
router.get('/channels/canada', async (req, res) => {
  try {
    const url = `${GITHUB_API_BASE}/repos/${IPTV_ORG_REPO}/contents/channels/ca.m3u`;
    const response = await axios.get(url, axiosConfig);
    
    res.json({
      success: true,
      source: 'iptv-org/iptv',
      country: 'CA',
      channels: response.data
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      source: 'iptv-org/iptv'
    });
  }
});

// Fetch EPG from IPTV-Org
router.get('/epg/canada', async (req, res) => {
  try {
    const url = `${GITHUB_API_BASE}/repos/${IPTV_ORG_REPO}/contents/guides/ca.xml`;
    const response = await axios.get(url, axiosConfig);
    
    res.json({
      success: true,
      source: 'iptv-org/iptv',
      country: 'CA',
      epgData: response.data
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      source: 'iptv-org/iptv'
    });
  }
});

// Sync with IPTV-Org repository
router.post('/sync', async (req, res) => {
  try {
    const url = `${GITHUB_API_BASE}/repos/${IPTV_ORG_REPO}`;
    const response = await axios.get(url, axiosConfig);
    
    res.json({
      success: true,
      syncStatus: 'completed',
      repository: {
        name: response.data.name,
        url: response.data.html_url,
        lastSync: new Date().toISOString(),
        description: response.data.description,
        stars: response.data.stargazers_count
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      syncStatus: 'failed'
    });
  }
});

// Get IPTV-Org repository info
router.get('/repo/info', async (req, res) => {
  try {
    const url = `${GITHUB_API_BASE}/repos/${IPTV_ORG_REPO}`;
    const response = await axios.get(url, axiosConfig);
    
    res.json({
      success: true,
      repository: {
        name: response.data.name,
        fullName: response.data.full_name,
        url: response.data.html_url,
        description: response.data.description,
        stars: response.data.stargazers_count,
        forks: response.data.forks_count,
        issues: response.data.open_issues_count,
        lastUpdated: response.data.updated_at
      }
    });
  } catch (error) {
    res.status(500).json({ 
      error: error.message
    });
  }
});

module.exports = router;

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Channels
export const getChannels = () => api.get('/channels').then(res => res.data);
export const getChannelById = (id) => api.get(`/channels/${id}`).then(res => res.data);
export const getChannelsByCategory = (category) => 
  api.get(`/channels/category/${category}`).then(res => res.data);
export const getCategories = () => api.get('/channels/categories/all').then(res => res.data);

// EPG
export const getEPG = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.append(key, value);
  });
  return api.get(`/epg?${params}`).then(res => res.data);
};

export const getAvailableYears = () => api.get('/epg/years/available').then(res => res.data);
export const getProgramsByYear = (year) => api.get(`/epg/year/${year}`).then(res => res.data);
export const getChannelProgramsByYear = (channelId, year) => 
  api.get(`/epg/channel/${channelId}/year/${year}`).then(res => res.data);

// Streams
export const getStreams = (channelId) => 
  api.get(`/streams/channel/${channelId}`).then(res => res.data);
export const validateStream = (streamUrl) => 
  api.post('/streams/validate', { streamUrl }).then(res => res.data);

// IPTV-Org
export const getCanadianChannelsFromIPTVOrg = () => 
  api.get('/iptv-org/channels/canada').then(res => res.data);
export const getEPGFromIPTVOrg = () => 
  api.get('/iptv-org/epg/canada').then(res => res.data);
export const syncWithIPTVOrg = () => 
  api.post('/iptv-org/sync').then(res => res.data);
export const getIPTVOrgRepoInfo = () => 
  api.get('/iptv-org/repo/info').then(res => res.data);

// Health check
export const healthCheck = () => api.get('/health').then(res => res.data);

export default api;

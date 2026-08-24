# Frequently Asked Questions

## General

### What is Canadian IPTV Player?
A legal, open-source IPTV player specifically designed for Canadian TV networks with EPG (Electronic Program Guide) support and historical TV program data from 2005-2013.

### Is it legal?
Yes, 100% legal. The player uses only publicly available, licensed Canadian IPTV streams and complies with CRTC regulations.

### Do I need a subscription?
No, the player uses freely available public streams. However, some channels may have geo-blocking or require cable provider authentication.

## Setup & Installation

### How do I install it?
See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed installation instructions.

### Can I run it without Node.js?
Yes, you can deploy the pre-built version using Docker or directly on hosting platforms.

### What are the minimum system requirements?
- 512 MB RAM
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection

## Features

### What channels are supported?
All major Canadian English specialty networks including TSN, CTV, Global, CBC, Sportsnet, MuchMusic, and more.

### Can I watch historical programs?
Yes, the EPG includes programs from 2005-2013. You can filter by year to browse historical schedules.

### How often is the EPG updated?
The EPG is synced with the iptv-org/iptv repository daily (configurable interval).

### Can I record programs?
This feature is planned for future releases. Currently, you can only watch live streams.

## Streaming

### What streaming formats are supported?
- HLS (HTTP Live Streaming) - Primary
- DASH (Dynamic Adaptive Streaming over HTTP) - Supported

### What video quality options are available?
- 480p (mobile-friendly)
- 720p (HD)
- 1080p (Full HD)

Availability depends on the channel's stream source.

### Why is a stream not working?
1. Check your internet connection
2. Verify the channel is available in your region
3. Some channels may have geo-blocking
4. Try a different quality/bitrate option

## IPTV-Org Integration

### What is IPTV-Org?
A community-driven project on GitHub that maintains a comprehensive database of IPTV channels and EPG data globally.

### How does the integration work?
The player fetches Canadian channel data from the iptv-org/iptv repository via GitHub API, providing real-time stream updates.

### Do I need a GitHub account?
No, but you can increase your API rate limit by providing a GitHub token in the `.env` file.

### How can I contribute to IPTV-Org?
Visit https://github.com/iptv-org/iptv for contribution guidelines.

## Technical

### What's the tech stack?
- Frontend: React.js + Tailwind CSS
- Backend: Node.js + Express
- Database: SQLite
- Integration: GitHub API

### Can I self-host it?
Yes! The player is designed for self-hosting. See [DEPLOYMENT.md](./docs/DEPLOYMENT.md).

### Is the source code open?
Yes, it's licensed under MIT. You can fork, modify, and redistribute it.

### How do I report bugs?
Open an issue on GitHub: https://github.com/papice599/canadian-iptv-player/issues

## Legal & Privacy

### Does it collect personal data?
No personal data is collected. All data is stored locally.

### Can I use it in other countries?
This player is optimized for Canadian content. It will work in other countries but may have geo-blocking restrictions.

### What about copyright?
The player only streams legally licensed, publicly available content. All streams must comply with local broadcasting regulations.

## Troubleshooting

### The app won't start
```bash
# Check Node.js version (16+ required)
node --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### API returns 404 errors
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `.env`
- Verify network connectivity

### Streams are buffering
- Check internet speed
- Try lower quality option
- Restart the player

### EPG data is outdated
```bash
# Manual sync with IPTV-Org
curl -X POST http://localhost:5000/api/iptv-org/sync
```

## Performance

### How much bandwidth does it use?
- Depends on stream quality
- 480p: ~1-1.5 Mbps
- 720p: ~2-3 Mbps
- 1080p: ~5-7 Mbps

### How can I improve performance?
1. Use wired internet connection
2. Close other bandwidth-heavy applications
3. Select appropriate quality for your connection
4. Clear browser cache regularly

## Support

### Where can I get help?
- GitHub Issues: https://github.com/papice599/canadian-iptv-player/issues
- Documentation: `/docs` directory
- Discussions: GitHub Discussions tab

### How can I contribute?
See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Is there a community?
Yes! Join discussions on GitHub and contribute to the project.

---

For more questions, open an issue on GitHub!

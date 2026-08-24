# Canadian IPTV Player

A modern, legal Canadian live IPTV player featuring Canadian English specialty TV networks with integrated TV guide, EPG (Electronic Program Guide), and historical program timeline filtering.

## Features

- ✅ **100% Legal Streaming** - Uses publicly available Canadian IPTV streams
- 📺 **Canadian English Specialty Networks** - TSN, CTV, Global, CBC, Sportsnet, and more
- 📅 **Electronic Program Guide (EPG)** - Real-time and historical TV schedules
- 🎬 **Timeline Filtering** - Browse programs from 2005 to 2013
- 🔍 **EPG Filter** - Search and filter by year, channel, and program type
- 🌐 **GitHub IPTV-Org Integration** - Real-time stream updates from iptv-org
- 📊 **Full TV Guide** - Comprehensive program listings and descriptions
- 🎯 **Channel Management** - Add, remove, and organize favorite channels

## Tech Stack

- **Frontend**: React.js + TypeScript
- **Backend**: Node.js + Express
- **Database**: SQLite / MongoDB (for EPG data)
- **Streaming**: HLS/DASH player integration
- **EPG Data**: IPTV-Org GitHub integration
- **UI**: Tailwind CSS + Material Design

## Installation

```bash
# Clone the repository
git clone https://github.com/papice599/canadian-iptv-player.git
cd canadian-iptv-player

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Configuration

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
GITHUB_TOKEN=your_github_token_here
IPTV_ORG_REPO=iptv-org/iptv
```

## Canadian Specialty Networks Supported

- TSN (The Sports Network)
- CTV
- Global
- CBC/Radio-Canada
- Sportsnet
- MuchMusic
- MTV Canada
- Discovery Channel Canada
- History Channel Canada
- Space
- Showcase
- W Network
- Bravo Canada
- CityTV
- Treehouse TV

## EPG Timeline Features

- **Year Filter**: 2005-2013 historical data
- **Real-time Updates**: Current schedule
- **Program Details**: Title, description, duration, ratings
- **Search & Filter**: By channel, date, program type

## GitHub IPTV-Org Integration

This player integrates with the official [iptv-org/iptv](https://github.com/iptv-org/iptv) repository to fetch:
- Canadian stream sources
- Channel metadata
- M3U playlists
- Real-time stream validation

## API Documentation

See [API.md](./docs/API.md) for detailed endpoint documentation.

## Contributing

Contributions are welcome! Please follow our [Contributing Guidelines](./CONTRIBUTING.md).

## Legal Notice

This player uses only publicly available, legal Canadian IPTV streams. All channels are licensed and legal in Canada.

## License

MIT License - see [LICENSE](./LICENSE) file for details

## Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing documentation in `/docs`
- Review the FAQ section

---

**Note**: This project is for Canadian residents and complies with all Canadian broadcasting regulations and CRTC guidelines.

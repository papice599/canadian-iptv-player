# Canadian IPTV Player - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Client (React Frontend)                  │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐ │
│  │   Header         │  │   Player         │  │   EPG View           │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘ │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐ │
│  │ChannelGrid       │  │   EPGFilter      │  │    Services          │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                          ↓ (API Calls)
┌─────────────────────────────────────────────────────────────────────────┐
│              Backend API (Express.js)                       │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐ │
│  │  Channels        │  │     EPG          │  │    Streams           │ │
│  │   Router         │  │    Router        │  │    Router            │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐ │
│  │      IPTV-Org Integration Router                     │  │
│  │  (GitHub API, M3U Parsing, EPG Sync)                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────────────────┐
│          Data & External Services                           │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐ │
│  │ SQLite DB        │  │ GitHub API       │  │  IPTV Streams        │ │
│  │ (EPG Data)       │  │ (iptv-org)       │  │  (HLS/DASH)          │ │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
canadian-iptv-player/
├── client/                          # React Frontend
│   ├── public/
│   │   └── index.html              # HTML entry point
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js           # Top navigation
│   │   │   ├── Player.js           # Video player
│   │   │   ├── ChannelGrid.js      # Channel list
│   │   │   └── EPGView.js          # EPG interface
│   │   ├── services/
│   │   │   └── api.js              # API client
│   │   ├── App.js                  # Main app component
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Tailwind styles
│   ├── package.json
│   └── tailwind.config.js
│
├── server/                          # Express Backend
│   ├── routes/
│   │   ├── channels.js             # Channel endpoints
│   │   ├── epg.js                  # EPG endpoints
│   │   ├── streams.js              # Stream endpoints
│   │   └── iptv-org.js             # IPTV-Org integration
│   ├── db/
│   │   └── init.js                 # SQLite initialization
│   └── index.js                    # Express server
│
├── docs/
│   ├── API.md                       # API documentation
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── ARCHITECTURE.md              # This file
│
├── data/                            # Data directory
│   └── epg.db                       # SQLite database (auto-created)
│
├── .env.example                     # Environment template
├── .gitignore
├── .eslintrc.json
├── .prettierrc.json
├── package.json                     # Root dependencies
├── CONTRIBUTING.md
└── README.md
```

## Technology Stack

### Frontend
- **React**: Component-based UI framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library

### Backend
- **Express.js**: Web server framework
- **SQLite**: Database for EPG data
- **Axios**: HTTP client for external APIs
- **Node Schedule**: Task scheduling
- **CORS**: Cross-origin resource sharing

## Key Features

1. **Channel Management**: Browse 15+ Canadian TV networks
2. **EPG Timeline**: Filter programs from 2005-2013
3. **Stream Validation**: Real-time stream status checking
4. **IPTV-Org Integration**: Automatic updates from GitHub
5. **Responsive UI**: Works on desktop and mobile
6. **Local Database**: SQLite for fast data access

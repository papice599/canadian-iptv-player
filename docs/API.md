# Canadian IPTV Player - API Documentation

## Base URL

```
http://localhost:5000/api
```

## Endpoints

### Channels

#### Get All Channels
```
GET /channels
```
Returns all available Canadian TV channels.

**Response:**
```json
{
  "success": true,
  "count": 15,
  "channels": [
    {
      "id": 1,
      "name": "TSN",
      "callSign": "TSN",
      "category": "Sports",
      "country": "CA"
    }
  ]
}
```

#### Get Channel by ID
```
GET /channels/:id
```

#### Get Channels by Category
```
GET /channels/category/:category
```
Example: `/channels/category/Sports`

#### Get All Categories
```
GET /channels/categories/all
```

### EPG (Electronic Program Guide)

#### Get EPG with Filters
```
GET /epg?year=2010&channelId=1&genre=Sports
```

**Query Parameters:**
- `year`: Filter by year (2005-2013)
- `channelId`: Filter by channel ID
- `genre`: Filter by genre
- `startDate`: Start date for range query
- `endDate`: End date for range query

#### Get Available Years
```
GET /epg/years/available
```
Returns: 2005-2013

#### Get Programs by Year
```
GET /epg/year/:year
```
Example: `/epg/year/2010`

#### Get Channel Programs by Year
```
GET /epg/channel/:channelId/year/:year
```
Example: `/epg/channel/1/year/2010`

### Streams

#### Get Streams for Channel
```
GET /streams/channel/:channelId
```

**Response:**
```json
{
  "success": true,
  "channelId": 1,
  "count": 3,
  "streams": [
    {
      "id": "stream-1-1",
      "channelId": 1,
      "url": "https://example.com/stream/1/main.m3u8",
      "type": "HLS",
      "quality": "720p",
      "bitrate": 2500,
      "status": "active"
    }
  ]
}
```

#### Validate Stream
```
POST /streams/validate
Content-Type: application/json

{
  "streamUrl": "https://example.com/stream.m3u8"
}
```

### IPTV-Org Integration

#### Get Canadian Channels from IPTV-Org
```
GET /iptv-org/channels/canada
```

#### Get EPG from IPTV-Org
```
GET /iptv-org/epg/canada
```

#### Sync with IPTV-Org
```
POST /iptv-org/sync
```

#### Get IPTV-Org Repository Info
```
GET /iptv-org/repo/info
```

### Health Check

```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-08-24T23:30:00.000Z"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message here",
  "status": 400
}
```

## Rate Limiting

- IPTV-Org API requests are limited by GitHub's rate limits
- Unauthenticated requests: 60 requests per hour
- Authenticated requests (with GitHub token): 5,000 requests per hour

## Authentication

Use a GitHub token in the `.env` file for higher rate limits:

```
GITHUB_TOKEN=your_token_here
```

## Data Models

### Channel
```
{
  id: number
  name: string
  callSign: string
  category: string
  country: string ("CA")
  logoUrl?: string
}
```

### EPG Program
```
{
  id: number
  channelId: number
  programTitle: string
  description: string
  startTime: ISO 8601 datetime
  endTime: ISO 8601 datetime
  duration: number (minutes)
  year: number (2005-2013)
  rating: string
  genre: string
}
```

### Stream
```
{
  id: string
  channelId: number
  url: string
  type: string ("HLS" | "DASH")
  quality: string ("480p" | "720p" | "1080p")
  bitrate: number
  status: string ("active" | "inactive")
}
```

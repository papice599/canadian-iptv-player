# Deployment Guide

## Local Development

### Prerequisites
- Node.js 16+ and npm
- Git
- GitHub token (optional, for IPTV-Org integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/papice599/canadian-iptv-player.git
   cd canadian-iptv-player
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your GitHub token if desired.

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend API: http://localhost:5000/api
   - Frontend: http://localhost:3000

## Production Deployment

### Build for Production

```bash
# Build the frontend
cd client
npm run build
cd ..

# The built files are in client/build
```

### Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku app**
   ```bash
   heroku create canadian-iptv-player
   ```

3. **Set environment variables**
   ```bash
   heroku config:set GITHUB_TOKEN=your_token_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploy with Docker

1. **Build Docker image**
   ```bash
   docker build -t canadian-iptv-player .
   ```

2. **Run container**
   ```bash
   docker run -p 5000:5000 \
     -e GITHUB_TOKEN=your_token \
     canadian-iptv-player
   ```

3. **Or use Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Deploy to AWS Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   pip install awsebcli --upgrade --user
   ```

2. **Initialize and deploy**
   ```bash
   eb init -p node.js-18 canadian-iptv-player
   eb create production
   eb deploy
   ```

### Deploy to DigitalOcean

1. **Create App Platform app**
   - Connect GitHub repository
   - Set environment variables
   - Auto-deploy on push to main

### Deploy to Vercel (Frontend only)

```bash
npm install -g vercel
cd client
vercel --prod
```

## Environment Variables

```env
# Server
PORT=5000
NODE_ENV=production

# GitHub / IPTV-Org
GITHUB_TOKEN=your_github_token
IPTV_ORG_REPO=iptv-org/iptv
IPTV_ORG_BRANCH=master

# Database
DB_PATH=./data/epg.db

# Frontend
REACT_APP_API_URL=https://your-api-domain.com/api

# EPG
EPG_UPDATE_INTERVAL=86400000
EPG_CACHE_DURATION=604800000

# Logging
LOG_LEVEL=info
```

## Database Migration

The SQLite database is automatically initialized on first run. To reset:

```bash
rm data/epg.db
npm start
```

## Monitoring

- **Health Check**: `/api/health`
- **Logs**: Check `logs/` directory
- **Database**: SQLite at `data/epg.db`

## Performance Optimization

1. Enable caching for EPG data
2. Use CDN for static assets
3. Optimize API responses
4. Implement rate limiting
5. Enable gzip compression

## Security

- Use HTTPS in production
- Set secure CORS headers
- Validate all user inputs
- Keep dependencies updated
- Use environment variables for sensitive data
- Implement rate limiting
- Enable CSRF protection

## Troubleshooting

### Port already in use
```bash
lsof -i :5000
kill -9 <PID>
```

### Database locked
```bash
rm data/epg.db
npm start
```

### IPTV-Org sync fails
- Check GitHub token validity
- Verify internet connection
- Check rate limits: `GET https://api.github.com/rate_limit`
- Ensure GITHUB_TOKEN env var is set

### Docker build fails
```bash
docker system prune -a
docker build --no-cache -t canadian-iptv-player .
```

## Scaling

For high traffic:
1. Use PM2 for process management
2. Implement Redis caching
3. Use load balancer (Nginx, HAProxy)
4. Migrate to PostgreSQL from SQLite
5. Implement API rate limiting

## Backup

```bash
# Backup database
cp data/epg.db backups/epg-$(date +%Y%m%d).db

# Backup logs
tar -czf logs-$(date +%Y%m%d).tar.gz logs/
```

## Support

For deployment issues, open an issue on GitHub: https://github.com/papice599/canadian-iptv-player/issues

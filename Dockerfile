FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy client
COPY client/package*.json ./client/
RUN cd client && npm ci --only=production && npm cache clean --force

# Copy source
COPY server ./server
COPY client/src ./client/src
COPY client/public ./client/public

# Build client
WORKDIR /app/client
RUN npm run build

WORKDIR /app

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})" || exit 1

# Start application
CMD ["npm", "start"]

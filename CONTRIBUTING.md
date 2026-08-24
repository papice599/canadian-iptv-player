# Contributing to Canadian IPTV Player

Thank you for your interest in contributing! Please read these guidelines.

## Code of Conduct

Be respectful and inclusive. This is a Canadian project that celebrates diversity.

## How to Contribute

### 1. Fork and Clone
```bash
git clone https://github.com/papice599/canadian-iptv-player.git
cd canadian-iptv-player
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Follow existing code style
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed

### 4. Commit and Push
```bash
git add .
git commit -m "Add: description of your changes"
git push origin feature/your-feature-name
```

### 5. Create a Pull Request
- Provide a clear description of changes
- Reference any related issues
- Wait for review and feedback

## Development Guidelines

### Code Style
- Use consistent formatting with Prettier
- Follow ESLint rules
- Use meaningful variable names

### Commit Messages
- Use imperative mood ("Add" not "Added")
- Keep first line under 50 characters
- Reference issues: "Fix: issue #123"

### Testing
```bash
npm test
npm run test:watch
```

### Linting
```bash
npm run lint
npm run format
```

## Adding New Features

### Adding a Canadian Channel
1. Update `server/routes/channels.js`
2. Add to `CANADIAN_CHANNELS` array
3. Include: id, name, callSign, category, country
4. Update documentation

### Adding EPG Data
1. Update database schema in `server/db/init.js` if needed
2. Add routes in `server/routes/epg.js`
3. Test filtering and queries

### IPTV-Org Integration
- Ensure changes are compatible with iptv-org/iptv repository
- Test GitHub API integration
- Handle authentication properly

## Legal Compliance

- Ensure all streams and content are legal in Canada
- Respect CRTC regulations
- Use only publicly available, licensed streams
- Do not include any illegal content

## Reporting Bugs

1. Check if issue already exists
2. Create detailed bug report with:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots if applicable
   - Environment details

## Feature Requests

1. Check if feature is already requested
2. Describe the feature clearly
3. Explain why it would be useful
4. Provide examples if applicable

## Questions?

Open an issue or discussion for questions. We're here to help!

---

Thank you for contributing to the Canadian IPTV Player project!

# Discord Music Bot Project

## Overview
A Discord music bot with Spotify and YouTube integration, featuring playback controls inspired by popular music bots like Hydra and Hades. Built with TypeScript, discord.js, and modern audio streaming libraries.

## Current State
- ✅ Project initialized with TypeScript and Node.js
- ✅ All core dependencies installed (discord.js, @discordjs/voice, play-dl, spotify-web-api-node)
- ✅ Music player system with queue management
- ✅ YouTube and Spotify integration services
- ✅ Slash commands for music controls
- ✅ Railway deployment configuration

## Recent Changes (November 14, 2025)
- Created full Discord music bot structure
- Implemented music player with queue system
- Added 8 slash commands: play, pause, resume, skip, stop, queue, nowplaying, volume
- Integrated YouTube API via play-dl library
- Integrated Spotify API with track search and metadata
- Created Railway deployment files (railway.json, Procfile)
- Added comprehensive README with setup instructions

## Project Architecture

### Tech Stack
- **Runtime**: Node.js 20
- **Language**: TypeScript
- **Discord**: discord.js v14, @discordjs/voice
- **Music Streaming**: play-dl (YouTube), spotify-web-api-node (Spotify)
- **Audio Processing**: ffmpeg-static, @discordjs/opus
- **Deployment**: Railway hosting

### Directory Structure
```
src/
├── commands/       - Slash commands (play, pause, skip, etc.)
├── music/          - Music player and track classes
├── services/       - YouTube and Spotify API integrations
├── types/          - TypeScript type definitions
└── index.ts        - Main bot entry point
```

### Key Features
1. **Music Playback**: Stream from YouTube and Spotify
2. **Queue Management**: Add, skip, clear songs
3. **Playback Controls**: Play, pause, resume, stop
4. **Volume Control**: Adjustable volume (0-100)
5. **Rich Embeds**: Beautiful Discord embed messages
6. **Auto-disconnect**: Leaves when voice channel is empty

### API Integrations
- **Discord Integration**: OAuth managed via Replit connector
- **Spotify Integration**: Client credentials flow via Replit connector
- **YouTube Integration**: Video/audio streaming via Replit connector

## Environment Variables Required
- `DISCORD_TOKEN`: Discord bot token
- `SPOTIFY_CLIENT_ID`: Spotify application client ID
- `SPOTIFY_CLIENT_SECRET`: Spotify application client secret
- `YOUTUBE_COOKIE`: (Optional) For age-restricted content

## User Preferences
- Deploy to Railway hosting
- Push code to GitHub repository
- No libsodium or distube (compatibility issues)
- Reference popular bots (Hydra, Hades) for feature inspiration

## Next Steps
1. Test bot functionality
2. Push code to GitHub
3. Deploy to Railway
4. Add playlist support (future enhancement)
5. Implement loop/repeat functionality (future enhancement)

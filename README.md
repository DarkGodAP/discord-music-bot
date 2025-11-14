# Discord Music Bot

A feature-rich Discord music bot with Spotify and YouTube integration, inspired by popular bots like Hydra and Hades.

## Features

- 🎵 Play music from YouTube and Spotify
- ⏯️ Full playback controls (play, pause, resume, skip, stop)
- 📋 Queue management system
- 🔊 Volume control
- 📊 Now playing and queue display
- 🎨 Beautiful embed messages
- 🤖 Slash commands interface

## Commands

- `/play <query>` - Play a song from YouTube or Spotify (accepts URLs or search queries)
- `/pause` - Pause the current song
- `/resume` - Resume playback
- `/skip` - Skip to the next song
- `/stop` - Stop playback and clear the queue
- `/queue` - Display the current queue
- `/nowplaying` - Show the currently playing song
- `/volume <0-100>` - Adjust the volume

## Setup

### Prerequisites

- Node.js 20 or higher
- Discord Bot Token
- Spotify API credentials (Client ID and Secret)
- YouTube API access (optional)

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd discord-music-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Fill in your credentials in the `.env` file:
   - `DISCORD_TOKEN`: Your Discord bot token from [Discord Developer Portal](https://discord.com/developers/applications)
   - `SPOTIFY_CLIENT_ID`: Your Spotify Client ID from [Spotify Dashboard](https://developer.spotify.com/dashboard)
   - `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret

### Getting API Credentials

#### Discord Bot Token
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section and click "Add Bot"
4. Copy the token and add it to your `.env` file
5. Enable "Message Content Intent" and "Server Members Intent" under Privileged Gateway Intents
6. Go to OAuth2 > URL Generator
7. Select scopes: `bot` and `applications.commands`
8. Select bot permissions: `Connect`, `Speak`, `Use Voice Activity`, `Send Messages`, `Embed Links`
9. Use the generated URL to invite the bot to your server

#### Spotify API
1. Go to [Spotify Dashboard](https://developer.spotify.com/dashboard)
2. Log in and click "Create an App"
3. Give it a name and description
4. Copy the Client ID and Client Secret to your `.env` file

### Running the Bot

#### Development
```bash
npm run dev
```

#### Production
```bash
npm run build
npm start
```

## Deployment

### Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login to Railway:
```bash
railway login
```

3. Initialize a new project:
```bash
railway init
```

4. Add environment variables:
```bash
railway variables set DISCORD_TOKEN=your_token_here
railway variables set SPOTIFY_CLIENT_ID=your_client_id_here
railway variables set SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

5. Deploy:
```bash
railway up
```

The bot will automatically start on Railway using the `Procfile` configuration.

## Project Structure

```
.
├── src/
│   ├── commands/          # Slash commands
│   │   ├── play.ts
│   │   ├── pause.ts
│   │   ├── resume.ts
│   │   ├── skip.ts
│   │   ├── stop.ts
│   │   ├── queue.ts
│   │   ├── nowplaying.ts
│   │   ├── volume.ts
│   │   └── index.ts
│   ├── music/             # Music player logic
│   │   ├── player.ts
│   │   └── track.ts
│   ├── services/          # External API services
│   │   ├── youtube.ts
│   │   └── spotify.ts
│   ├── types/             # TypeScript type definitions
│   │   └── discord.d.ts
│   └── index.ts           # Main bot file
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── railway.json           # Railway deployment config
├── Procfile              # Process file for deployment
└── README.md
```

## Technologies Used

- **discord.js** - Discord API wrapper
- **@discordjs/voice** - Voice connection handling
- **play-dl** - YouTube audio streaming
- **spotify-web-api-node** - Spotify API integration
- **TypeScript** - Type-safe development
- **ffmpeg-static** - Audio processing

## Troubleshooting

### Bot doesn't join voice channel
- Make sure the bot has the `Connect` and `Speak` permissions
- Check if you're in a voice channel when using commands

### Music doesn't play
- Verify your API credentials are correct
- Check the console for error messages
- Ensure ffmpeg is installed (included via ffmpeg-static)

### Commands don't appear
- Wait a few minutes for Discord to register slash commands
- Try kicking and re-inviting the bot

## License

ISC

## Credits

Inspired by popular Discord music bots like Hydra and Hades.

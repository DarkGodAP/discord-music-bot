# Discord Music Bot Setup Instructions

## ✅ Repository Created
Your code is ready to be pushed to: **https://github.com/DarkGodAP/discord-music-bot**

To push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Discord music bot"
git remote add origin https://github.com/DarkGodAP/discord-music-bot.git
git branch -M main
git push -u origin main
```

## 🤖 Discord Bot Setup

1. Go to https://discord.com/developers/applications
2. Click "New Application" and name it (e.g., "Music Bot")
3. Go to the "Bot" section and click "Add Bot"
4. **Important:** Enable these Privileged Gateway Intents:
   - ✅ Server Members Intent
   - ✅ Message Content Intent
5. Copy the bot token and save it as **DISCORD_TOKEN** in Replit Secrets

### Invite Bot to Your Server
1. Go to OAuth2 > URL Generator
2. Select scopes:
   - ✅ `bot`
   - ✅ `applications.commands`
3. Select bot permissions:
   - ✅ Connect
   - ✅ Speak
   - ✅ Use Voice Activity
   - ✅ Send Messages
   - ✅ Embed Links
4. Copy the generated URL and open it in your browser to invite the bot

## 🎵 Spotify API Setup

You've already started creating your Spotify app! After saving it:

1. Go to your app dashboard at https://developer.spotify.com/dashboard
2. Copy the **Client ID** and save it as **SPOTIFY_CLIENT_ID** in Replit Secrets
3. Click "Show Client Secret", copy it, and save it as **SPOTIFY_CLIENT_SECRET** in Replit Secrets

## 🚂 Railway Deployment

Once the bot is working on Replit:

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Create a new project:
   ```bash
   railway init
   ```

4. Set environment variables:
   ```bash
   railway variables set DISCORD_TOKEN=your_token_here
   railway variables set SPOTIFY_CLIENT_ID=your_client_id_here
   railway variables set SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```

5. Deploy:
   ```bash
   railway up
   ```

The bot will automatically start on Railway using the configuration in `railway.json` and `Procfile`.

## 🎮 Using the Bot

Once deployed and invited to your server, use these slash commands:

- `/play <song name or URL>` - Play music from YouTube or Spotify
- `/pause` - Pause the current song
- `/resume` - Resume playback
- `/skip` - Skip to the next song
- `/stop` - Stop and clear the queue
- `/queue` - View the current queue
- `/nowplaying` - See what's playing
- `/volume <0-100>` - Adjust volume

## 📝 Notes

- The bot will automatically disconnect when everyone leaves the voice channel
- Spotify URLs are converted to YouTube streams for playback
- Both YouTube URLs and search queries work with `/play`

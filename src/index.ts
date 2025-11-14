import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import { commands } from './commands/index.js';
import { MusicPlayer } from './music/player.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

client.commands = new Collection();
export const musicPlayers = new Map<string, MusicPlayer>();

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
  console.log(`✅ Logged in as ${client.user?.tag}`);
  console.log(`🎵 Music bot is ready!`);
  console.log(`📊 Serving ${client.guilds.cache.size} servers`);
  
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
  
  try {
    console.log('🔄 Refreshing slash commands...');
    
    await rest.put(
      Routes.applicationCommands(client.user!.id),
      { body: commands.map(cmd => cmd.data.toJSON()) },
    );
    
    console.log('✅ Successfully registered slash commands!');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('❌ Error executing command:', error);
    const errorMessage = { content: 'There was an error executing this command!', ephemeral: true };
    
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorMessage);
    } else {
      await interaction.reply(errorMessage);
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  const player = musicPlayers.get(oldState.guild.id);
  
  if (!player) return;
  
  const botMember = oldState.guild.members.cache.get(client.user!.id);
  const botVoiceChannel = botMember?.voice.channel;
  
  if (!botVoiceChannel) return;
  
  const membersInChannel = botVoiceChannel.members.filter(member => !member.user.bot);
  
  if (membersInChannel.size === 0) {
    console.log(`👋 Everyone left the voice channel in ${oldState.guild.name}. Leaving...`);
    player.stop();
    musicPlayers.delete(oldState.guild.id);
  }
});

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error('❌ DISCORD_TOKEN not found in environment variables!');
  process.exit(1);
}

client.login(token).catch((error) => {
  console.error('❌ Failed to login:', error);
  process.exit(1);
});

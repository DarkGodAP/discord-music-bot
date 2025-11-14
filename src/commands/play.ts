import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, EmbedBuilder } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';
import { musicPlayers } from '../index.js';
import { MusicPlayer } from '../music/player.js';
import { YouTubeService } from '../services/youtube.js';
import { SpotifyService } from '../services/spotify.js';

export const play = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube or Spotify')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('Song name, YouTube URL, or Spotify URL')
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.editReply('❌ You need to be in a voice channel to play music!');
    }

    const query = interaction.options.getString('query', true);
    
    let track;
    
    if (query.includes('spotify.com')) {
      track = await SpotifyService.searchTrack(query, interaction.user.tag);
    } else {
      track = await YouTubeService.search(query, interaction.user.tag);
    }

    if (!track) {
      return interaction.editReply('❌ Could not find that song. Please try a different search!');
    }

    let player = musicPlayers.get(interaction.guildId!);

    if (!player || !player.isConnectionValid()) {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guildId!,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      player = new MusicPlayer(connection, interaction.guildId!);
      musicPlayers.set(interaction.guildId!, player);
      
      player.onQueueEnd = () => {
        console.log(`🎵 Queue ended for guild ${interaction.guildId}, cleaning up...`);
        player?.stop();
        musicPlayers.delete(interaction.guildId!);
      };
    }

    await player.addTrack(track);

    const embed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle('🎵 Added to Queue')
      .setDescription(`**${track.title}**`)
      .addFields(
        { name: 'Duration', value: track.getFormattedDuration(), inline: true },
        { name: 'Requested by', value: track.requestedBy, inline: true },
        { name: 'Position in queue', value: `${player.queue.length + (player.currentTrack ? 1 : 0)}`, inline: true }
      );

    if (track.thumbnail) {
      embed.setThumbnail(track.thumbnail);
    }

    await interaction.editReply({ embeds: [embed] });
  },
};

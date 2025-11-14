import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { musicPlayers } from '../index.js';

export const nowplaying = {
  data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Show the currently playing song'),

  async execute(interaction: ChatInputCommandInteraction) {
    const player = musicPlayers.get(interaction.guildId!);

    if (!player || !player.currentTrack) {
      return interaction.reply({ content: '❌ No music is currently playing!', ephemeral: true });
    }

    const track = player.currentTrack;

    const embed = new EmbedBuilder()
      .setColor(0xe74c3c)
      .setTitle('🎵 Now Playing')
      .setDescription(`**${track.title}**`)
      .addFields(
        { name: 'Duration', value: track.getFormattedDuration(), inline: true },
        { name: 'Requested by', value: track.requestedBy, inline: true },
        { name: 'Platform', value: track.platform === 'youtube' ? 'YouTube' : 'Spotify', inline: true }
      )
      .setTimestamp();

    if (track.thumbnail) {
      embed.setThumbnail(track.thumbnail);
    }

    await interaction.reply({ embeds: [embed] });
  },
};

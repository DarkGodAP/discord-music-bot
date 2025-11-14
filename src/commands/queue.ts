import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { musicPlayers } from '../index.js';

export const queue = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show the current music queue'),

  async execute(interaction: ChatInputCommandInteraction) {
    const player = musicPlayers.get(interaction.guildId!);

    if (!player || (!player.currentTrack && player.queue.length === 0)) {
      return interaction.reply({ content: '❌ The queue is empty!', ephemeral: true });
    }

    const embed = new EmbedBuilder()
      .setColor(0x3498db)
      .setTitle('🎵 Music Queue')
      .setTimestamp();

    if (player.currentTrack) {
      embed.addFields({
        name: '🎵 Now Playing',
        value: `**${player.currentTrack.title}**\nDuration: ${player.currentTrack.getFormattedDuration()}\nRequested by: ${player.currentTrack.requestedBy}`,
      });
    }

    if (player.queue.length > 0) {
      const queueList = player.queue
        .slice(0, 10)
        .map((track, index) => `${index + 1}. **${track.title}** (${track.getFormattedDuration()})`)
        .join('\n');

      embed.addFields({
        name: `📋 Up Next (${player.queue.length} songs)`,
        value: queueList + (player.queue.length > 10 ? '\n...and more' : ''),
      });
    }

    await interaction.reply({ embeds: [embed] });
  },
};

import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { musicPlayers } from '../index.js';

export const stop = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the music and clear the queue'),

  async execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: '❌ You need to be in a voice channel!', ephemeral: true });
    }

    const player = musicPlayers.get(interaction.guildId!);

    if (!player) {
      return interaction.reply({ content: '❌ No music is currently playing!', ephemeral: true });
    }

    player.stop();
    musicPlayers.delete(interaction.guildId!);

    await interaction.reply('⏹️ Stopped the music and cleared the queue!');
  },
};

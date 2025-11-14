import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { musicPlayers } from '../index.js';

export const resume = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the paused song'),

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

    if (player.resume()) {
      await interaction.reply('▶️ Resumed the music!');
    } else {
      await interaction.reply({ content: '❌ Music is not paused!', ephemeral: true });
    }
  },
};

import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { musicPlayers } from '../index.js';

export const pause = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current song'),

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

    if (player.pause()) {
      await interaction.reply('⏸️ Paused the music!');
    } else {
      await interaction.reply({ content: '❌ Music is already paused!', ephemeral: true });
    }
  },
};

import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { musicPlayers } from '../index.js';

export const skip = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current song'),

  async execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: '❌ You need to be in a voice channel!', ephemeral: true });
    }

    const player = musicPlayers.get(interaction.guildId!);

    if (!player || !player.currentTrack) {
      return interaction.reply({ content: '❌ No music is currently playing!', ephemeral: true });
    }

    const skippedTrack = player.currentTrack.title;
    player.skip();

    await interaction.reply(`⏭️ Skipped: **${skippedTrack}**`);
  },
};

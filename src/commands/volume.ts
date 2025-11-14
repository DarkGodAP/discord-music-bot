import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { musicPlayers } from '../index.js';

export const volume = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Adjust the music volume')
    .addIntegerOption(option =>
      option
        .setName('level')
        .setDescription('Volume level (0-100)')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100)
    ),

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

    const volumeLevel = interaction.options.getInteger('level', true);
    player.setVolume(volumeLevel / 100);

    await interaction.reply(`🔊 Volume set to **${volumeLevel}%**`);
  },
};

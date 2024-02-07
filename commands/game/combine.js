const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('combine')
		.setDescription('Combine 2 elements to create a new one!'),
	async execute(interaction) {
        await interaction.deferReply();
        console.log(interaction);
		await interaction.editReply('Pong!');
	},
};

function Combinator () {

}
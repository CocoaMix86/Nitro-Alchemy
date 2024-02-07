const { SlashCommandBuilder } = require('discord.js');
var Grapheme = require('grapheme-splitter');
var splitter = new Grapheme();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('combine')
		.setDescription('Combine 2 elements to create a new one!')
		.addStringOption(option => 
			option.setName('first')
				.setDescription('Enter 1 unicode symbol')
				.setRequired(true)
				.setMaxLength(4))
		.addStringOption(option =>
			option.setName('second')
				.setDescription('Enter 1 unicode symbol')
				.setRequired(true)
				.setMaxLength(4)),
	async execute(interaction) {
        await interaction.deferReply();

		const elm1 = interaction.options.getString('first');
		const elm2 = interaction.options.getString('second');
		console.log(elm1 + elm2);
		console.log(`${elm1.length} ${elm2.length}`);

		const out = Combinator(elm1, elm2);

		if (out)
			await interaction.editReply(combinedelement);
		else
			await interaction.editReply('One of the inputs was not a single unicode characters.');
	},
};

var combinedelement = "";
function Combinator (element1, element2) {
	unicodeCheck = true;
	if (!GraphemeCheck(element1) || !GraphemeCheck(element2))
		return false;

	combinedelement = element1 + element2;
	return true;
}

function GraphemeCheck(s) {
    var length = splitter.splitGraphemes(s).length
	if (length == 1) 
		return true;
	else
		return false;
}
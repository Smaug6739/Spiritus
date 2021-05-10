// const { MessageEmbed } = require('discord.js')
module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;
	const settings = await client.getGuild(interaction.guild);

	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	let data = [];
	if (command.help.subcommands && command.help.subcommands.length) {
		data.push({ subcommand: interaction.options[0].name, }, { args: [] })
		let pos = undefined;
		command.help.subcommands.map(function (e) {
			if (e.args) pos = e[e.args];
		})
		if (pos && pos.length) {
			interaction.options[0].options.map(a => {
				data.push({
					[a.name]: a.value
				})
			})
		}
	}
	try {
		await command.run(client, interaction, data, settings)
	} catch (e) {
		console.error(e)
	}
};
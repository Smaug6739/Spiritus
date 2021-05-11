const { Collection } = require('discord.js')
module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;
	const settings = await client.getGuild(interaction.guild);

	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	/* ---------------PERMISSIONS--------------- */
	if (command.help.moderator) {
		const isMod = await client.checkMod(interaction.member, settings)
		if (!isMod || isMod == false) return interaction.replyErrorMessage(`You don't have permissions for use this command.`);
	}

	if (command.help.userPermissions && command.help.userPermissions.length) {
		for (const permission of command.help.userPermissions) {
			if (!interaction.member.permissions.has(permission)) return interaction.replyErrorMessage(`You need the \`${command.help.userPermissions.map(command => command.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")).join(', ')}\` permission(s) for use this command.`)
		}
	}
	if (command.help.botPermissions && command.help.botPermissions.length) {
		for (const permission of command.help.botPermissions) {
			if (!interaction.guild.me.permissions.has(permission)) return interaction.replyErrorMessage(`I need the \`${command.help.botPermissions.map(command => command.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")).join(', ')}\` permission(s) for this command.`)
		}
	}

	/* ---------------COOLDOWNS--------------- */
	if (!client.cooldowns.has(command.help.name)) {
		client.cooldowns.set(command.help.name, new Collection());
	};
	const timeNow = Date.now();
	const tStamps = client.cooldowns.get(command.help.name);
	const cdAmount = (command.help.cooldown || 5) * 1000;
	if (tStamps.has(interaction.user.id)) {
		const cdExpirationTime = tStamps.get(interaction.user.id) + cdAmount;
		if (timeNow < cdExpirationTime) {
			timeLeft = (cdExpirationTime - timeNow) / 1000;
			return interaction.replyErrorMessage(`Please wait ${timeLeft.toFixed(0)} second(s) before using the command \`${command.help.name}\` again .`);
		}
	}
	tStamps.set(interaction.user.id, timeNow);
	setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);

	/* ---------------ARGS--------------- */
	let data = [];
	if (command.help.args && command.help.args.length) {
		data.push({ subcommand: interaction.options[0].name, })
		interaction.options.map(arg => {
			data.push({
				[arg.name]: arg.value
			})
		})
	}
	if (command.help.subcommands && command.help.subcommands.length) {
		data.push({ subcommand: interaction.options[0].name, })
		const hasArgs = command.help.subcommands.map(sub => {
			if (interaction.options[0].name === sub.name && sub.args) return sub.args.length >= 1
		});
		if (hasArgs.includes(true)) {
			interaction.options[0].options.map(a => {
				data.push({
					[a.name]: a.value
				})
			})
		}
	}
	/* ---------------ARGS--------------- */
	try {
		await command.run(client, interaction, data, settings)
	} catch (e) {
		console.error(e)
	}

};
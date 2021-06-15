export default async (spiritus: any, interaction: any) => {
	if (!interaction.isCommand()) return;
	const settings = await spiritus.db.getGuild(interaction.guild.id);
	/* -----------------COMMAND----------------- */
	const command = spiritus.commands.get(interaction.commandName);
	if (!command) return;
	/* --------------IGNORE-CHANNEL------------- */
	if (settings.ignoreChannel) {
		if (settings.ignoreChannel.includes(interaction.channel.id)) return interaction.replyErrorMessage('This is a ignored channel.');
	}
	/* ---------------PERMISSIONS--------------- */
	if (command.userPermissions.includes('MODERATOR')) {
		const isMod = await spiritus.util.checkMod(interaction.member, settings)
		if (!isMod || isMod == false) return interaction.replyErrorMessage(`You don't have permissions for use this command.`);
	}

	if (command.userPermissions.length) {
		for (const permission of command.userPermissions) {
			if (!interaction.member.permissions.has(permission)) return interaction.replyErrorMessage(`You need the \`${command.userPermissions.map((command: string) => command.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")).join(', ')}\` permission(s) for use this command.`)
		}
	}
	if (command.botPermissions.length) {
		for (const permission of command.botPermissions) {
			if (!interaction.guild.me.permissions.has(permission)) return interaction.replyErrorMessage(`I need the \`${command.botPermissions.map((command: string) => command.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")).join(', ')}\` permission(s) for this command.`)
		}
	}
	/* ---------------COOLDOWNS--------------- */
	if (!spiritus.config.ADMIN.includes(interaction.user.id)) {
		if (!spiritus.cooldowns.has(command.help.name)) {
			spiritus.cooldowns.set(command.help.name, new Map());
		};
		const timeNow = Date.now();
		const tStamps = spiritus.cooldowns.get(command.help.name);
		const cdAmount = (command.help.cooldown || 5) * 1000;
		if (tStamps.has(interaction.user.id)) {
			const cdExpirationTime = tStamps.get(interaction.user.id) + cdAmount;
			if (timeNow < cdExpirationTime) {
				const timeLeft = (cdExpirationTime - timeNow) / 1000;
				return interaction.replyErrorMessage(`Please wait ${timeLeft.toFixed(0)} second(s) before using the command \`${command.help.name}\` again .`);
			}
		}
		tStamps.set(interaction.user.id, timeNow);
		setTimeout(() => tStamps.delete(interaction.user.id), cdAmount);
	}
	/* ---------------COMMAND--------------- */
	try {
		await command.execute(interaction, interaction.options, settings)
	} catch (e) {
		console.error(e)
	}
}
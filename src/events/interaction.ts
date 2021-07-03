import type { ICommandInteraction } from '../typescript/interfaces';
import type Spiritus from '../main';
export default class {
	spiritus: typeof Spiritus;
	constructor(spiritus: typeof Spiritus) {
		this.spiritus = spiritus;
	}
	async run(interaction: ICommandInteraction) {
		if (!interaction.isCommand()) return;
		const settings = await this.spiritus.db.getGuild(interaction.guild!.id);
		let member = interaction.guild!.members.cache.get(interaction.user.id);
		if (!member) member = await interaction.guild!.members.fetch(interaction.user.id);
		/* -----------------COMMAND----------------- */
		const command = this.spiritus.commands.get(interaction.commandName);
		if (!command) return;
		/* --------------IGNORE-CHANNEL------------- */
		if (settings.ignoreChannel) {
			if (settings.ignoreChannel.includes(interaction.channel?.id)) return interaction.replyErrorMessage('This is a ignored channel.');
		}
		/* ---------------PERMISSIONS--------------- */
		if (command.userPermissions.includes('MODERATOR')) {
			const isMod = await this.spiritus.util.checkMod(interaction.member, settings)
			if (!isMod || isMod == false) return interaction.replyErrorMessage(`You don't have permissions for use this command.`);
		}
		if (command.userPermissions.includes('BOT_ADMIN') && !this.spiritus.admins.includes(interaction.user.id)) {
			return interaction.replyErrorMessage(`You don't have permissions for use this command.`);
		}

		if (command.userPermissions.length) {
			for (const permission of command.userPermissions) {
				if (!interaction.guild?.members.cache.get(interaction.user.id)!.permissions.has(permission))
					return interaction.replyErrorMessage(`You need the \`${command.userPermissions.map((command: string) => command.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")).join(', ')}\` permission(s) for use this command.`)
			}
		}
		if (command.botPermissions.length) {
			for (const permission of command.botPermissions) {
				if (!interaction.guild!.me!.permissions.has(permission)) return interaction.replyErrorMessage(`I need the \`${command.botPermissions.map((command: string) => command.split("_").map(x => x[0] + x.slice(1).toLowerCase()).join(" ")).join(', ')}\` permission(s) for this command.`)
			}
		}
		/* ---------------COOLDOWNS--------------- */
		if (!this.spiritus.admins.includes(interaction.user.id)) {
			if (!this.spiritus.cooldowns.has(command.help.name)) {
				this.spiritus.cooldowns.set(command.help.name, new Map());
			};
			const timeNow = Date.now();
			const tStamps = this.spiritus.cooldowns.get(command.help.name);
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
		/* ---------------SUB-COMMAND--------------- */
		if (interaction.options?.first()) {
			interaction.options.each((o: any) => {
				if (o.type === 'SUB_COMMAND') interaction.subcommand = o.name
			})
		}
		if (!interaction.subcommand) interaction.subcommand = null;
		/* ---------------OPTIONS--------------- */
		let args = null;
		if (!interaction.subcommand) args = interaction.options;
		else args = interaction.options.get(interaction.subcommand)?.options

		/* ---------------COMMAND--------------- */
		try {
			await command.execute(interaction, args, settings)
		} catch (e) {
			console.error(e)
		}
	}
}
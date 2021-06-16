import { MessageAttachment } from 'discord.js'
import Command from '../CommandClass';
import type { ICommandInteraction, ICommandArgs, IGuildDB } from '../../typescript/interfaces';
import Canvas from 'canvas';

export default class extends Command {

	constructor(spiritus: any) {
		super(spiritus, {
			name: 'rank',
			aliases: [],
			args: [
				{
					name: 'user',
					description: 'User to be banned',
					type: 'STRING',
					required: false
				},
			],
			description: 'View rank of user',
			category: 'Experience',
			cooldown: 5,
			userPermissions: [],
			botPermissions: [],
			subCommands: [],
		})
	}
	async execute(interaction: ICommandInteraction, args: ICommandArgs, settings: IGuildDB) {
		if (!settings.expsysteme) return interaction.replyErrorMessage(`The experience system is not activated on this server. To activate it use the command \`/config experience\`.`)
		let dbUser;
		let user;
		if (args.get('user')) {
			user = await this.spiritus.util.resolveMember(interaction.guild, args.get('user').value)
			user = user.user
			if (!user) return interaction.replyErrorMessage('User not found.');
			dbUser = await this.spiritus.db.getUser(interaction.guild!.id, user.id);
			if (!dbUser) return interaction.replyErrorMessage('User not found.');
		} else {
			dbUser = await this.spiritus.db.getUser(interaction.guild!.id, interaction.user.id);
			if (!dbUser) return interaction.replyErrorMessage('User not found');
			user = interaction.user;
		}
		let progress = dbUser.experience
		progress = 0.1 * Math.sqrt(dbUser.experience)
		progress = progress.toFixed(2)
		progress = progress.split(".")
		progress.shift()
		const applyText = (canvas: any, text: any) => {
			const ctx = canvas.getContext('2d');
			let fontSize = 60;
			do {
				ctx.font = `${fontSize -= 10}px sans-serif`;
			} while (ctx.measureText(text).width > canvas.width - 350);
			return ctx.font;
		};
		const canvas = Canvas.createCanvas(700, 220);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage(settings.rankcard);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		ctx.font = '30px sans-serif';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(`Level : ${dbUser.level}`, canvas.width / 2.5, canvas.height / 2);
		ctx.fillText(`Experience : ${dbUser.experience}xp`, canvas.width / 2.5, canvas.height / 1.57);
		ctx.fillText(`Votre progression : ${progress}%`, canvas.width / 2.5, canvas.height / 1.27);
		ctx.font = applyText(canvas, `${user.username}!`);
		ctx.fillStyle = '#ffffff';
		ctx.fillText(`${dbUser.username}!`, canvas.width / 2.5, canvas.height / 3.5);
		ctx.beginPath();
		ctx.arc(106, 106, 83, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.clip();
		const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(avatar, 22, 22, 165, 165);
		const attachment = new MessageAttachment(canvas.toBuffer(), 'rank-image.png');
		return interaction.reply({ files: [attachment] });
	}
}
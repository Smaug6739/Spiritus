const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js')
module.exports.run = async (client, message, args, settings, dbUser) => {
    if (!settings.expsysteme) return message.channel.sendErrorMessage(`The experience system is not activated on this server. To activate it use the command \`${settings.prefix} config experience\`.`);

    const memberResolve = await client.resolveMember(message.guild, args[0])
    if (!dbUser && !memberResolve) return message.channel.sendErrorMessage(`You don't have exp points. Please try again.`)
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 60;
        do {
            ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 350);
        return ctx.font;
    };
    if (memberResolve) {
        const mentionUser = await client.getUser(memberResolve, message.member.guild.id)
        if (mentionUser) {
            let pourcentage = dbUser.experience
            pourcentage = 0.1 * Math.sqrt(mentionUser.experience)
            pourcentage = pourcentage.toFixed(2)
            pourcentage = pourcentage.split(".")
            pourcentage.shift()
            const canvas = Canvas.createCanvas(700, 220);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage(settings.rankcard);
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = '30px sans-serif';
            ctx.fillStyle = '#ffffff';
            //ctx.fillText(`Rank du serveur,${member.displayName}!`, canvas.width / 2.8, canvas.height / 3.5);
            ctx.fillText(`Level : ${mentionUser.level}`, canvas.width / 2.5, canvas.height / 2);
            ctx.fillText(`Experience : ${mentionUser.experience}xp`, canvas.width / 2.5, canvas.height / 1.57);
            ctx.fillText(`Votre progression : ${pourcentage}%`, canvas.width / 2.5, canvas.height / 1.27);
            ctx.font = applyText(canvas, `${mentionUser.username}!`);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${mentionUser.username}!`, canvas.width / 2.5, canvas.height / 3.5);
            ctx.beginPath();
            ctx.arc(106, 106, 83, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.clip();
            const avatar = await Canvas.loadImage(memberResolve.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 22, 22, 165, 165);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'rank-image.png');
            return message.channel.send(`\u200b`, attachment);
        } else {
            return message.channel.sendErrorMessage(`Mentioned user not have rank.`)
        }
    } else {
        let pourcentage = dbUser.experience
        pourcentage = 0.1 * Math.sqrt(dbUser.experience)
        pourcentage = pourcentage.toFixed(2)
        pourcentage = pourcentage.split(".")
        pourcentage.shift()
        //message.reply(`Votre progression : ${pourcentage}`)
        const canvas = Canvas.createCanvas(700, 220);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage(settings.rankcard);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.ba
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px sans-serif';
        ctx.fillStyle = '#ffffff';
        //ctx.fillText(`Rank du serveur,${member.displayName}!`, canvas.width / 2.8, canvas.height / 3.5);
        ctx.fillText(`Level : ${dbUser.level}`, canvas.width / 2.5, canvas.height / 2);
        ctx.fillText(`Experience : ${dbUser.experience}xp`, canvas.width / 2.5, canvas.height / 1.57);
        ctx.fillText(`Votre progression : ${pourcentage}%`, canvas.width / 2.5, canvas.height / 1.27);
        //ctx.font = applyText(canvas, `${message.member.displayName}!`);
        //ctx.fillStyle = '#ffffff';
        ctx.fillText(`${dbUser.username}!`, canvas.width / 2.5, canvas.height / 3.5);
        ctx.beginPath();
        ctx.arc(106, 106, 83, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.clip();
        const avatar = await Canvas.loadImage(message.member.user.displayAvatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 22, 22, 165, 165);
        const attachment = new MessageAttachment(canvas.toBuffer(), 'rank-image.png');
        message.channel.send(`\u200b`, attachment);
    }
};

module.exports.help = {
    name: 'rank',
    aliases: ['rank', 'exp'],
    category: 'experience',
    description: 'View your rank or rank of member.',
    cooldown: 10,
    usage: '<@user>',
    exemple: ["rank @Smaug"],
    permissions: false,
    isUserAdmin: false,
    args: false,
    subcommands: []
}
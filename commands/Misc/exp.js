const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js')
module.exports.run = async (client, message, args, settings, dbUser) => {
    if (settings.expsysteme) {
        member = message.mentions.members.first() || message.member
        const channel = message.channel
        if (!dbUser) return message.channel.send(`${client.config.emojis.error}Vous n'avez jamais envoyer de messages. Merci de réessayer.`)
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
            let fontSize = 60;
            do {
                ctx.font = `${fontSize -= 10}px sans-serif`;
            } while (ctx.measureText(text).width > canvas.width - 350);
            return ctx.font;
        };
        if (message.mentions.users.first()) {
            const use = message.mentions.users.first()
            const user = message.guild.member(message.mentions.users.first());
            const mentionUser = await client.getUser(user, message.member.guild.id)
            if (mentionUser != undefined) {
                let pourcentage = dbUser.experience
                pourcentage = 0.1 * Math.sqrt(mentionUser.experience)
                pourcentage = pourcentage.toFixed(2)
                pourcentage = pourcentage.split(".")
                pourcentage.shift()
                //message.reply(`Votre progression : ${pourcentage}`)
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
                const avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg' }));
                ctx.drawImage(avatar, 22, 22, 165, 165);
                const attachment = new MessageAttachment(canvas.toBuffer(), 'rank-image.png');
                channel.send(`\u200b`, attachment);
            } else {
                //Si la persnne mentionné a pas de rank
                return message.channel.send(`${client.config.emojis.FALSE} La personne mentionné n'a pas de rank.`)
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
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 22, 22, 165, 165);
            const attachment = new MessageAttachment(canvas.toBuffer(), 'rank-image.png');
            channel.send(`\u200b`, attachment);
        }
    } else {
        return message.channel.send(`${client.config.emojis.error}Le système d'experience n'est pas activer sur ce serveur. Pour l'activer utilisez la commande \`${settings.prefix}config experience\``)
    }
};

module.exports.help = {
    name: 'rank',
    aliases: ['rank', 'uexp', 'exp', 'userexperience'],
    category: 'misc',
    description: 'Donne l\'exp d\'une personne.',
    cooldown: 10,
    usage: '<@user>',
    exemple: ["rank @Smaug"],
    permissions: false,
    isUserAdmin: false,
    args: false,
    sousCommdandes: []
}
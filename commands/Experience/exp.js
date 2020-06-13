const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args, settings, dbUser) => {
 if(settings.expsysteme){

    const Canvas = require('canvas');
    const Discord = require('discord.js')
    member = message.mentions.members.first() || message.member
    const channel = message.channel
    if(!dbUser) return message.channel.send("Vous n'avez jamais envoyer de messages. Merci de réessayer.")

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        let fontSize = 70;
        do {
           ctx.font = `${fontSize -= 10}px sans-serif`;
        } while (ctx.measureText(text).width > canvas.width - 300);
        return ctx.font;
        };
        if(message.mentions.users.first()){
            const use = message.mentions.users.first()
            const user = message.guild.member(message.mentions.users.first());
            const mentionUser = await client.getUser(user, message.member.guild.id)
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://discordjs.guide/assets/img/2vsIPEP.3f295fd2.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('Rank du serveur,', canvas.width / 2.5, canvas.height / 3.5);
            ctx.fillText(`Level :${mentionUser.level}`, canvas.width / 2.5, canvas.height / 1.4);
            ctx.fillText(`Experience :${mentionUser.experience}xp`, canvas.width / 2.5, canvas.height / 1.2);
            ctx.font = applyText(canvas, `${member.displayName}!`);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${user.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            const avatar = await Canvas.loadImage(user.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 25, 25, 200, 200);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank-image.png');
            channel.send(`\u200b`, attachment);
        }else{
            const canvas = Canvas.createCanvas(700, 250);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage('https://discordjs.guide/assets/img/2vsIPEP.3f295fd2.png');
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#74037b';
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = '28px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('Rank du serveur,', canvas.width / 2.5, canvas.height / 3.5);
            ctx.fillText(`Level :${dbUser.level}`, canvas.width / 2.5, canvas.height / 1.4);
            ctx.fillText(`Experience :${dbUser.experience}xp`, canvas.width / 2.5, canvas.height / 1.2);
            ctx.font = applyText(canvas, `${member.displayName}!`);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
            ctx.beginPath();
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
            ctx.drawImage(avatar, 25, 25, 200, 200);
            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank-image.png');
            channel.send(`\u200b`, attachment);
        }
 }
};






module.exports.help = {
    
    name : 'exp',
    aliases : [''],
    category : 'experience',
    description : 'Donne l\'exp d\'une personne.',
    cooldown : 10,
    usage : '<@user>',
    exemple :["exp @Smaug"],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}
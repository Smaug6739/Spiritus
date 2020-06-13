module.exports.run = (client, message, args, settings) => {
    if(settings.expsysteme){
        //-------------------------------------------ADD-EXPERIENCE-----------------------------------------
        if(args[0] === 'add'){
            const user = message.guild.member(message.mentions.users.first());
            const expToAdd = parseInt(args[2]);
            if (isNaN(expToAdd)) return message.reply("vous devez entrer un nombre valide !");
            client.addExp(client, user, expToAdd);
            message.channel.send(`Vous avez ajouté avec succès ${expToAdd} points d'expérience à l'utilisateur ${user}!`);
        //-------------------------------------------REM-EXPERIENCE-----------------------------------------
        }else if(args[0] === 'rem'){
            const user = message.guild.member(message.mentions.users.first());
            const expToRemove = parseInt(args[2]);
            if (isNaN(expToRemove)) return message.reply("vous devez entrer un nombre valide !");
            client.removeExp(client, user, expToRemove);
            message.channel.send(`Vous avez enlevé avec succès ${expToRemove} points d'expérience à l'utilisateur ${user}!`);
        }
    }else{
        return message.channel.send('Le système d\'exp n\'est pas activé sur ce serveur.');
    };
};
module.exports.help = {

name : 'experience',
aliases : ['experience','exp','uexp'],
category : 'experience',
description : 'Enleve de l\'exp a une personne.',
cooldown : 10,
usage : '<@user> <exp_to_add>',
exemple :["remexp @Smaug 1500"],
permissions : true,
isUserAdmin: false,
args : false,
sousCommdandes : ["experience add", "experience rem"]

}
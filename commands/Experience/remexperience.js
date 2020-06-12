module.exports.run = (client, message, args, settings) => {
    if(settings.expsysteme){

        const user = message.guild.member(message.mentions.users.first());
        const expToRemove = parseInt(args[1]);
        if (isNaN(expToRemove)) return message.reply("faut entrer un nombre ");
        client.removeExp(client, user, expToRemove);
        message.channel.send(`Vous avez enlevé avec succès ${expToRemove} points d'expérience à l'utilisateur ${user}!`);
    }else{
        return message.channel.send('Le système d\'exp n\'est pas activé sur ce serveur.');
    }
  };
module.exports.help = {

name : 'removeexperience',
aliases : ['removeexperience','remexp'],
category : 'experience',
description : 'Enleve de l\'exp a une personne.',
cooldown : 10,
usage : '<@user> <exp_to_add>',
exemple :["remexp @Smaug 1500"],
permissions : true,
isUserAdmin: false,
args : true,
sousCommdandes : []

}
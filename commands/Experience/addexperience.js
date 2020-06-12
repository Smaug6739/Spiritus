module.exports.run = (client, message, args, settings) => {
    if(settings.expsysteme){

        const user = message.guild.member(message.mentions.users.first());
        const expToAdd = parseInt(args[1]);
        if (isNaN(expToAdd)) return message.reply("faut entrer un nombre");
        client.addExp(client, user, expToAdd);
        message.channel.send(`Vous avez ajouté avec succès ${expToAdd} points d'expérience à l'utilisateur ${user}!`);
    }else{
        return message.channel.send('Le système d\'exp n\'est pas activé sur ce serveur.');
    }
  };
module.exports.help = {

name : 'addexperience',
aliases : ['addexperience','addexp'],
category : 'experience',
description : 'Donne de l\'exp a une personne.',
cooldown : 10,
usage : '<@user> <exp_to_add>',
exemple :["addexp @Smaug 1500"],
permissions : true,
isUserAdmin: false,
args : true,
sousCommdandes : []
}
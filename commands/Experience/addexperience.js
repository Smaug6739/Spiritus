module.exports.run = (client, message, args) => {
    const user = message.guild.member(message.mentions.users.first());
    const expToAdd = parseInt(args[1]);
    if (isNaN(expToAdd)) return message.reply("faut entrer un nombre");
    client.addExp(client, user, expToAdd);
    message.channel.send(`Vous avez ajouté avec succès ${expToAdd} points d'expérience à l'utilisateur ${user}!`);
  };
module.exports.help = {

name : 'addexperience',
aliases : ['addexperience','addexp'],
category : 'experience',
description : 'Donne de l\'exp a une personne.',
cooldown : 10,
usage : '<@user> <exp_to_add>',
//exemple :["channel-create text nom"],
permissions : true,
isUserAdmin: false,
args : true
}
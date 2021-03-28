module.exports.run = async (client, message, args) => {
  if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission pour renomer un utilisateur.`);

  //let utilisateur = message.mentions.members.first();
  let utilisateur = await client.resolveMember(message.guild, args[0])
  if (utilisateur == undefined) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver cet utilisateur.`)
  let newName = args.slice(1).join(" ");
  if (newName.length > 12) return message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas choisir un pseudo qui fais plus de 12 caractères.`)
  if (newName.length < 2) return message.channel.send(`${client.config.emojis.FALSE}Vous ne pouvez pas choisir un pseudo qui fais moins de 2 caractères.`)
  utilisateur.setNickname(newName)
    .then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien mis a jour le nom de l'utilisateur ${utilisateur}.`))
  //.catch(message.channel.send(`${client.config.emojis.FALSE}Une erreur s'est produite merci de réessayer.`))

};

module.exports.help = {
  name: "rename",
  aliases: ['rename', 'rname'],
  category: 'moderation',
  description: "Change le pseudo d'un utilisateur.",
  cooldown: 10,
  usage: '<@user> <new_name>',
  exemple: ["rename @Smaug Dragon"],
  isUserAdmin: false,
  permissions: true,
  args: true,
  sousCommdandes: []
};
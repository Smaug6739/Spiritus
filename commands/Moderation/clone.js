module.exports.run = (client, message, args) => {
    let { TRUE } = require('../../configstyle');

   /* message.guild.parent.lockPermissions()
    .then(`${TRUE}J'ai bien fermer le channel `)
    .catch(console.error)*/
    message.channel.clone().then(message.channel.delete())
}

module.exports.help = {
    name: "clone",
    aliases: ['clone'],
    category : 'manangement',
    description: "Clone un channel et le supprime",
    cooldown: 0.1,
    usage: '',
    //exemple :["kick @Smaug spam"],
    isUserAdmin: false,
    permissions: true,
    args: false
  };
module.exports.run = (client, message, args) => {
    let { TRUE,FALSE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier ce channel.`);



    message.channel.clone().then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${message.channel.name}`))
}

module.exports.help = {
    name: "channel-clone",
    aliases: ['channel-clone','clone','channel-clo'],
    category : 'manangement',
    description: "Clone un channel et le supprime",
    cooldown: 0.1,
    usage: '',
    //exemple :["kick @Smaug spam"],
    isUserAdmin: false,
    permissions: true,
    args: false
  };
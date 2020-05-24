module.exports.run = (client, message, args) => {
    let { TRUE } = require('../../configstyle');


    message.channel.clone().then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${message.channel.name}`))
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
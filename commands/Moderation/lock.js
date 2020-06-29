module.exports.run = (client, message, args) => {
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier ce channel.`);


    let channel = client.resolveChannel(message.guild, args[0])
    if(channel == undefined)return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce channel.`)

    channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false
    })
    .then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien lock le channel <#${lien}>`))
    .catch(console.error);
      
}

module.exports.help = {
    name: "lock",
    aliases: ['lock'],
    category : 'moderation',
    description: "Lock un channel",
    cooldown: 10,
    usage: '<#channel> ou <710761432534351925>',
    exemple :["lock #general"],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes : []
  };
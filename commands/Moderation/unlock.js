module.exports.run = (client, message, args) => {
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas la permission de modifier ce channel.`);
    
    let channel = client.resolveChannel(message.guild, args[0])
    if(channel == undefined)return message.channel.send(`${client.config.emojis.FALSE}Je n'ai pas trouver ce channel.`)

    channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: true
    })
    .then(message.channel.send(`${client.config.emojis.TRUE}J'ai bien unlock le channel ${channel}`))
    .catch(console.error);
      
}

module.exports.help = {
    name: "unlock",
    aliases: ['unlock'],
    category : 'moderation',
    description: "Unlock un channel.",
    cooldown: 5,
    usage: '<#salon> ou <salon_name> ou <id_salon>',
    exemple :["unlock #general"],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes : []
  };
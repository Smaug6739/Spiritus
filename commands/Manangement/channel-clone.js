module.exports.run = (client, message, args) => {
    let { TRUE,FALSE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier ce channel.`);

    try{
        message.channel.clone()
        .then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${message.channel.name}`))
        .catch(`${FALSE}Une erreur s'est produite merci de ressayer`)

    }catch(err){
        message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
        client.channels.cache.get('716325736675410000').send(`Une erreur sur la commande \`channel-clone\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
    }
}

module.exports.help = {
    name: "channel-clone",
    aliases: ['channel-clone','channel-clo','clone'],
    category : 'manangement',
    description: "Clone un channel et le supprime",
    cooldown: 0.1,
    usage: '',
    //exemple :["kick @Smaug spam"],
    isUserAdmin: false,
    permissions: true,
    args: false
  };
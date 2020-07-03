module.exports.run = (client, message, args) => {
    let { TRUE,FALSE } = require('../../configstyle');
    if(!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`${FALSE}Je n'ai pas la permission de modifier ce channel.`);
    if(!args[0]){
        try{
            message.channel.clone()
            .then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${message.channel.name}`))
            .catch(`${FALSE}Une erreur s'est produite merci de ressayer`)
    
        }catch(err){
            message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
            client.channels.cache.get('716325736675410000').send(`Une erreur sur la commande \`channel-clone\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
        }
    }else{
        let channelname = message.guild.channels.cache.find(r => r.name === args.toString())
        let liensalon = message.guild.channels.cache.find(r => r.id === args[0].replace(/<.*#/, '').slice(0, -1));
        if(liensalon){
            let nomname = liensalon.name
            try{
            message.guild.channels.cache.get(liensalon.id).clone()
            .then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${nomname}`))
            .catch(`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
            }catch(err){
                message.channel.send(`${FALSE}Une erreur s'est produite merci de ressayer`)
                client.channels.cache.get('716325736675410000').send(`Une erreur sur la commande \`channel-clone\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``)
            }
    
        }else if(channelname){
            try{
            channelname.clone()
            .then(message.channel.send(`${TRUE}J'ai bien cloner le channel ${args[0]}`))
            //.catch(message.channel.send`${FALSE} Une erreur s'est produite. Merci de réessayer.`)
            }catch(err){
                message.channel.send(`${FALSE}Une erreur s'est produite merci de réessayer`);
                client.channels.cache.get('716371683526836312').send(`Une erreur sur la commande \`channel-delete\` s'est produite sur le serveur : ${message.guild.name}.\n\`ERREUR :\`\n\`\`\`xl\n${err}\`\`\``);
                return;
            };
        
        }else{
            return message.channel.send(`${FALSE}Le channel a cloner est introuvable...`)
        }
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
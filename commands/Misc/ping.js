const {MessageEmbed} = require('discord.js')
module.exports.run =(client, message, args) => {

    let debut = Date.now();
    message.channel.send('Pong !').then(async(m) => await m.edit(`Pong  BOT : \`${Date.now()-debut}ms\` API : \`${client.ws.ping}ms\``));
   /*try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        client.commands.delete(args[0])
        const pull = require(`./${args[0]}.js`)
        client.commands.set(args[0], pull)
        message.channel.send(`${client.config.emojis.TRUE}Reloaded command \`${args}\``);
    } catch (err) {
        return message.channel.send(`${client.config.emojis.FALSE}An error occured: \n\`\`\`js\n${err}\n\`\`\``);
    }*/
    /* let user = client.resolveGuildEmoji(message.guild, args[0])
    if(user == undefined) user = 'Je n\'ai pas trouver cet user'
    console.log(user)*/
   /* const test = client.users.fetch(args[0]).then(m =>{ console.log(m)
    const embed = new MessageEmbed()
    .setTitle('User informations')
    .setAuthor('Some name', `${m.displayAvatarURL}`)
    .setThumbnail(m.displayAvatarURL)
    .setDescription('Cette personne n\'est pas sur le serveur')
    .setFooter(`User ID : ${m.id}`)
        message.channel.send(embed)
        
    })*/
   /* const test = client.users.fetch(args[0]).then(m =>{ console.log(m)
            console.log(m.avatarURL())
            let flag = m.flags
            if(flag.includes(576))
             embed = new MessageEmbed()
            
            .setTitle(`${m.username}#${m.discriminator}`)
            .setAuthor('Some name', `${m.avatarURL()}`)
            .setThumbnail(m.avatarURL())
            .setDescription('Cette personne n\'est pas sur le serveur')
            .setFooter(`User ID : ${m.id}`)
            message.channel.send(embed)
    })*/
}
module.exports.help = {
    
    name : 'ping',
    aliases : ['ping'],
    category : 'misc',
    description : 'Ping le bot et donne son temps de réaction',
    cooldown : 3,
    usage : '',
    exemple :['ping'],
    permissions : false,
    isUserAdmin: false,
    args : false,
    sousCommdandes : []
}


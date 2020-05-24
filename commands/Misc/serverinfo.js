const { MessageEmbed } = require("discord.js") 

module.exports.run = (client, message, args) => {
    const {CHANNEL,VOICE,ETIQUETTE,BOOST,ONLINE,IDLE,DND,OFFLINE,EMBED} = require('../../configstyle')
    var guild_name = message.guild.name,
        guild_id = message.guild.id, 
        owner = message.guild.owner,
        owner_id = message.guild.ownerID,
        region = message.guild.region.toUpperCase()

    var boost = message.guild.premiumSubscriptionCount
        if (boost === 0) {
            boost = "Ce serveur n'est pas BOOST"
        } else if (boost >= 1) {
            boost = `Ce serveur possède ${boost} BOOST${boost > 1 ? "s" : ""}`
        }
    var members = message.guild.memberCount; 
        message.guild.members.fetch().then(fetchedMembers => {     
        const online = fetchedMembers.filter(member => member.presence.status === 'online').size;
        const idle = fetchedMembers.filter(member => member.presence.status === 'idle').size;
        const dnd = fetchedMembers.filter(member => member.presence.status === 'dnd').size;
        const off = fetchedMembers.filter(member => member.presence.status === 'offline').size;

        const channel_t = message.guild.channels.cache.filter(channel => channel.type === "text").size
        const channel_v = message.guild.channels.cache.filter(channel => channel.type === "voice").size
        const channel_c = message.guild.channels.cache.filter(channel => channel.type === "category").size
       
        const roles = message.guild.rolesCount;
    
        
    let embed = new MessageEmbed()
    //.setDescription('Boosts du serveur : '+boost+'\r\n'+ 'Nom du serveur : '+guild_name+'\r\n Owner : <@'+owner +'>\r\n Région du serveur : '+region+'\r\nNombre de personnes sur le serveur : '+members+'\r\nNombre de membre en ligne :'+totalOnline+'\r\nNombres de channels textuels :'+channel)
    .setTitle(`**Informations sur le serveur :**`)
    .setColor(EMBED)
    .setAuthor(`${guild_name}`, `${message.guild.iconURL()}`)
    .setThumbnail(`${message.guild.iconURL()}`)
    .addFields(
        { name: 'Nom du serveur', value: `${guild_name}`, inline: true },
        { name: 'Region', value: `${region}`, inline: true },
        { name: 'Nombre de membres', value: `${members}`, inline: true },
        { name: 'Owner', value: `${owner}`, inline: true },
        { name: 'Verification niveau', value: `${message.guild.verificationLevel}`, inline: true },
        //{ name: 'Roles du serveur', value: `${message.guild.roles.fetch().then(roles =>roles.cache.size)}`, inline: true },
        { name: `${BOOST}Nitro du serveur`, value: `${boost}`, inline: true },
        { name: 'Chanels', value: `${CHANNEL}Texte :${channel_t}\n${VOICE}Voice :${channel_v}\n${ETIQUETTE}${channel_c}`, inline: true },
        { name: 'Status des membres', value: `${ONLINE}Online : ${online}\n${IDLE}Idle : ${idle}\n${DND}Dnd : ${dnd}\n${OFFLINE}Offline : ${off}`, inline: true },
        //{ name: 'Category', value: `${channel_c}`, inline: true }
       
        //{ name: 'Owner', value: `${boost}`, inline: true },
    )
    .setTimestamp()
    .setFooter('BOT ID : 689210215488684044', `${message.guild.iconURL()}`);
    message.channel.send(embed)
});
}

//name server


module.exports.help = {
    
    name : 'serverinfo',
    aliases : ['serverinfo'],
    category : 'misc',
    description : 'Donne des infos sur le serveur',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : false,
    isUserAdmin: false,
    args : false
}

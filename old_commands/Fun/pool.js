const { MessageEmbed } = require('discord.js')
module.exports.run = async (client, interaction, args) => {
    const question = args.get('question')
    const embed = new MessageEmbed()
        .setAuthor(`${interaction.user.username}`, `${interaction.user.displayAvatarURL()}`)
        .setColor(client.config.color.EMBEDCOLOR)
        .setDescription(`**Pool by ${interaction.user.username} :**\n${question}`)
        .addField(`\u200b`, `🟩 Yes \n🟦 Neutral \n🟥 No`)
        .setTimestamp()
        .setFooter(`Command module: Fun`)
    interaction.reply(embed)
    const reply = await interaction.fetchReply()
    await reply.react('🟩')
    await reply.react('🟦')
    await reply.react('🟥')
};

module.exports.help = {
    name: "pool",
    aliases: ['pool'],
    category: 'fun',
    description: "Send pool in a channel.",
    cooldown: 3,
    usage: '<question>',
    exemple: ["pool <question>"],
    isUserAdmin: false,
    moderator: false,
    args: [
        {
            name: 'question',
            description: 'Question of pool',
            type: 'STRING',
            required: true
        },
    ],
    userPermissions: [],
    botPermissions: [],
    subcommands: []
};
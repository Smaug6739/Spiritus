const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
    console.log("Execution d'une commande")
    message.channel.send(`${client.config.emojis.LOADING} Commande en cour d'execution...`).then(async msg =>{
        try {
            await exec(`${args.join(" ")}`);
            msg.edit(`${client.config.emojis.TRUE} Updated.`);
        } catch (err) {
            msg.edit(`${client.config.emojis.FALSE} An error occured:\n\`\`\`xl\n${err}\n\`\`\``);
        }
    })
}
module.exports.help = {
        
    name : 'execute',
    aliases : ['execute','exe'],
    category : 'admin',
    description : 'Lance une recherge de toutes les guilds du bot.',
    cooldown : 5,
    usage : '',
    exemple :[],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : [""]

}    
    
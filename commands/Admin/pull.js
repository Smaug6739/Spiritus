const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
    //---------------------------------------CHARGE-DES-GUILDS--------------------------------------------------
    console.log("Pull")
    message.channel.send(`${client.config.emojis.LOADING} Commande en cour d'execution...`).then(async msg =>{
        try {
            await exec(`git pull origin ${args[0]}`);
            msg.edit(`${client.config.emojis.TRUE} Updated.`);
        } catch (err) {
            msg.edit(`${client.config.emojis.FALSE} An error occured:\n\`\`\`${err}\n\`\`\``);
        }
    })
}
module.exports.help = {
        
    name : 'pull',
    aliases : ['pull','git-pull'],
    category : 'admin',
    description : 'Lance une recherge de toutes les guilds du bot.',
    cooldown : 5,
    usage : '[branch]',
    exemple :['pull master'],
    permissions : true,
    isUserAdmin: false,
    args : true,
    sousCommdandes : [""]

}    
    
const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.FALSE}Tu n'est pas admin du BOT `)
    //---------------------------------------CHARGE-DES-GUILDS--------------------------------------------------
    console.log("Pull")
    message.channel.send(`${client.config.emojis.loading} Commande en cour d'execution...`).then(async msg =>{
        try {
            await exec(`git pull origin ${client.configuration.ADMIN.ORIGINPULL}`);
            msg.edit(`${client.config.emojis.success} Updated.`);
        } catch (err) {
            msg.edit(`${client.config.emojis.error} An error occured:\n\`\`\`${err}\n\`\`\``);
        }
    })
}
module.exports.help = {
        
    name : 'pull',
    aliases : ['pull','git-pull'],
    category : 'admin',
    description : 'Pull le repo github.',
    cooldown : 5,
    usage : '',
    exemple :['pull'],
    permissions : true,
    isUserAdmin: false,
    args : false,
    sousCommdandes : [""]

}    
    
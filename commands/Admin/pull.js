const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
module.exports.run = async (client, message, args) =>{
    let {ADMIN,TRUE,FALSE} = require('./../../configstyle')
    let loading = '<a:loading:688692468195262475>'
    if(!ADMIN.includes(message.author.id)) return message.channel.send(`${FALSE}Tu n'est pas admin du BOT `)
    console.log("Redemarage")

    try {
        await exec('gitt pull');
        message.channel.send(`${TRUE} Updated.`);
    } catch (err) {
        message.channel.send(`${FALSE} An error occured:\n\`\`\`${err}\n\`\`\``);
    }

}

module.exports.help = {
    
    name : 'pull',
    aliases : ['pull'],
    category : 'admin',
    description : 'Pull repository',
    cooldown : 5,
    usage : '',
   // exemple :["ping"],
    permissions : true,
    isUserAdmin: false,
    args : false
}


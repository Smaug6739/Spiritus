const util = require('util');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
module.exports.run = async (client, message, args) =>{
    if(!client.config.ADMIN.includes(message.author.id)) return message.channel.send(`${client.config.emojis.error}Tu n'est pas admin du BOT `)
    /*console.log("Execution d'une commande")
    message.channel.send(`${client.config.emojis.loading} Commande en cour d'execution...`).then(async msg =>{
        try {
            await exec(`${args.join(" ")}`);
            msg.edit(`${client.config.emojis.success} Updated.`);
        } catch (err) {
            msg.edit(`${client.config.emojis.error} An error occured:\n\`\`\`xl\n${err}\n\`\`\``);
        }
    })*/
    const doExec = (cmd, opts = {}) => {
        return new Promise((resolve, reject) => {
            exec(cmd, opts, (err, stdout, stderr) => {
                if (err) return reject({ stdout, stderr });
                resolve(stdout);
            });
        });
    };
   
    const command = args.join(' ');
    const outMessage = await message.channel.send(`${client.config.emojis.loading} Executing \`${command}\`...`);
    let stdOut = await doExec(command).catch(data=> outputErr(outMessage, data));
    return outMessage.edit(`\`\`\`bash\n${stdOut.toString()}\n\`\`\``);
    
}
module.exports.help = {
        
    name : 'exe',
    aliases : ['exe','exe'],
    category : 'admin',
    description : 'Execute du code dans la console.',
    cooldown : 5,
    usage : '[command]',
    exemple :[],
    permissions : true,
    isUserAdmin: false,
    args : true,
    sousCommdandes : [""]

}    
    
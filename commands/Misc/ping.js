const {MessageEmbed} = require('discord.js')
const util = require('util');
module.exports.run =async(client, message, args) => {

    let debut = Date.now();
    message.channel.sendd('Pong !').then(async(m) => await m.edit(`Pong  BOT : \`${Date.now()-debut}ms\` API : \`${client.ws.ping}ms\``));


    /*let evaled;
    try {
        evaled = await eval(args.join(' ').trim());
        if (args[0] === '-a' || args[0] === '-async') {
            args.shift();
            evaled = `(async () => { ${args.join(' ').trim()} })()`;
        }
        if (typeof evaled === 'object') {
            evaled = util.inspect(evaled, { depth: 0, showHidden: true });
        } else {
            evaled = String(evaled);
        }
    } catch (err) {
        return message.channel.send(`\`\`\`js\n${err}\`\`\``);
    }

    evaled = evaled.replace(client.config.token, 'no.');

    const fullLen = evaled.length;

    if (fullLen === 0) {
        return null;
    }
    if (fullLen > 2000) {
        evaled = evaled.match(/[\s\S]{1,1900}[\n\r]/g) || [];
        if (evaled.length > 3) {
            message.channel.send(`\`\`\`js\n${evaled[0]}\`\`\``);
            message.channel.send(`\`\`\`js\n${evaled[1]}\`\`\``);
            message.channel.send(`\`\`\`js\n${evaled[2]}\`\`\``);
            return;
        }
        return evaled.forEach((message) => {
            message.channel.send(`\`\`\`js\n${message}\`\`\``);
            return;
        });
    }
    return message.channel.send(`\`\`\`js\n${evaled}\`\`\``);*/


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


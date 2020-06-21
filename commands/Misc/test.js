module.exports.run = async (client, message, args, settings) => {
 
            client.updateCmd(args[0],message.guild,{contenu: args.slice(1).join(" ")});
    
};
module.exports.help = {
    
    name: "test",
    aliases: ['test'],
    category: 'admin',
    description: "Modiffier la base de donnée",
    cooldown: 10,
    usage: '<key_to_modify> <value>',
    exemple :[],
    isUserAdmin: false,
    permissions: true,
    args: true,
    sousCommdandes : ["config prefix","config logChannel","config welcomeMessage","config experience"]
}
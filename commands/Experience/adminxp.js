module.exports.run = async (client, message, args, settings) => {
    if (!settings.expsysteme) return message.channel.sendErrorMessage(`The experience system is not activated on this server. To activate it use the command \`${settings.prefix} config experience\`.`);

    switch (args[0].toLowerCase()) {
        case 'add':
            const userToAdd = await client.resolveMember(message.guild, args[1]);
            const expToAdd = parseInt(args[2]);
            if (isNaN(expToAdd)) return message.channel.sendErrorMessage(`Please enter a valid number.`);
            if (!userToAdd) return message.channel.sendErrorMessage(`User not found.`);
            if (!await client.addExp(client, userToAdd, expToAdd)) return message.channel.sendErrorMessage(`I can't add exp to this user.`);
            message.channel.sendSuccessMessage(`Adding ${expToAdd} exp to user ${userToAdd}`);
            break;
        case 'rem':
            const userToRemove = await client.resolveMember(message.guild, args[1]);
            const expToRemove = parseInt(args[2]);
            if (isNaN(expToRemove)) return message.channel.sendErrorMessage(`Please enter a valid number.`);
            if (!userToRemove) return message.channel.sendErrorMessage(`User not found.`);
            if (!await client.addExp(client, userToAdd, expToAdd)) return message.channel.sendErrorMessage(`I can't add exp to this user.`);
            message.channel.sendSuccessMessage(`Removed ${expToRemove} exp from user ${userToRemove}`);
            break;
    }
};
module.exports.help = {
    name: 'adminxp',
    aliases: ['adminxp'],
    category: 'experience',
    description: 'Gère l\'exp d\'une personne.',
    cooldown: 10,
    usage: '<@user> <nb_experience>',
    exemple: ["rem @Smaug 1500"],
    moderator: false,
    isUserAdmin: false,
    args: true,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: [
        {
            name: 'add',
            description: 'Add exp to a user.',
            usage: '<user> [number]',
            args: 2,
            exemples: ['@Smaug 1500']
        },
        {
            name: 'rem',
            description: 'Remove exp to a user.',
            usage: '<user> [number]',
            args: 2,
            exemples: ['@Smaug 1500']
        },
    ]
}
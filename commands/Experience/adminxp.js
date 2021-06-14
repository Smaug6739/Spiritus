module.exports.run = async (client, interaction, args, settings) => {
    if (!settings.expsysteme) return interaction.replyErrorMessage(`The experience system is not activated on this server. To activate it use the command \`${settings.prefix} config experience\`.`);

    switch (args[0].subcommand) {
        case 'add':
            const userToAdd = await client.resolveMember(interaction.guild, args.get('user').value);
            const expToAdd = parseInt(args.get('experience').value);
            if (isNaN(expToAdd)) return interaction.replyErrorMessage(`Please enter a valid number.`);
            if (!userToAdd) return interaction.replyErrorMessage(`User not found.`);
            if (!await client.addExp(client, userToAdd, expToAdd)) return interaction.replyErrorMessage(`I can't add exp to this user.`);
            interaction.replySuccessMessage(`Adding ${expToAdd} exp to user ${userToAdd}`);
            break;
        case 'rem':
            const userToRemove = await client.resolveMember(interaction.guild, args.get('user').value);
            const expToRemove = parseInt(args.get('experience').value);
            if (isNaN(expToRemove)) return interaction.replyErrorMessage(`Please enter a valid number.`);
            if (!userToRemove) return interaction.replyErrorMessage(`User not found.`);
            if (!await client.removeExp(client, userToRemove, expToRemove)) return interaction.replyErrorMessage(`I can't remove exp to this user.`);
            interaction.replySuccessMessage(`Removed ${expToRemove} exp from user ${userToRemove}`);
            break;
    }
};
module.exports.help = {
    name: 'adminxp',
    aliases: ['adminxp'],
    category: 'experience',
    description: 'Manage exp of users.',
    cooldown: 10,
    usage: '<@user> <nb_experience>',
    exemple: ["rem @Smaug 1500"],
    moderator: false,
    isUserAdmin: false,
    args: null,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: [
        {
            name: 'add',
            description: 'Add exp to a user.',
            usage: '<user> [number]',
            args: [
                {
                    name: 'user',
                    description: 'User to add experience',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'experience',
                    description: 'Number of experience points to add',
                    type: 'STRING',
                    required: true
                },
            ],
            exemples: ['@Smaug 1500']
        },
        {
            name: 'rem',
            description: 'Remove exp to a user.',
            usage: '<user> [number]',
            args: [
                {
                    name: 'user',
                    description: 'User to add experience',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'experience',
                    description: 'Number of experience points to remove',
                    type: 'STRING',
                    required: true
                },
            ],
            exemples: ['@Smaug 1500']
        },
    ]
}
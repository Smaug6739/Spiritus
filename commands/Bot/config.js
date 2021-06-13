module.exports.run = async (client, interaction, args, settings) => {
    const getSetting = args[0].toLowerCase();
    const newSetting = args.slice(1).join(" ");
    switch (getSetting) {
        case 'prefix': {
            if (newSetting) {
                if (newSetting.length > 5) return interaction.replyErrorMessage(`Prefix is too long (max 5 chars).`)
                await client.updateGuild(interaction.guild, { prefix: newSetting });
                return interaction.replySuccessMessage(`Prefix updated : \`${settings.prefix}\` ->\`${newSetting}\``)
            }
            interaction.replySuccessMessage(`Current prefix : \`${settings.prefix}\``);
            break;
        }
        case 'logChannel': {
            if (newSetting) {
                await client.updateGuild(interaction.guild, { logChannel: newSetting });
                return interaction.replySuccessMessage(`logChannel updated : \`${settings.logChannel}\` ->\`${newSetting}\``)
            }
            interaction.replySuccessMessage(`Current logs channel : \`${settings.logChannel}\``);
            break;
        }
        case 'welcomeMessage': {
            if (newSetting) {
                await client.updateGuild(interaction.guild, { welcomeMessage: newSetting });
                return interaction.replySuccessMessage(`welcomeMessage updated : \`${settings.welcomeMessage}\` ->\`${newSetting}\``)
            }
            interaction.replySuccessMessage(`Current welcome interaction : \`${settings.welcomeMessage}\``);
            break;
        }
        case 'experience': {
            let uexp;
            if (settings.expsysteme == true) uexp = false;
            else uexp = true;
            await client.updateGuild(interaction.guild, { expsysteme: uexp });
            interaction.replySuccessMessage(`Leveling system updated : \`${settings.expsysteme}\` ->\`${uexp}\``)
            break;
        }
        case 'admin-invites': {
            let invit;
            if (settings.invitations == true) invit = false;
            else invit = true;
            await client.updateGuild(interaction.guild, { invitations: invit });
            interaction.replySuccessMessage(`System anti-invitations of the guild updated : \`${settings.invitations}\` ->\`${invit}\``)
            break;
        }
        case 'rank-card': {
            if (newSetting) {
                if (args[1].includes('png') || args[1].includes('PNG') || args[1].includes('JPG') || args[1].includes('jpg') || args[1].includes('JPEG') || args[1].includes('jpeg') || args[1].includes('GIF') || args[1].includes('gif')) {
                    await client.updateGuild(interaction.guild, { rankcard: newSetting });
                    return interaction.replySuccessMessage(`rank-card updated : \`${settings.rankcard}\` ->\`${newSetting}\``)
                } else return interaction.replyErrorMessage(`The file is not in a valid format. Valid formats are : png, jpg, jpeg et gif`)
            }
            interaction.replySuccessMessage(`Current rank-card : \`${settings.rankcard}\``);
            break;
        }
        case 'rank-channel': {
            if (newSetting) {
                if (args[1] === 'disable') {
                    client.updateGuild(interaction.guild, { salonranks: "" });
                    return interaction.replySuccessMessage(`Rank salon à bien été désactiver.`)
                } else {
                    const channel = client.resolveChannel(interaction.guild, newSetting)
                    if (!channel || channel == undefined) return interaction.replyErrorMessage(`Channel not found.`)
                    else {
                        await client.updateGuild(interaction.guild, { salonranks: channel.id });
                        return interaction.replySuccessMessageSuccessinteraction(`rank-salon updated : \`${newSetting}\``)
                    }
                }
            }
            interaction.replySuccessMessage(`Current rank-salon : \`${settings.salonranks || 'none'}\``);
            break;
        }
    }
};
module.exports.help = {

    name: "config",
    aliases: ['config'],
    category: 'bot',
    description: "Config the bot.",
    cooldown: 10,
    usage: '[parameter] (value)',
    exemple: [],
    isUserAdmin: false,
    moderator: false,
    args: true,
    userPermissions: ['MANAGE_GUILD'],
    botPermissions: [],
    subcommands: [
        {
            name: 'prefix',
            description: 'Change prefix of the guild.',
            usage: '[prefix]',
            args: 1,
            exemples: ['!']
        },
        {
            name: 'log-channel',
            description: 'Change log-channel of the guild.',
            usage: '[channel]',
            args: 1,
            exemples: ['#general']
        },
        {
            name: 'experience',
            description: 'Change status of leveling system of the guild.',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'admin-invites',
            description: 'Change status of anti invitations system of the guild.',
            usage: '',
            args: 0,
            exemples: []
        },
        {
            name: 'rank-card',
            description: 'Change rank-card.',
            usage: '<image_link>',
            args: 1,
            exemples: ['https://domain.com/image.png']
        },
        {
            name: 'rank-channel',
            description: 'Change rank-channel setting.',
            usage: '<channel> | disable',
            args: 1,
            exemples: ['#ranks']
        },
    ]
}
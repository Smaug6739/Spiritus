module.exports.run = async (client, message, args, settings) => {
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.channel.sendErrorMessage(`Vous devez avoir la permission de gérer le serveur pour utiliser cette commande.`)
    const getSetting = args[0].toLowerCase();
    const newSetting = args.slice(1).join(" ");
    switch (getSetting) {
        case 'prefix': {
            if (newSetting) {
                await client.updateGuild(message.guild, { prefix: newSetting });
                return message.channel.send(`Prefix updated : \`${settings.prefix}\` ->\`${newSetting}\``)
            }
            message.channel.send(`Current prefix : \`${settings.prefix}\``);
            break;
        }
        case 'logChannel': {
            if (newSetting) {
                await client.updateGuild(message.guild, { logChannel: newSetting });
                return message.channel.send(`logChannel updated : \`${settings.logChannel}\` ->\`${newSetting}\``)
            }
            message.channel.send(`Current logs channel : \`${settings.logChannel}\``);
            break;
        }
        case 'welcomeMessage': {
            if (newSetting) {
                await client.updateGuild(message.guild, { welcomeMessage: newSetting });
                return message.channel.send(`welcomeMessage updated : \`${settings.welcomeMessage}\` ->\`${newSetting}\``)
            }
            message.channel.send(`Current welcome message : \`${settings.welcomeMessage}\``);
            break;
        }
        case 'experience': {
            let uexp;
            if (settings.expsysteme == true) uexp = false;
            else uexp = true;
            await client.updateGuild(message.guild, { expsysteme: uexp });
            message.channel.send(`Leveling system updated : \`${settings.expsysteme}\` ->\`${uexp}\``)
            break;
        }
        case 'admin-invites': {
            let invit;
            if (settings.invitations == true) invit = false;
            else invit = true;
            await client.updateGuild(message.guild, { invitations: invit });
            message.channel.send(`System anti-invitations of the guild updated : \`${settings.invitations}\` ->\`${invit}\``)
            break;
        }
        case 'rank-card': {
            if (newSetting) {
                if (args[1].includes('png') || args[1].includes('PNG') || args[1].includes('JPG') || args[1].includes('jpg') || args[1].includes('JPEG') || args[1].includes('jpeg') || args[1].includes('GIF') || args[1].includes('gif')) {
                    await client.updateGuild(message.guild, { rankcard: newSetting });
                    return message.channel.send(`rank-card updated : \`${settings.rankcard}\` ->\`${newSetting}\``)
                } else return message.channel.sendErrorMessage(`The file is not in a valid format. Valid formats are : png, jpg, jpeg et gif`)
            }
            message.channel.send(`Current rank-card : \`${settings.rankcard}\``);
            break;
        }
        case 'rank-channel': {
            if (newSetting) {
                if (args[1] === 'disable') {
                    client.updateGuild(message.guild, { salonranks: "" });
                    return message.channel.send(`Rank salon à bien été désactiver.`)
                } else {
                    const channel = client.resolveChannel(message.guild, newSetting)
                    if (!channel || channel == undefined) return message.channel.sendErrorMessage(`Channel not found.`)
                    else {
                        await client.updateGuild(message.guild, { salonranks: channel.id });
                        return message.channel.sendSuccessMessage(`rank-salon updated : \`${newSetting}\``)
                    }
                }
            }
            message.channel.send(`Current rank-salon : \`${settings.salonranks || 'none'}\``);
            break;
        }
    }
};
module.exports.help = {

    name: "config",
    aliases: ['config'],
    category: 'bot',
    description: "Permet de configurer le bot.",
    cooldown: 10,
    usage: '[paramètre] (valeur)',
    exemple: [],
    isUserAdmin: false,
    permissions: false,
    args: true,
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
            name: 'welcome-message',
            description: 'Change welcome-message of the guild.',
            usage: '<message>',
            args: 1,
            exemples: ['Welcome to the server {{user}} !']
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
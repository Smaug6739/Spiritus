import type Spiritus from "../main";
import type {
  Message,
  NewsChannel,
  TextChannel,
  ThreadChannel,
} from "discord.js";
export default class {
  spiritus: typeof Spiritus;
  constructor(spiritus: typeof Spiritus) {
    this.spiritus = spiritus;
  }
  async run(message: Message) {
    if (
      message.author.bot ||
      message.author.system ||
      !message.guild ||
      !message.member
    )
      return;
    if (
      !(message.channel as TextChannel | ThreadChannel | NewsChannel)
        .permissionsFor(message.guild!.me!)
        .has("SEND_MESSAGES")
    )
      return;
    const settings = await this.spiritus.db.getGuild(message.guild.id);
    const dbUser = await this.spiritus.db.getUser(
      message.member.id,
      message.guild!.id
    );

    //------------------------------SYSTEME-IGNORE-CHANNEL---------------------
    if (settings.ignoreChannel) {
      if (settings.ignoreChannel.includes(message.channel.id)) return;
    }
    //----------------------------------SYSTEME-FILTER-------------------------
    if (settings.filter) {
      settings.filter.forEach((content: string) => {
        if (message.content.includes(content)) {
          message.delete();
          message.channel.send(
            `<@${message.author.id}> this word is forbidden on this server.`
          );
        }
      });
    }
    //--------------------------------SYSTEME-ANTI-INVITS----------------------
    if (settings.invitations) {
      if (message.content.includes("discord.gg/")) {
        message.delete();
        message.channel.send(
          `<@${message.author.id}> invitations are prohibited on this server.`
        );
      }
    }
    //-----------LEVELING-SYETEM------------------
    if (settings.expsysteme) {
      if (!dbUser)
        await this.spiritus.db.createUser(message.guild.id, message.member.id, {
          guildID: message.member.guild.id,
          guildName: message.member.guild.name,
          userID: message.member.id,
          username: message.member.user.tag,
        });

      if (dbUser) {
        const expCd = Math.floor(Math.random() * 19) + 1;
        const expToAdd = Math.floor(Math.random() * 25) + 10;
        if (expCd >= 10 && expCd <= 15) {
          const userToUpdate = await this.spiritus.db.getUser(
            message.member.id,
            message.guild!.id
          );
          if (!userToUpdate) return false;
          const updateExp = userToUpdate.experience + expToAdd;
          await this.spiritus.db.updateUser(
            message.guild.id,
            message.member.id,
            { experience: updateExp }
          );
          //-------------------------------------------LEVELS------------------------------------------
          const userLevel = Math.floor(0.1 * Math.sqrt(dbUser.experience));
          if (dbUser.level < userLevel) {
            if (settings.salonranks != "") {
              const channel = message.guild!.channels.cache.get(
                settings.salonranks
              ) as TextChannel | ThreadChannel;
              channel.send(
                `<@${dbUser.userID}> Congratulations, you have just climbed to the level **${userLevel}** :muscle: :muscle: `
              );
            } else {
              message.channel.send(
                `<@${message.author.id}> Congratulations, you have just climbed to the level **${userLevel}** :muscle: :muscle: `
              );
            }
            this.spiritus.db.updateUser(message.guild.id, message.member.id, {
              level: userLevel,
            });
          } else if (dbUser.level > userLevel) {
            await this.spiritus.db.updateUser(
              message.guild.id,
              message.member.id,
              { level: userLevel }
            );
          }
        }
      }
    }
    /*if(message.content.includes(`<@!${client.user.id}>`)){
		const embed = new MessageEmbed()
		.setAuthor(`Spiritus`,`${client.user.displayAvatarURL()}`)
		.setThumbnail(client.user.displayAvatarURL())
		.addField(`Prefix de ce serveur :`,`${settings.prefix}`,false)
		.addField(`Commande d'aide :`,`${settings.prefix}help ou ${settings.prefix}cmds`,false)
		.setTimestamp()
		.setFooter(`BOT ID : ${client.user.id}`)
		return message.channel.send(embed)
	}*/

    //-------------------------------LINKS---------------------------------------------------------------------------------------
    /*try{
			let stop = false;
			let webhooks = await message.channel.fetchWebhooks().catch(() => stop = true);
			if (!stop){
				webhooks = webhooks.map(w => w.id);
				if(settings.links){
					if (settings.links.length > 0 && settings.links.find(a => a.find(w => webhooks.includes(w)))) {
						firstWebhookID = settings.links.find(a => a.find(w => webhooks.includes(w))).find(b => webhooks.includes(b));
						if (!firstWebhookID) return;
						let otherWebhook = await client.fetchWebhook(settings.links.find(a => a.includes(firstWebhookID)).find(w => w !== firstWebhookID));
						const link  = new WebhookClient(`${otherWebhook.id}`, `${otherWebhook.token}`);
						link.send({
								auth: true,
								content: message.content,
								username: message.author.username,
								avatarURL: message.author.displayAvatarURL(),
								allowedMentions: {
										everyone: false,
										roles: false,
								}
						}).catch();
					}
				}
			}
		  
		}catch(e){
		}*/
  }
}

import { Command } from "sheweny";
import moment from "moment";
import { MessageEmbed } from "discord.js";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction, Role } from "discord.js";

export class InfosCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "infos",
      description: "Get informations",
      type: "SLASH_COMMAND",
      channel: "GUILD",
      options: [
        {
          name: "user",
          description: "Allows to have information about a user.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "user",
              description: "User to get infos",
              type: "USER",
              required: true,
            },
          ],
        },
        {
          name: "bot",
          description: "Allows to have information about bot.",
          type: "SUB_COMMAND",
        },
        {
          name: "server",
          description: "Allows to have information about server.",
          type: "SUB_COMMAND",
        },
        {
          name: "role",
          description: "Allows to have information about role.",
          type: "SUB_COMMAND",
          options: [
            {
              name: "role",
              description: "Role to get infos",
              type: "ROLE",
              required: true,
            },
          ],
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    switch (interaction.options.getSubcommand()) {
      case "user":
        const argUser = interaction.options.get("user")!.value!.toString();
        const userInfo = await this.client.util.resolveMember(
          interaction.guild!,
          argUser
        );
        console.log(argUser);

        if (!userInfo) {
          const u = await this.client.util.resolveUser(argUser);
          let BOTSTATUS;
          if (!u) return interaction.replyErrorMessage(`User not found.`);
          if (u.bot) BOTSTATUS = "yes";
          else BOTSTATUS = "no";
          const embedUser = new MessageEmbed()
            .setAuthor(
              `${u.username}#${u.discriminator}`,
              `${u.displayAvatarURL()}`
            )
            .setColor(this.client.config.colors.embed)
            .setThumbnail(u.displayAvatarURL())
            .addField(`\u200b`, `BOT : ${BOTSTATUS}`)
            .setDescription("This user is no on the server.")
            .setFooter(`User ID : ${u.id}`);
          interaction.reply({ embeds: [embedUser] });
          break;
        } else {
          let permissions_arr = userInfo.permissions.toArray().join(", ");
          let permissions = permissions_arr.toString();
          permissions = permissions.replace(/\_/g, " ");
          const embedMember = new MessageEmbed();
          embedMember.setThumbnail(userInfo.user.displayAvatarURL());
          embedMember.setColor(this.client.config.colors.embed);
          embedMember.setTitle(`${userInfo.user.username}`);
          embedMember.addField("ID :", `${userInfo.user.id}`, true);
          embedMember.addField("Tag :", `${userInfo.user.tag}`, true);
          embedMember.addField(
            "Joigned :",
            `${moment.utc(userInfo.joinedAt).format("DD/MM/YYYY - hh:mm")}`,
            true
          );
          embedMember.addField(
            "Account created :",
            `${moment
              .utc(userInfo.user.createdAt)
              .format("DD/MM/YYYY - hh:mm")}`,
            true
          );
          embedMember.addField(
            "Roles :",
            `${userInfo.roles.cache.map((r: Role) => r.toString()).join("")}`
          );
          embedMember.addField(
            "User information:",
            `** Permissions:** ${
              userInfo.permissions
                .toArray()
                .sort()
                .map(
                  (permissions: string) =>
                    `${permissions
                      .split("_")
                      .map((x) => x[0] + x.slice(1).toLowerCase())
                      .join(" ")}`
                )
                .join(", ") || "none"
            }`
          ); //OK
          embedMember.setTimestamp();
          embedMember.setFooter(
            `${userInfo.user.username} ID : ${userInfo.user.id}`,
            userInfo.user.displayAvatarURL()
          ); //OK
          interaction.reply({ embeds: [embedMember] });
          break;
        }
      case "bot":
        const pck = require("../../package.json");
        const verssionBot = pck.version;
        const verssionDjs = pck.dependencies["discord.js"];
        const embedBot = new MessageEmbed()
          .setColor(this.client.config.colors.embed)
          .setAuthor(
            `${this.client.user!.username} Info`,
            this.client.user!.displayAvatarURL()
          )
          .setThumbnail(this.client.user!.displayAvatarURL())
          .addFields(
            { name: "Developer", value: `Smaug#6739`, inline: true },
            {
              name: "Data",
              value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                2
              )} MB`,
              inline: true,
            },
            {
              name: "Uptime",
              value: `${Math.floor(
                this.client.uptime! / 1000 / 60
              ).toString()} minutes`,
              inline: true,
            },
            {
              name: "Servers",
              value: `${this.client.guilds.cache.size.toString()}`,
              inline: true,
            },
            {
              name: "Channels",
              value: `${this.client.channels.cache.size.toString()}`,
              inline: true,
            },
            {
              name: "Users",
              value: `${this.client.guilds.cache
                .map((g) => g.memberCount)
                .reduce((a, b) => a + b)}`,
              inline: true,
            },
            { name: "Version", value: `${verssionBot}`, inline: true },
            {
              name: "Library ",
              value: `discord.js (javascript)`,
              inline: true,
            },
            {
              name: "Library verssion",
              value: `${verssionDjs.replace("^", "")}`,
              inline: true,
            },
            {
              name: "Support",
              value: `[Serveur support ](https://discord.gg/TC7Qjfs)`,
              inline: true,
            },
            {
              name: "Invite :",
              value: `[Invite](https://discord.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974%20applications.commands)`,
              inline: true,
            },
            {
              name: "Top.gg :",
              value: `[Site](https://top.gg/bot/689210215488684044)`,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter(
            `Infos of ${this.client.user!.username}. BOT ID : ${
              this.client.user!.id
            }`
          );
        interaction.reply({ embeds: [embedBot] });
        break;
      case "server":
        const guild_name = interaction.guild!.name;
        const owner = `<@${interaction.guild!.ownerId}>`;
        const boost = interaction.guild!.premiumSubscriptionCount;
        let boostMsg = "";
        if (!boost) boostMsg = "This server no have boost";
        else boostMsg = `Server have ${boost} boost${boost > 1 ? "s" : ""}`;
        const members = interaction.guild!.memberCount;
        // interaction.guild.members.fetch().then(fetchedMembers => {
        // const online = fetchedMembers.filter(member => member.presence.status === 'online').size;
        // const idle = fetchedMembers.filter(member => member.presence.status === 'idle').size;
        // const dnd = fetchedMembers.filter(member => member.presence.status === 'dnd').size;
        // const off = fetchedMembers.filter(member => member.presence.status === 'offline').size;
        const channel_t = interaction.guild!.channels.cache.filter(
          (channel) => channel.type === "GUILD_TEXT"
        ).size;
        const channel_v = interaction.guild!.channels.cache.filter(
          (channel) => channel.type === "GUILD_VOICE"
        ).size;
        const channel_c = interaction.guild!.channels.cache.filter(
          (channel) => channel.type === "GUILD_CATEGORY"
        ).size;
        const roles = interaction.guild!.roles.cache.size;
        const salons = interaction.guild!.channels.cache.size;
        const embedInfoGuild = new MessageEmbed();
        if (interaction.guild!.iconURL()) {
          embedInfoGuild.setAuthor(
            `${guild_name}`,
            `${
              interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""
            }`
          );
          embedInfoGuild.setThumbnail(`${interaction.guild!.iconURL()}`);
          embedInfoGuild.setFooter(
            `BOT ID : ${this.client.user!.id}`,
            `${interaction.guild!.iconURL()}`
          );
        } else {
          embedInfoGuild.setAuthor(`${guild_name}`);
          embedInfoGuild.setFooter(`BOT ID : ${this.client.user!.id}`);
        }
        embedInfoGuild.setTitle(`**Informations sur le serveur :**`);
        embedInfoGuild.setColor(this.client.config.colors.embed);
        embedInfoGuild.addFields(
          { name: "Name", value: `${guild_name}`, inline: true },
          { name: "Owner", value: `${owner}`, inline: true },
          { name: "Members", value: `${members}`, inline: true },
          { name: "Channels", value: `${salons}`, inline: true },
          { name: "Roles", value: `${roles}`, inline: true },
          {
            name: "Chanels",
            value: `${this.client.config.emojis.channel}Texte : ${channel_t}\n${this.client.config.emojis.voice}Voice : ${channel_v}\n${this.client.config.emojis.info}Categories : ${channel_c}`,
            inline: true,
          },
          {
            name: "Verification level",
            value: `${interaction.guild!.verificationLevel}`,
            inline: true,
          },
          {
            name: `${this.client.config.emojis.boost}Nitro(s) of server`,
            value: `${boostMsg}`,
            inline: true,
          }
          //{ name: 'Status des membres', value: `${this.client.config.emojis.ONLINE}Online : ${online}\n${this.client.config.emojis.IDLE}Idle : ${idle}\n${this.client.config.emojis.DND}Dnd : ${dnd}\n${this.client.config.emojis.OFFLINE}Offline : ${off}`, inline: true }
        );
        embedInfoGuild.setTimestamp();
        interaction.reply({ embeds: [embedInfoGuild] });
        //});
        break;
      case "role":
        const argRole = interaction.options.get("role")!.value!.toString();
        const role = this.client.util.resolveRole(interaction.guild!, argRole);
        if (!role) return interaction.replyErrorMessage(`Role not found.`);
        let mention = "";
        let manager = "";
        let separation = "";
        if (role.mentionable) mention = "yes";
        else mention = "no";
        if (role.managed) manager = "yes";
        else manager = "no";
        const membersWithRole = interaction.guild!.roles.cache.get(role.id)
          ?.members.size;
        if (role.hoist) separation = "yes";
        else separation = "no";
        const embedRole = new MessageEmbed()
          .setColor(this.client.config.colors.embed)
          .setThumbnail(
            `${
              interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""
            }`
          )
          .setAuthor(
            `Information of role :`,
            `${
              interaction.guild!.iconURL() ? interaction.guild!.iconURL() : ""
            }`
          )
          .setTitle(`${role.name}`)
          .addFields(
            { name: "Role", value: `${role}`, inline: true },
            { name: "Color", value: `${role.hexColor}`, inline: true },
            { name: "Position", value: `${role.position}`, inline: true },
            { name: "ID", value: `${role.id}`, inline: true },
            { name: "Manager :", value: `${manager}`, inline: true },
            { name: "Mention :", value: `${mention}`, inline: true },
            { name: "Members :", value: `${membersWithRole}`, inline: true },
            { name: "Separation :", value: `${separation}`, inline: true },
            {
              name: "Created at  :",
              value: `${moment
                .utc(role.createdTimestamp)
                .format("DD/MM/YYYY - hh:mm")}`,
              inline: true,
            },
            {
              name: "Permissions :",
              value: `${
                role.permissions
                  .toArray()
                  .sort()
                  .map(
                    (permissions: string) =>
                      `${permissions
                        .split("_")
                        .map((x) => x[0] + x.slice(1).toLowerCase())
                        .join(" ")}`
                  )
                  .join(", ") || "none"
              }`,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter("Command module: Fun");
        interaction.reply({ embeds: [embedRole] });
        break;
    }
  }
}

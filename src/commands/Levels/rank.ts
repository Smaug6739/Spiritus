import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";
import Canvas from "canvas";
import { MessageAttachment } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "rank",
      description: "Get the rank of a user.",
      type: "SLASH_COMMAND",
      category: "Levels",
      channel: "GUILD",
      options: [
        {
          name: "user",
          description: "The user to get rank",
          type: "USER",
          required: false,
        },
      ],
    });
  }

  async execute(interaction: CommandInteraction) {
    const settings = await this.client.db.get(interaction.guildId!);
    if (!settings.expSystem)
      return interaction.replyErrorMessage(
        `The experience system is not activated on this server. To activate it use the command \`/config experience\`.`
      );

    let dbUser;
    let user;
    if (interaction.options.get("user", false)) {
      user = await this.client.util.resolveUser(
        interaction.options.get("user", false)!.value as string
      );
      if (!user) return interaction.replyErrorMessage("User not found.");
      if (user.bot)
        return interaction.replyErrorMessage(`A bot doesn't have experience.`);
      dbUser = await this.client.db.getUser(interaction.guild!.id, user.id);

      if (!dbUser) return interaction.replyErrorMessage("User not found.");
    } else {
      dbUser = await this.client.db.getUser(
        interaction.guild!.id,
        interaction.user.id
      );
      if (!dbUser)
        return interaction.replyErrorMessage("You don't have experience yet.");
      user = interaction.user;
    }

    await interaction.deferReply();
    let progress = dbUser.experience;
    progress = 0.1 * Math.sqrt(dbUser.experience);
    progress = progress.toFixed(2);
    progress = progress.split(".");
    progress.shift();

    const applyText = (canvas: any, text: any) => {
      const ctx = canvas.getContext("2d");
      let fontSize = 60;
      do {
        ctx.font = `${(fontSize -= 10)}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 350);
      return ctx.font;
    };
    const canvas = Canvas.createCanvas(700, 220);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage(settings.expCard);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#74037b";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `Level : ${dbUser.level}`,
      canvas.width / 2.5,
      canvas.height / 2
    );
    ctx.fillText(
      `Experience : ${dbUser.experience}xp`,
      canvas.width / 2.5,
      canvas.height / 1.57
    );
    ctx.fillText(
      `Votre progression : ${progress}%`,
      canvas.width / 2.5,
      canvas.height / 1.27
    );
    ctx.font = applyText(canvas, `${user.username}!`);
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${user.username}!`, canvas.width / 2.5, canvas.height / 3.5);
    ctx.beginPath();
    ctx.arc(106, 106, 83, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 22, 22, 165, 165);
    const attachment = new MessageAttachment(
      canvas.toBuffer(),
      "rank-image.png"
    );

    return interaction.editReply({ files: [attachment] });
  }
}

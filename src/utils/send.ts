import { Permissions } from "discord.js";

import type { Guild, MessageOptions } from "discord.js";
import type Spiritus from "../client/Spiritus";
import type { GuildDB } from "../../index";

interface Infos {
  guild: Guild;
  settings: GuildDB;
}

export async function sendLogsChannel(
  client: Spiritus,
  infos: Infos,
  sendOptions: string | MessageOptions
) {
  if (!infos.settings || (infos.settings && !infos.settings.modLogs)) return;
  const channel = client.util.resolveChannel(
    infos.guild,
    infos.settings.modLogs
  );
  if (!channel) return;
  if (!channel.isText()) return;
  if (
    !channel
      .permissionsFor(client.user!.id)
      ?.has(Permissions.FLAGS.SEND_MESSAGES)
  )
    return;
  channel.send(sendOptions);
}

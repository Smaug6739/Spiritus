import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, "warning", {
      emitter: process,
    });
  }
  execute(ctx: Error) {
    this.client.logs.send({ content: `\`\`\`js${ctx.stack}\`\`\`` });
  }
}

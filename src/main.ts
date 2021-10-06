import { readFileSync } from "fs";
import { join } from "path";
import toml from "toml";
import type { Config } from "../index";
import type { DatabaseProvider } from "./providers/Database";
const config = toml.parse(
  readFileSync(join(__dirname, "../config.toml")).toString()
);

declare module "sheweny" {
  interface ShewenyClient {
    config: Config;
    db: DatabaseProvider;
  }
}

import Spiritus from "./client/Spiritus";

const client = new Spiritus(config);

client.login(client.config.DISCORD_TOKEN);

import { readFileSync } from "fs";
import { join } from "path";
import toml from "toml";

const config = toml.parse(
  readFileSync(join(__dirname, "../config.toml")).toString()
);

import Spiritus from "./client/Spiritus";

const client = new Spiritus(config);

client.login(client.config.DISCORD_TOKEN);

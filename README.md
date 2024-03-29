# Spiritus Bot

![spiritus](https://cdn.discordapp.com/attachments/734318123510923324/734318158642544650/spiritus_banniere.png)

<div align="center">

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Smaug6739/Spiritus)
[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Smaug6739/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/Smaug6739/Spiritus.svg)](https://github.com/Smaug6739/Spiritus/tags/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

Spiritus has all the tools you will need for your Discord server, Spiritus is a multi-function Discord bot.
You can invite the hosted version [here](https://discord.com/oauth2/authorize?client_id=689210215488684044&scope=bot&permissions=1946446974)

## Commands

### Administration

| Name          | Description                          | Sub-commands   | Usage                 | Cd     |
| ------------- | ------------------------------------ | -------------- | --------------------- | ------ |
| commands      | Manage custom commands.              | list, add, rem | \<action> \<valeur>   | 10secs |
| reactionroles | Manage roles-reactions in the guild. | add, rem       | [paramètre] \(valeur) | 10secs |

### Bot

| Name   | Description                   | Sub-commands                                                                             | Usage               | Cd     |
| ------ | ----------------------------- | ---------------------------------------------------------------------------------------- | ------------------- | ------ |
| config | Config the bot.               | prefix, log-channel, welcome-message, experience, admin-invites, rank-card, rank-channel | [parameter] (value) | 10secs |
| invite | Send link invite for the bot. | none                                                                                     | none                | 10secs |
| ping   | Ping the bot.                 | none                                                                                     | none                | 3secs  |

### Experience

| Name        | Description                       | Sub-commands | Usage                      | Cd     |
| ----------- | --------------------------------- | ------------ | -------------------------- | ------ |
| adminxp     | Manage exp of users.              | add, rem     | \<@​user> \<nb_experience> | 10secs |
| leaderboard | Ranking of users on the guild.    | none         | none                       | 10secs |
| rank        | View your rank or rank of member. | none         | \<@​user>                  | 10secs |

### Fun

| Name | Description        | Sub-commands                     | Usage              | Cd    |
| ---- | ------------------ | -------------------------------- | ------------------ | ----- |
| info | Send informations. | user, bot, server, role, channel | \<action> \<value> | 5secs |

### Moderation

| Name   | Description              | Usage               | Cd     |
| ------ | ------------------------ | ------------------- | ------ |
| ban    | Ban a user.              | \<@​user> \<reason> | 10secs |
| kick   | Kick a user.             | \<@​user> \<raison> | 10secs |
| mute   | Mute a user.             | \<@​user> \<time>   | 10secs |
| purge  | Delete messages.         | \<nb_messages>      | 10secs |
| rename | Change nickname of user. | \<user> \<new_name> | 10secs |
| unban  | Unban a user.            | \<user_id>          | 10secs |
| unmute | Unmute a user.           | \<@​user>           | 10secs |
| warn   | Warn a user.             | \<user> \<reason>   | 10secs |

## How to install

1. Clone the repo
2. Clone `config.template.ts` from src directory into the src directory and rename it to `config.ts`
3. Install the dependencies: `npm install`
4. Compile typescript : `npm run build`
5. Start the bot: `npm run start`

## Contributions/Licence

This project has an MIT license. And you are welcome to contribue. To contribute, please open a pull request on dev branch.

## Need help

If you have question or need help, open issue or join [support server](https://discord.gg/TC7Qjfs).

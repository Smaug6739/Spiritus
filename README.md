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

## Functions

-Reactions-roles  
-Moderation  
-Leveling  
-Admins commands  
-Customs commands  
-Economy module  
-Fun commands

## Commands

### Admin

| Name    | Description                 | Usage                   | Cd    |
| ------- | --------------------------- | ----------------------- | ----- |
| charge  | Loads guilds in database    | none                    | 5secs |
| eval    | Execute javascript code     | <js_code>               | 5secs |
| exe     | Execute command in terminal | \<command>              | 5secs |
| premium | Update premium guild        | \<add / rem> <guild_id> | 5secs |
| pull    | Pull github repository      | none                    | 5secs |
| reload  | Reload command of bot       | \<directory> \<file>    | 5secs |
| restart | Restart the bot             | none                    | 5secs |

### Administration

| Name          | Description                          | Sub-commands                                                    | Usage                 | Cd     |
| ------------- | ------------------------------------ | --------------------------------------------------------------- | --------------------- | ------ |
| channel       | Manage channels of the guild         | create, update, delete, clone, synchro, position, parent, topic | \<action> \<args>     | 5secs  |
| commands      | Manage custom commands.              | list, add, rem                                                  | \<action> \<valeur>   | 10secs |
| emojis        | Manage emojis of the guild.          | list, create, update, delete, view                              | \<action> \<args>     | 5secs  |
| modroles      | Manage moderator roles.              | list, add, rem                                                  | \<action> \<args>     | 5secs  |
| reactionroles | Manage roles-reactions in the guild. | add, rem                                                        | [paramètre] \(valeur) | 10secs |
| roles         | Manage and add/rem roles.            | list, create, update, delete, position, add, rem                | \<action> \<args>     | 5secs  |
| server        | Commands for manage server settings. | icon, name, moderation, invite-create, webhook-create           | \<action> \<value>    | 5secs  |

### Bot

| Name       | Description                                   | Sub-commands                                                                             | Usage               | Cd     |
| ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------- | ------ |
| config     | Config the bot.                               | prefix, log-channel, welcome-message, experience, admin-invites, rank-card, rank-channel | [parameter] (value) | 10secs |
| help       | List of bot commands.                         | none                                                                                     | \<command_name>     | 3secs  |
| ignore     | Disable the bot in a channel.                 | add, rem, list                                                                           | \<action> \<args>   | 5secs  |
| invite     | Send link invite for the bot.                 | none                                                                                     | none                | 10secs |
| ping       | Ping the bot.                                 | none                                                                                     | none                | 3secs  |
| prefix     | Change prefix of the bot.                     | none                                                                                     | \<new_prefix>       | 10secs |
| setmodlogs | Choose a log channel for moderation commands. | none                                                                                     | \<channel>          | 5secs  |
| suggest    | Send suggestion for the bot.                  | none                                                                                     | \<your_suggestion>  | 15secs |
| support    | Send link to the support.                     | none                                                                                     | none                | 10secs |

### Economy

| Name      | Description                         | Sub-commands | Usage                    | Cd     |
| --------- | ----------------------------------- | ------------ | ------------------------ | ------ |
| adminshop | Configure the shop of guild.        | add, rem     | none                     | 10secs |
| daily     | Give your money every day.          | none         | none                     | 10secs |
| pay       | Give coins to a user.               | none         | \<user> \<money_to_give> | 10secs |
| shop      | Show the store and allow purchases. | none         | buy \<item_name>         | 10secs |

### Experience

| Name        | Description                       | Sub-commands | Usage                      | Cd     |
| ----------- | --------------------------------- | ------------ | -------------------------- | ------ |
| adminxp     | Manage exp of users.              | add, rem     | \<@​user> \<nb_experience> | 10secs |
| leaderboard | Ranking of users on the guild.    | none         | none                       | 10secs |
| rank        | View your rank or rank of member. | none         | \<@​user>                  | 10secs |

### Fun

| Name     | Description                       | Sub-commands                     | Usage                      | Cd     |
| -------- | --------------------------------- | -------------------------------- | -------------------------- | ------ |
| 8ball    | Ask a question to the magic ball. | none                             | \<question>                | 5secs  |
| binary   | Convert string to binary.         | none                             | \<text>                    | 3secs  |
| dice     | Roll one or more dice.            | none                             | \<numbre_dice> \<max_dice> | 10secs |
| info     | Send informations.                | user, bot, server, role, channel | \<action> \<value>         | 5secs  |
| lmgtfy   | Send link lmgtfy.                 | none                             | \<question>                | 10secs |
| pool     | Send pool in a channel.           | none                             | \<question>                | 3secs  |
| say      | Send message in a channel.        | none                             | \<text>                    | 10secs |
| sayembed | Send message in an embed.         | none                             | \<text>                    | 3secs  |

### Moderation

| Name   | Description                    | Usage                        | Cd     |
| ------ | ------------------------------ | ---------------------------- | ------ |
| ban    | Ban a user.                    | \<@​user> \<reason>          | 10secs |
| filter | Forbidden words on the server. | \<word>                      | 10secs |
| kick   | Kick a user.                   | \<@​user> \<raison>          | 10secs |
| lock   | Lock a channel.                | \<#channel> or \<channel_id> | 10secs |
| mute   | Mute a user.                   | \<@​user> \<time>            | 10secs |
| purge  | Delete messages.               | \<nb_messages>               | 10secs |
| rename | Change nickname of user.       | \<user> \<new_name>          | 10secs |
| unban  | Unban a user.                  | \<user_id>                   | 10secs |
| unlock | Unlock a channel.              | \<channel>                   | 5secs  |
| unmute | Unmute a user.                 | \<@​user>                    | 10secs |
| warn   | Warn a user.                   | \<user> \<reason>            | 10secs |

## How to install

1. Clone the repo
2. Clone `configuration.template.js` into the main directory and rename it to `configuration.js`
3. Install the dependencies: `npm install`
4. Start the bot: `node main.js`

## Contributions/Licence

This project has an MIT license. And you are welcome to contribute.

## Need help

If you have question or need help, open issue.

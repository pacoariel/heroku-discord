"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const db = require("quick.db");
const util_1 = require("util");
const chalk = require("chalk");
const client = new Discord.Client();
const prefix = '+';
const code = Math.floor(Math.random() * 1000);
let peopleinGiveaway = [];
const cooldown = new Set();
const cdseconds = 18000;
const dailyCooldown = new Set();
const cdseconds1 = 86400;
const cakeCooldown = new Set();
const cdseconds2 = 30;
function emoji(id) {
    var _a;
    return (_a = client.emojis.get(id)) === null || _a === void 0 ? void 0 : _a.toString();
}
client.on('ready', () => {
    client
        .user
        .setActivity('+help for help', {
        type: 'WATCHING',
    });
    const allUsers = client.users.array();
    const allServers = client.guilds.array();
    allUsers.forEach((user) => {
        if (util_1.isNull(db.get(user.id))) {
            db.set(user.id, {
                money: 50,
                warns: 0,
                messages: [],
            });
        }
    });
    allServers.forEach((server) => {
        if (util_1.isNull(db.get(server.id))) {
            db.set(server.id, {
                automodon: 0,
                welcomeChannelId: '',
                welcomeMessage: '',
            });
        }
    });
    console.log(chalk.keyword('green')('Ready to go!'));
    console.log(chalk.keyword('magenta') `The secret code is ${code}`);
});
client.on('guildMemberAdd', (member) => {
    const welcomeChannelId = db.get(`${member.guild}.welcomeChannelId`);
    const welcomeMessage = db.get(`${member.guild.id}.welcomeMessage`);
    if (welcomeChannelId !== '' && welcomeMessage !== '') {
        const welcomeChannel = client.channels.get(`${welcomeChannelId}`);
        welcomeChannel.send(`${member}, ${welcomeMessage}`);
    }
    if (member.guild.id === '717610892686131200') {
        const welcomeChannelCake = client.channels.get('717627301923127336');
        welcomeChannelCake.send(`Hi and welcome to the Cakey Bot support server ${member}`);
    }
    if (util_1.isNull(db.get(member.id))) {
        db.set(member.id, { money: 50, warns: 0, messages: [] });
    }
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const splitMessage = message.content.split(' ');
    const memberId = (_a = message.mentions.members.first()) === null || _a === void 0 ? void 0 : _a.id;
    const automodon = db.get(`${message.guild.id}.automodon`);
    const allMembers = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.filter((member) => !member.user.bot).size;
    const allBots = (_c = message.guild) === null || _c === void 0 ? void 0 : _c.members.filter((member) => member.user.bot).size;
    const re = /https:\/\/discord.gg\//gm;
    if (automodon === 1) {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            if (message.content.match(re)) {
                message.delete();
            }
        }
    }
    function cake(link, description) {
        const cakeEmbed = new Discord.RichEmbed()
            .setTitle(`${description}`)
            .setImage(`${link}`);
        message.channel.send(cakeEmbed);
    }
    function eightball(text, question) {
        const eightBall = new Discord.RichEmbed()
            .setTitle('The magic ball has responded !')
            .setDescription(`Your question: ${question}`)
            .addField('The ball has responded:', `\`\`\`${text}\`\`\``);
        message.channel.send(eightBall);
    }
    if (message.author.bot)
        return;
    db.push(`${message.author.id}.messages`, `\`\`\`${message.content}\`\`\``);
    const playersMoney = db.get(`${message.author.id}.money`);
    const helpFunembed = new Discord.RichEmbed()
        .setColor('#993366')
        .setTitle('Fun Help')
        .setDescription('Command and under it is description')
        .addField('`cake`', 'Outputs a cake. Yes exactly a cake.', true)
        .addField('`8ball`', 'Outputs an answer to your question', true)
        .addBlankField()
        .addField('`say`', 'Outputs whatever you say after the command', true)
        .addField('`think`', 'Outputs what you thought', true)
        .addBlankField()
        .addField('`encode`', 'ecodes a message', true)
        .addField('`decodes`', 'decodes a message', true);
    const helpBugembed = new Discord.RichEmbed()
        .setColor('#993366')
        .setTitle('Report/Suggestion Help')
        .setDescription('Command and under it is description')
        .addField('`suggest` or `suggestion`', '+suggestion + description of suggestion', true)
        .addField('`bug`', '+bug + the bug', true)
        .addField('`question`', '+question + the question', true);
    const economyHelp = new Discord.RichEmbed()
        .setColor('#66ffff')
        .setTitle('Economy Help')
        .setDescription('Command and under it is description')
        .addField('`bal`', 'Outputs your money', true)
        .addField('`work`', 'Adds money to you', true)
        .addField('`daily`', 'gives you 2000(can be used every 24 hours)');
    const helpModeratorembed = new Discord.RichEmbed()
        .setColor('#993366')
        .setTitle('Modertor Help')
        .setDescription('Command and under it is description')
        .addField('`kick`', '@member Reason', true)
        .addField('`ban`', '@member Reason', true)
        .addField('`purge`', 'deletes up to 100 messages in the channel', true)
        .addField('`log`', '@member / gives you all messages a person ever send', true)
        .addField('`warn`', '@member / warns the person', true)
        .addField('`unwarn`', '@member / unwarns the person', true)
        .addField('`warns`', '@member / gives you amount of warns the person has', true)
        .addBlankField()
        .addField('`automod?`', 'tells you if automod is on or off', true)
        .addField('`automod`', 'switches automod on or off', true);
    const helpembed = new Discord.RichEmbed()
        .setColor('#66ffff')
        .setTitle('Normal Help')
        .setDescription('Command and under it is description')
        .addField('`botinfo`', 'Outputs info about the bot', true)
        .addField('`invites`', 'Outputs all Bot related invites and links', true)
        .addField('`membercount`', 'Outputs the amount of human people on the server', true)
        .addField('`serverinfo`', 'Outputs some info about the server', true)
        .addField('`servercount`', 'Outputs on how many servers the bot is', true);
    const giveawayHelp = new Discord.RichEmbed()
        .setTitle('***Global Cakey Giveaway***')
        .setDescription('**Current Giveaway:** \n ```html\n<Price: One custom command>\n</Consdition: needs to be sfw and no advertising>```\n the giveaway will end as soon as we have like...idk maybe 20 people')
        .addField('`enter`', 'This makes you enter the giveaway :D', true)
        .addBlankField()
        .addField('`participants`', 'outputs all people that entered **(Admin command + will ping people be carefull!)**')
        .addField('`g-p-count`', 'outputs the amount of people in giveaway!');
    if (message.content.indexOf(prefix) !== 0)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = (_d = args.shift()) === null || _d === void 0 ? void 0 : _d.toLowerCase();
    switch (command) {
        case 'AddText':
            if (!message.member.hasPermission('MANAGE_CHANNELS')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const emoji1 = args[1];
            message.guild.channels.find('name', `${message.channel}`).setName(`${emoji1}|${message.channel}`);
            break;
        case 'automod':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const onOrOff = splitMessage[1];
            const testStringAutomod = 'on off On Off';
            if (!testStringAutomod.includes(onOrOff)) {
                message.reply('Options are `on`, `off`');
                return;
            }
            switch (onOrOff) {
                case 'on':
                    if (automodon === 1) {
                        message.reply('Already on');
                        return;
                    }
                    db.add(`${message.guild.id}.automodon`, 1);
                    message.reply('Switched it to on');
                    break;
                case 'off':
                    if (automodon === 0) {
                        message.reply('Already off');
                        return;
                    }
                    db.subtract(`${message.guild.id}.automodon`, 1);
                    message.reply('Switched it to off');
                    break;
                default:
                    break;
            }
            break;
        case 'automod?':
            message.channel.send(`1 for on 0 for off \n Automod is currently ${automodon}`);
            break;
        case 'help':
            const hepEmbed = new Discord.RichEmbed()
                .setTitle('Help')
                .setColor('#ff6699')
                .setThumbnail('https://cdn.discordapp.com/attachments/725324556696420402/725992377575145523/Cakey_logo.png')
                .setDescription('All types of Help embeds')
                .addField('React 🇳 or `help-n`', 'aka Normal HelpEmbed', true)
                .addField('React ⚒️ or `help-m`', 'aka Moderator HelpEmbed', true)
                .addField('React 💬 or `help-r`', 'aka Bugrepot/Suggestion HelpEmbed', true)
                .addField('React 🤣 or `help-fun`', 'aka fun HelpEmbed', true)
                .addField('React 💰 or `help-e`', 'aka economy HelpEmbed', true)
                .addField('React 🎁 or `help-g`', '***Giveaways!!***', true);
            message.channel.send(hepEmbed);
            try {
                message.react('🇳');
                message.react('⚒️');
                message.react('💬');
                message.react('🤣');
                message.react('💰');
                message.react('🎁');
            }
            catch (error) {
                console.error('One of the emojis failed to react.');
            }
            const filter1 = (reaction, user) => ['🇳', '⚒️', '💬', '🤣', '💰', '🎁'].includes(reaction.emoji.name) && user.id === message.author.id;
            message.awaitReactions(filter1, { max: 1, time: 60000, errors: ['time'] })
                .then((collected) => {
                const reaction = collected.first();
                switch (reaction.emoji.name) {
                    case '🇳':
                        message.channel.send(helpembed);
                        break;
                    case '⚒️':
                        message.channel.send(helpModeratorembed);
                        break;
                    case '💬':
                        message.channel.send(helpBugembed);
                        break;
                    case '🤣':
                        message.channel.send(helpFunembed);
                        break;
                    case '💰':
                        message.channel.send(economyHelp);
                        break;
                    case '🎁':
                        message.channel.send(giveawayHelp);
                        break;
                    default:
                        break;
                }
            })
                .catch(() => {
                message.reply('you reacted with none of them.');
            });
            break;
        case 'help-g':
            message.channel.send(giveawayHelp);
            break;
        case 'help-n':
            message.channel.send(helpembed);
            break;
        case 'help-e':
            message.channel.send(economyHelp);
            break;
        case 'help-r':
            message.channel.send(helpBugembed);
            break;
        case 'help-m':
            message.channel.send(helpModeratorembed);
            break;
        case 'help-fun':
            message.channel.send(helpFunembed);
            break;
        case 'suggest':
            const suggestionDescription = message.content.slice(8);
            const suggestionChannel = client.channels.find('id', '727965361093345421');
            const suggestionEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s suggestion`)
                .setDescription(suggestionDescription);
            suggestionChannel.send(suggestionEmbed);
            message.channel.send('sucessfully send suggestion');
            break;
        case 'suggestion':
            const suggestion1Description = message.content.slice(11);
            const suggestion1Channel = client.channels.find('id', '727965361093345421');
            const suggestion1Embed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s suggestion`)
                .setDescription(suggestion1Description);
            suggestion1Channel.send(suggestion1Embed);
            message.channel.send('sucessfully send suggestion');
            break;
        case 'av':
            const memberAv = message.mentions.members.first();
            if (!memberAv) {
                message.reply('Please mention a valid member of this server');
                return;
            }
            const avEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username} requested ${memberAv.user.username}'s Avatar`)
                .setImage(memberAv.user.avatarURL);
            message.channel.send(avEmbed);
            break;
        case 'daily':
            if (dailyCooldown.has(message.author.id)) {
                message.reply('You need to wait 24 hours before using this again ');
                return;
            }
            dailyCooldown.add(message.author.id);
            message.reply('You got 2000$');
            db.add(`${message.author.id}.money`, 2000);
            setTimeout(() => {
                dailyCooldown.delete(message.author.id);
            }, cdseconds1 * 1000);
            break;
        case 'bug':
            const bugDescription = message.content.slice(4);
            const bugChannel = client.channels.find('id', '727965322329718837');
            const bugEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s bug report`)
                .setDescription(bugDescription);
            bugChannel.send(bugEmbed);
            message.channel.send('sucessfully send bug report');
            break;
        case 'invites':
            const invitesEmbed = new Discord.RichEmbed()
                .setTitle('Bot related invites/links')
                .addField('Links/Invites', '[Add the Bot](https://discord.com/api/oauth2/authorize?client_id=725635490694561802&permissions=8&scope=bot) \n [Join the support server](https://discord.gg/E9EanAg) \n [Check out our website](https://hahota.fun/website/cake/)');
            message.channel.send(invitesEmbed);
            break;
        case 'question':
            const askDescription = message.content.slice(9);
            const askChannel = client.channels.find('id', '727965394169757707');
            const askEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s question`)
                .setDescription(askDescription);
            askChannel.send(askEmbed);
            message.channel.send('sucessfully send question');
            break;
        case 'log':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            if (!memberId) {
                message.reply('Please mention a valid member of this server');
                return;
            }
            const logEmbed = new Discord.RichEmbed()
                .setTitle(`All messages of ${memberId}`)
                .setDescription(`${db.get(`${memberId}.messages`)}`);
            console.log(`${memberId}`);
            message.channel.send(logEmbed);
            break;
        case 'think':
            const thought = message.content.slice(7);
            message.channel.send(`**${message.author.username}** is trying to think about *${thought}*`);
            message.delete();
            break;
        case 'bal':
            message.channel.send(`You currently have **${playersMoney}**`);
            break;
        case 'say':
            console.log(`${message.author.username}`);
            message.delete();
            message.channel.send(message.content.slice(5));
            break;
        case 'work':
            if (cooldown.has(message.author.id)) {
                message.reply('You need to wait 5 hours before using this again ');
                return;
            }
            cooldown.add(message.author.id);
            const workEmbed = new Discord.RichEmbed();
            const random = Math.floor(Math.random() * 24) + 1;
            let msg = `You got ${random}`;
            if (random > 17) {
                db.add(`${message.author.id}.money`, random);
                msg = `**${message.author.username}**, You made a **yummy** cake. You got ${random}`;
                workEmbed.setTitle(`${msg}`).setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo4gUCdnQ4JQGW8FcpLyjmVw4AJJ0uE_rjxg&usqp=CAU');
            }
            else if (random > 5) {
                db.add(`${message.author.id}.money`, random);
                msg = `**${message.author.username}**, You made a **ugly** cake. You got ${random}`;
                workEmbed.setTitle(`${msg}`).setImage('https://i.pinimg.com/originals/29/fd/e2/29fde238bbe604cb04388d4b56b9afb1.jpg');
            }
            else {
                db.subtract(`${message.author.id}.money`, random * 15);
                msg = `**${message.author.username}**, Your cake killed a peron pay ${random * 15}`;
                workEmbed.setTitle(`${msg}`).setImage('https://tenor.com/view/dead-dying-dog-shocked-cake-gif-16453337');
            }
            message.channel.send(workEmbed);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, cdseconds * 1000);
            break;
        case 'serverinfo':
            const serverinfoEmbed = new Discord.RichEmbed()
                .setTitle(`__${message.guild.name}__`)
                .setDescription(`Owner is **${message.guild.owner}**`)
                .addField('Created', `${message.guild.createdAt}`)
                .addField('Human members', `${allMembers}`, true)
                .addField('Bots', `${allBots}`, true)
                .addField('Complete', `${message.guild.memberCount}`);
            message.channel.send(serverinfoEmbed);
            break;
        case 'servercount':
            message.channel.send(`I am on **${client.guilds.size}** Servers!`);
            break;
        case 'cake':
            if (cakeCooldown.has(message.author.id)) {
                message.reply('You need to wait 30 seconds before using this command again');
                return;
            }
            cakeCooldown.add(message.author.id);
            const random2 = Math.floor(Math.random() * 109) + 1;
            if (random2 < 110 && random2 > 100) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974848155877378/5.jpeg', 'Oreo with a big pile of fruits....');
            }
            else if (random2 < 100 && random2 > 90) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974842900545587/1.jpeg', "Rainbows.... Wait what **no** rainbows don't have white!??!?!");
            }
            else if (random2 < 90 && random2 > 80) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974844041265172/2.jpeg', 'Choclate hearts.... Lovely.');
            }
            else if (random2 < 80 && random2 > 70) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974845455007855/3.jpeg', 'Not so smart now huh. Understood ? Cause of **SMART**ies?? Not funny? K 😭.');
            }
            else if (random2 < 70 && random2 > 60) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974846528487557/4.jpeg', 'Hmmm this looks veeeeeery yummy.');
            }
            else if (random2 < 60 && random2 > 55) {
                db.add(`${message.author.id}.money`, 100);
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974849351385158/6.jpeg', 'This is the rarest cake of the collection :-). You amazed? No? Ok you get the 100$ anyways.');
            }
            else if (random2 < 55 && random2 > 50) {
                db.add(`${message.author.id}.money`, 75);
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974850530115666/7.jpeg', 'This is also a rare cake though not the rarest. You get 75$.');
            }
            else if (random2 < 50 && random2 > 40) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974852064968875/8.jpeg', '***Pig***');
            }
            else if (random2 < 40 && random2 > 30) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974853474517073/9.jpeg', 'Roses. Beautiful cake.');
            }
            else if (random2 < 30 && random2 > 20) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727974854426624121/10.jpeg', 'The Galaxy: infinite possibilities no end a real dream.');
            }
            else if (random2 < 20 && random2 > 10) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727975007405211708/11.jpeg', "I'm not a Bunny !??!?!? WHAT DO YOU WANT FROM ME.");
            }
            else if (random2 < 10 && random2 > 0) {
                cake('https://cdn.discordapp.com/attachments/727963617835614318/727975012945887312/12.jpeg', 'Quadra Oreo with rainbow Stuff on it..... I like it!');
            }
            setTimeout(() => {
                cakeCooldown.delete(message.author.id);
            }, cdseconds2 * 1000);
            break;
        case 'setwelcomechannel':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const newID = message.mentions.channels.first().id;
            if (!newID) {
                message.reply('Please mention a valid channel of this server');
                return;
            }
            db.set(`${message.guild.id}.welcomeChannelId`, `${newID}`);
            message.channel.send(`Changed welcomeChannel id to **${db.get(`${message.guild.id}.welcomeChannelId`)}**`);
            break;
        case 'welcomeChannel':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            message.channel.send(`Current welcome channel is **${db.get(`${message.guild.id}.welcomeChannelId`)}**`);
            break;
        case 'setwelcomemessage':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const welcomeMessage = message.content.slice(18);
            db.set(`${message.guild.id}.welcomeMessage`, `${welcomeMessage}`);
            message.channel.send(`Changed welcome message to **${db.get(`${message.guild.id}.welcomeMessage`)}**`);
            break;
        case 'botinfo':
            const botinfoEmbed = new Discord.RichEmbed()
                .setColor('')
                .setAuthor('Owners: CAKE BOI, Pacific Range', 'https://cdn.discordapp.com/attachments/733515498712596551/734048630025224222/PacificRangePFP.png')
                .setTitle('**Cakey Pro**')
                .setDescription('CAKEYS SON')
                .addField('Created On', `${client.user.createdAt}`)
                .setThumbnail('https://cdn.discordapp.com/attachments/725324556696420402/725992377575145523/Cakey_logo.png');
            message.channel.send(botinfoEmbed);
            break;
        case 'kick':
            const noKick = new Discord.RichEmbed().setColor('#ff0000').setDescription('I cannot kick this user! Do they have a higher role? Do I have ban permissions?');
            if (!message.member.hasPermission('KICK_MEMBERS')) {
                message.reply('Sorry, you need Kick members permission to use this.');
                return;
            }
            const member = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!member) {
                message.reply('Please mention a valid member of this server');
                return;
            }
            if (!member.kickable) {
                message.reply(noKick);
                return;
            }
            let reason = args.slice(1).join(' ');
            if (!reason)
                reason = 'No reason provided';
            yield member.kick(reason)
                .catch((error) => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
            member.send(`You where kicked from ${member.guild.name}`);
            break;
        case 'ban':
            const noBan = new Discord.RichEmbed().setColor('#ff0000').setDescription('I cannot ban this user! Do they have a higher role? Do I have ban permissions?');
            if (!message.member.hasPermission('BAN_MEMBERS')) {
                message.reply('Sorry, you need Ban members permission to use this.');
                return;
            }
            const member1 = message.mentions.members.first();
            if (!member1) {
                message.reply('Please mention a valid member of this server');
                return;
            }
            if (!member1.bannable) {
                message.reply(noBan);
                return;
            }
            const reason1 = args.slice(1).join(' ');
            if (!reason1)
                reason = 'No reason provided';
            yield member1.ban(reason1)
                .catch((error) => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
            message.reply(`${member1.user.tag} has been banned by ${message.author.tag} because: ${reason1}`);
            member1.send(`You where banned from ${member1.guild.name}`);
            break;
        case 'purge':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const deleteCount = parseInt(args[0], 10);
            if (!deleteCount || deleteCount < 2 || deleteCount > 100) {
                message.reply('Please provide a number between 2 and 100 for the number of messages to delete');
                return;
            }
            const fetched = yield message.channel.fetchMessages({ limit: deleteCount });
            message.channel.bulkDelete(fetched)
                .catch((error) => message.reply(`Couldn't delete messages because of: ${error}`));
            break;
        case '8ball':
            const question = message.content.slice(6);
            const random3 = Math.floor((Math.random() * 10) + 1);
            switch (random3) {
                case 1:
                    eightball('umm idk maybe?', question);
                    break;
                case 2:
                    eightball('OFC', question);
                    break;
                case 3:
                    eightball('yea sure', question);
                    break;
                case 4:
                    eightball('never', question);
                    break;
                case 5:
                    eightball('no way', question);
                    break;
                case 6:
                    eightball('maybe, maybe not', question);
                    break;
                case 7:
                    eightball('That question is stupid', question);
                    break;
                case 8:
                    eightball('There is no answer to that', question);
                    break;
                case 9:
                    eightball('🤔 not sure', question);
                    break;
                case 10:
                    eightball('les not answer that.', question);
                    break;
                case 11:
                    eightball('Ya', question);
                    break;
                case 12:
                    eightball('✅', question);
                    break;
                case 13:
                    eightball('❌', question);
                    break;
                case 14:
                    eightball('not gonna answer', question);
                    break;
                default:
                    break;
            }
            break;
        case 'enter':
            if (!peopleinGiveaway.includes(message.author)) {
                message.channel.send('entered');
                peopleinGiveaway.push(message.author);
            }
            else {
                message.reply('You already in!');
            }
            break;
        case 'encode':
            const toEncode = message.content.slice(7);
            const buff = Buffer.from(toEncode, 'utf-8');
            const encodedString = buff.toString('base64');
            const endodeMessageEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username} just ENCODED a message`)
                .setDescription(`message: **${toEncode}**`)
                .addField('ENCODED MESSAGE', `\`\`\`${encodedString}\`\`\``);
            message.channel.send(endodeMessageEmbed);
            break;
        case 'decode':
            const toDecode = message.content.slice(7);
            const buff1 = Buffer.from(toDecode, 'base64');
            const decodedString = buff1.toString('utf-8');
            const decodedMessageEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username} just decoded a message`)
                .setDescription(`message: **${toDecode}**`)
                .addField('DECODED MESSAGE', `\`\`\`${decodedString}\`\`\``);
            message.channel.send(decodedMessageEmbed);
            break;
        case 'participants':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            message.channel.send(peopleinGiveaway);
            break;
        case 'g-p-count':
            message.channel.send(`There are **${peopleinGiveaway.length}** people in the giveaway.`);
            break;
        case 'end':
            const Winner = peopleinGiveaway[Math.floor(Math.random() * peopleinGiveaway.length)];
            switch (message.author.id) {
                case '634724788761395201':
                    message.channel.send(`The Winner issssssss ${Winner}!!!! \n Conrgats`);
                    break;
                case '691206573837647924':
                    message.channel.send(`The Winner issssssss ${Winner}!!!! \n Conrgats`);
                    break;
                default:
                    message.channel.send('Only `Cake Boi` and `Pacific` can do this!');
                    break;
            }
            break;
        case 'membercount':
            message.channel.send(`This Server has ${allMembers} human members`);
            break;
        case 'warn':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const member3 = message.mentions.members.first();
            if (!member3) {
                message.reply('Please mention a valid member of this server');
                return;
            }
            if (member3.hasPermission('ADMINISTRATOR')) {
                message.reply('Sorry, This person is an admin');
                return;
            }
            message.channel.send(`Warned ${member3}`);
            db.add(`${memberId}.warns`, 1);
            member3.send('You were warned');
            break;
        case 'unwarn':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const member4 = message.mentions.members.first();
            if (!member4) {
                message.reply('Please mention a valid member of this server');
                return;
            }
            if (member4.hasPermission('ADMINISTRATOR')) {
                message.reply('Sorry, This person is an admin');
                return;
            }
            if (db.get(`${memberId}.warns`) === 0) {
                message.channel.send('This Person has 0 Warns');
            }
            else {
                message.channel.send(`Unwarned ${member4}`);
                db.subtract(`${memberId}.warns`, 1);
                member4.send('You were unwarned');
            }
            break;
        case 'warns':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.reply("Sorry, you don't have permissions to use this!");
                return;
            }
            const member5 = message.mentions.members.first();
            if (!member5) {
                message.reply('Please mention a valid member of this server');
                return;
            }
            message.channel.send(`${member5} has ${db.get(`${memberId}.warns`)} warns`);
            break;
        case 'clear-g':
            switch (message.author.id) {
                case '634724788761395201':
                    message.channel.send('Cleared Giveaway!');
                    peopleinGiveaway = [];
                    break;
                case '691206573837647924':
                    message.channel.send('Cleared Giveaway!');
                    peopleinGiveaway = [];
                    break;
                default:
                    message.channel.send('Only `Cake Boi` and `Pacific` can do this!');
                    break;
            }
            break;
        default:
            break;
    }
}));
client.login(process.env.token1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUE4QjtBQUM5QiwrQkFBK0I7QUFPL0IsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBWXBELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUVuQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUc5QyxJQUFJLGdCQUFnQixHQUFVLEVBQUUsQ0FBQztBQUVqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQztBQUV4QixNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV6QixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9CLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUd0QixTQUFTLEtBQUssQ0FBQyxFQUFVOztJQUN2QixhQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxRQUFRLEdBQUc7QUFDM0MsQ0FBQztBQUVELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN0QixNQUFNO1NBQ0gsSUFBSTtTQUNKLFdBQVcsQ0FDVixnQkFBZ0IsRUFDaEI7UUFDRSxJQUFJLEVBQUUsVUFBVTtLQUNqQixDQUNGLENBQUM7SUFFSixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFN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
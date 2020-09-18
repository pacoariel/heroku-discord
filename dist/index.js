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
const cakes = 'common uncommon rare epic legendary mythic';
const code = Math.floor(Math.random() * 1000);
let peopleinGiveaway = [];
const cooldown = new Set();
const cdseconds = 18000;
const dailyCooldown = new Set();
const cdseconds1 = 86400;
const bakeCooldown = new Set();
const cdseconds3 = 86400;
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
                messageCount: 0,
                common: 0,
                uncommon: 0,
                rare: 0,
                epic: 0,
                legendary: 0,
                mythic: 0,
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
        db.set(member.id, {
            money: 50,
            warns: 0,
            messages: [],
            messageCount: 0,
            common: 0,
            uncommon: 0,
            rare: 0,
            epic: 0,
            legendary: 0,
            mythic: 0,
        });
    }
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    db.add(`${message.author.id}.messageCount`, 1);
    function give(messages, roleName) {
        if (db.get(`${message.author.id}.messageCount`) < messages) {
            message.member.addRole(roleName);
            message.channel.send('Level Up!');
        }
    }
    const SVCommon = 500;
    const SVUncommon = 1000;
    const SVRare = 1650;
    const SVEpic = 2500;
    const SVLegendary = 5000;
    const SVMythic = 10000;
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
    const Percentage = Math.floor(Math.random() * 101);
    function rarity(from, to, name) {
        if (from > Percentage && Percentage > to) {
            message.channel.send(`You backed a ${name} caake!`);
            db.add(`${message.author.id}.${name}`, 1);
        }
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
        .addField('`daily`', 'gives you 2000(can be used every 24 hours)')
        .addField('`market`', 'All Items and what they are sold for')
        .addField('`bake`', 'You get a cake')
        .addField('`sell`', 'You sell a cake')
        .addField('`deliver`', 'You give a cake to a person')
        .addField('`inv`', 'Shows you your inventory');
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
                .addField('Links/Invites', '[Add the Bot](https://discord.com/api/oauth2/authorize?client_id=725635490694561802&permissions=8&scope=bot) \n [Join the support server](https://discord.gg/E9EanAg)');
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
        case 'bake':
            if (bakeCooldown.has(message.author.id)) {
                message.reply('You need to wait 24 hours before using this again ');
                return;
            }
            rarity(50, 60, 'common');
            rarity(30, 45, 'uncommon');
            rarity(15, 25, 'rare');
            rarity(10, 15, 'epic');
            rarity(5, 10, 'legendary');
            rarity(0, 2, 'mythic');
            setTimeout(() => {
                bakeCooldown.delete(message.author.id);
            }, cdseconds3 * 1000);
            break;
        case 'deliver':
            if (!cakes.includes(args[1])) {
                message.channel.send('No valid option given: The options are ```common, uncommon, rare, epic, legendary, mythic');
                return;
            }
            if (db.get(`${message.author.id}.${args[1]}`) > 0) {
                const mentionedPersone = message.mentions.members.first();
                if (!mentionedPersone) {
                    message.reply('Please mention a valid member of this server');
                    return;
                }
                db.subtract(`${message.author.id}.${args[1]}`, 1);
                db.add(`${memberId}.${args[1]}`, 1);
                message.channel.send(`You delivered(gave) ${mentionedPersone} a ${args[1]} cake`);
            }
            else {
                message.channel.send(`You don't own a ${args[1]} cake`);
            }
            break;
        case 'inv':
            const common = `common: \`${db.get(`${message.author.id}.common`)}\``;
            const uncommon = `uncommmon: \`${db.get(`${message.author.id}.uncommmon`)}\``;
            const rare = `rare: \`${db.get(`${message.author.id}.rare`)}\``;
            const epic = `epic: \`${db.get(`${message.author.id}.epic`)}\``;
            const legendary = `legendary: \`${db.get(`${message.author.id}.legendary`)}\``;
            const mythic = `mythic: \`${db.get(`${message.author.id}.mythic`)}\``;
            const allCakesHave = [];
            if (!common.match(/0/g)) {
                allCakesHave.push(common);
            }
            else if (!uncommon.match(/0/g)) {
                allCakesHave.push(uncommon);
            }
            else if (!rare.match(/0/g)) {
                allCakesHave.push(rare);
            }
            else if (!epic.match(/0/g)) {
                allCakesHave.push(epic);
            }
            else if (!legendary.match(/0/g)) {
                allCakesHave.push(legendary);
            }
            else if (!mythic.match(/0/g)) {
                allCakesHave.push(mythic);
            }
            const invEmbed = new Discord.RichEmbed()
                .setTitle('Your Inventory')
                .setDescription(allCakesHave);
            message.channel.send(invEmbed);
            break;
        case 'sell':
            if (!cakes.includes(args[1])) {
                message.channel.send('No valid option given: The options are ```common, uncommon, rare, epic, legendary, mythic```');
                return;
            }
            if (db.get(`${message.author.id}.${args[1]}`) > 0) {
                db.subtract(`${message.author.id}.${args[1]}`, 1);
                switch (args[1]) {
                    case 'common':
                        db.add(`${memberId}.money`, SVCommon);
                        break;
                    case 'uncommon':
                        db.add(`${memberId}.money`, SVUncommon);
                        break;
                    case 'rare':
                        db.add(`${memberId}.money`, SVRare);
                        break;
                    case 'epic':
                        db.add(`${memberId}.money`, SVEpic);
                        break;
                    case 'legendary':
                        db.add(`${memberId}.money`, SVLegendary);
                        break;
                    case 'mythic':
                        db.add(`${memberId}.money`, SVMythic);
                        break;
                    default:
                        break;
                }
                message.channel.send(`You Sold a ${args[1]} cake`);
            }
            else {
                message.channel.send(`You don't own a ${args[1]} cake`);
            }
            break;
        case 'market':
            const market = new Discord.RichEmbed()
                .setTitle('The Market')
                .setDescription(`**Common** sells for **${SVCommon}** \n **Uncommon** sells for **${SVUncommon}** \n **Rare** sells for **${SVRare}** \n **Epic** sells for **${SVEpic}** \n **Legendary** sells for **${SVLegendary}** \n **Mythic** sells for **${SVMythic}**`);
            message.channel.send(market);
            break;
    }
}));
client.login(process.env.token1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUE4QjtBQUM5QiwrQkFBK0I7QUFPL0IsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBWXBELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNuQixNQUFNLEtBQUssR0FBRyw0Q0FBNEMsQ0FBQztBQUUzRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUc5QyxJQUFJLGdCQUFnQixHQUFVLEVBQUUsQ0FBQztBQUVqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQztBQUV4QixNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV6QixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9CLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV6QixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9CLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUd0QixTQUFTLEtBQUssQ0FBQyxFQUFVOztJQUN2QixhQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxRQUFRLEdBQUc7QUFDM0MsQ0FBQztBQUVELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN0QixNQUFNO1NBQ0gsSUFBSTtTQUNKLFdBQVcsQ0FDVixnQkFBZ0IsRUFDaEI7UUFDRSxJQUFJLEVBQUUsVUFBVTtL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
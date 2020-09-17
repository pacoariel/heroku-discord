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
    give(1000, 'Bronze Member');
    give(5000, 'Silver Member');
    give(10000, 'Golden Member');
    give(50000, 'Mythic Member');
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
                message.channel.send('No valid option given: The options are ```common, uncommon, rare, epic, legendary, mythic');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFJQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUE4QjtBQUM5QiwrQkFBK0I7QUFPL0IsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBWXBELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUNuQixNQUFNLEtBQUssR0FBRyw0Q0FBNEMsQ0FBQztBQUUzRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUc5QyxJQUFJLGdCQUFnQixHQUFVLEVBQUUsQ0FBQztBQUVqQyxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQztBQUV4QixNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV6QixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9CLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQUV6QixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQy9CLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUd0QixTQUFTLEtBQUssQ0FBQyxFQUFVOztJQUN2QixhQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxRQUFRLEdBQUc7QUFDM0MsQ0FBQztBQUVELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUN0QixNQUFNO1NBQ0gsSUFBSTtTQUNKLFdBQVcsQ0FDVixnQkFBZ0IsRUFDaEI7UUFDRSxJQUFJLEVBQUUsVUFBVTtLQUNqQixDQUNGLENBQUM7SUFFSixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFHekMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hCLElBQUksYUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDM0IsRUFBRSxDQUFDLEdBQUcsQ0FDSixJQUFJLENBQUMsRUFBRSxFQUNQO2dCQUNFLEtBQUssRUFBRSxFQUFFO2dCQUNULEtBQUssRUFBRSxDQUFDO2dCQUNSLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFlBQVksRUFBRSxDQUFDO2dCQUNmLE1BQU0sRUFBRSxDQUFDO2dCQUNULFFBQVEsRUFBRSxDQUFDO2dCQUNYLElBQUksRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxDQUFDO2dCQUNQLFNBQVMsRUFBRSxDQUFDO2dCQUNaLE1BQU0sRUFBRSxDQUFDO2FBQ1YsQ0FDRixDQUFDO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM1QixJQUFJLGFBQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxHQUFHLENBQ0osTUFBTSxDQUFDLEVBQUUsRUFDVDtnQkFDRSxTQUFTLEVBQUUsQ0FBQztnQkFDWixnQkFBZ0IsRUFBRSxFQUFFO2dCQUNwQixjQUFjLEVBQUUsRUFBRTthQUNuQixDQUNGLENBQUM7U0FDSDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBLHNCQUFzQixJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO0lBQ3JDLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLG1CQUFtQixDQUFDLENBQUM7SUFDcEUsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBR25FLElBQUksZ0JBQWdCLEtBQUssRUFBRSxJQUFJLGNBQWMsS0FBSyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxDQUF3QixDQUFDO1FBQ3pGLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEtBQUssY0FBYyxFQUFFLENBQUMsQ0FBQztLQUNyRDtJQUNELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssb0JBQW9CLEVBQUU7UUFDNUMsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBd0IsQ0FBQztRQUM1RixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsa0RBQWtELE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDckY7SUFDRCxJQUFJLGFBQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO1FBQzdCLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNoQixLQUFLLEVBQUUsRUFBRTtZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsUUFBUSxFQUFFLEVBQUU7WUFDWixZQUFZLEVBQUUsQ0FBQztZQUNmLE1BQU0sRUFBRSxDQUFDO1lBQ1QsUUFBUSxFQUFFLENBQUM7WUFDWCxJQUFJLEVBQUUsQ0FBQztZQUNQLElBQUksRUFBRSxDQUFDO1lBQ1AsU0FBUyxFQUFFLENBQUM7WUFDWixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFPLE9BQU8sRUFBRSxFQUFFOztJQUNyQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvQyxTQUFTLElBQUksQ0FBQyxRQUFnQixFQUFFLFFBQWdCO1FBQzlDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxlQUFlLENBQUMsR0FBRyxRQUFRLEVBQUU7WUFDMUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsQ0FBQztJQUM3QixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUM7SUFDckIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQztJQUNwQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQztJQUN2QixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxNQUFNLFFBQVEsU0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsMENBQUUsRUFBRSxDQUFDO0lBQ3RELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDMUQsTUFBTSxVQUFVLFNBQUcsT0FBTyxDQUFDLEtBQUssMENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7SUFDcEYsTUFBTSxPQUFPLFNBQUcsT0FBTyxDQUFDLEtBQUssMENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO0lBQ2hGLE1BQU0sRUFBRSxHQUFHLDBCQUEwQixDQUFDO0lBQ3RDLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDbEQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDN0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2xCO1NBQ0Y7S0FDRjtJQUNELFNBQVMsSUFBSSxDQUFDLElBQVksRUFBRSxXQUFtQjtRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDdEMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUM7YUFDMUIsUUFBUSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDbkQsU0FBUyxNQUFNLENBQUMsSUFBWSxFQUFFLEVBQVUsRUFBRSxJQUFZO1FBQ3BELElBQUksSUFBSSxHQUFHLFVBQVUsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUFFO1lBQ3hDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLFNBQVMsQ0FBQyxDQUFDO1lBQ3BELEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxJQUFZLEVBQUUsUUFBZTtRQUM5QyxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDdEMsUUFBUSxDQUFDLGdDQUFnQyxDQUFDO2FBQzFDLGNBQWMsQ0FBQyxrQkFBa0IsUUFBUSxFQUFFLENBQUM7YUFDNUMsUUFBUSxDQUFDLHlCQUF5QixFQUFFLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQztRQUM5RCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUc7UUFBRSxPQUFPO0lBRS9CLEVBQUUsQ0FBQyxJQUFJLENBQ0wsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsV0FBVyxFQUMvQixTQUFTLE9BQU8sQ0FBQyxPQUFPLFFBQVEsQ0FDakMsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1NBQ3pDLFFBQVEsQ0FBQyxTQUFTLENBQUM7U0FDbkIsUUFBUSxDQUFDLFVBQVUsQ0FBQztTQUNwQixjQUFjLENBQUMscUNBQXFDLENBQUM7U0FDckQsUUFBUSxDQUFDLFFBQVEsRUFBRSxxQ0FBcUMsRUFBRSxJQUFJLENBQUM7U0FDL0QsUUFBUSxDQUFDLFNBQVMsRUFBRSxvQ0FBb0MsRUFBRSxJQUFJLENBQUM7U0FDL0QsYUFBYSxFQUFFO1NBQ2YsUUFBUSxDQUFDLE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxJQUFJLENBQUM7U0FDckUsUUFBUSxDQUFDLFNBQVMsRUFBRSwwQkFBMEIsRUFBRSxJQUFJLENBQUM7U0FDckQsYUFBYSxFQUFFO1NBQ2YsUUFBUSxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUM7U0FDOUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRCxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7U0FDekMsUUFBUSxDQUFDLFNBQVMsQ0FBQztTQUNuQixRQUFRLENBQUMsd0JBQXdCLENBQUM7U0FDbEMsY0FBYyxDQUFDLHFDQUFxQyxDQUFDO1NBQ3JELFFBQVEsQ0FBQywyQkFBMkIsRUFBRSx5Q0FBeUMsRUFBRSxJQUFJLENBQUM7U0FDdEYsUUFBUSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7U0FDekMsUUFBUSxDQUFDLFlBQVksRUFBRSwwQkFBMEIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RCxNQUFNLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7U0FDeEMsUUFBUSxDQUFDLFNBQVMsQ0FBQztTQUNuQixRQUFRLENBQUMsY0FBYyxDQUFDO1NBQ3hCLGNBQWMsQ0FBQyxxQ0FBcUMsQ0FBQztTQUNyRCxRQUFRLENBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksQ0FBQztTQUM3QyxRQUFRLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQztTQUM3QyxRQUFRLENBQUMsU0FBUyxFQUFFLDRDQUE0QyxDQUFDO1NBQ2pFLFFBQVEsQ0FBQyxVQUFVLEVBQUUsc0NBQXNDLENBQUM7U0FDNUQsUUFBUSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQztTQUNwQyxRQUFRLENBQUMsUUFBUSxFQUFFLGlCQUFpQixDQUFDO1NBQ3JDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsNkJBQTZCLENBQUM7U0FDcEQsUUFBUSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1NBQy9DLFFBQVEsQ0FBQyxTQUFTLENBQUM7U0FDbkIsUUFBUSxDQUFDLGVBQWUsQ0FBQztTQUN6QixjQUFjLENBQUMscUNBQXFDLENBQUM7U0FDckQsUUFBUSxDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7U0FDMUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUM7U0FDekMsUUFBUSxDQUFDLFNBQVMsRUFBRSwyQ0FBMkMsRUFBRSxJQUFJLENBQUM7U0FDdEUsUUFBUSxDQUFDLE9BQU8sRUFBRSxxREFBcUQsRUFBRSxJQUFJLENBQUM7U0FDOUUsUUFBUSxDQUFDLFFBQVEsRUFBRSw0QkFBNEIsRUFBRSxJQUFJLENBQUM7U0FDdEQsUUFBUSxDQUFDLFVBQVUsRUFBRSw4QkFBOEIsRUFBRSxJQUFJLENBQUM7U0FDMUQsUUFBUSxDQUFDLFNBQVMsRUFBRSxvREFBb0QsRUFBRSxJQUFJLENBQUM7U0FDL0UsYUFBYSxFQUFFO1NBQ2YsUUFBUSxDQUFDLFlBQVksRUFBRSxtQ0FBbUMsRUFBRSxJQUFJLENBQUM7U0FDakUsUUFBUSxDQUFDLFdBQVcsRUFBRSw0QkFBNEIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7U0FDdEMsUUFBUSxDQUFDLFNBQVMsQ0FBQztTQUNuQixRQUFRLENBQUMsYUFBYSxDQUFDO1NBQ3ZCLGNBQWMsQ0FBQyxxQ0FBcUMsQ0FBQztTQUNyRCxRQUFRLENBQUMsV0FBVyxFQUFFLDRCQUE0QixFQUFFLElBQUksQ0FBQztTQUN6RCxRQUFRLENBQUMsV0FBVyxFQUFFLDJDQUEyQyxFQUFFLElBQUksQ0FBQztTQUN4RSxRQUFRLENBQUMsZUFBZSxFQUFFLGtEQUFrRCxFQUFFLElBQUksQ0FBQztTQUNuRixRQUFRLENBQUMsY0FBYyxFQUFFLG9DQUFvQyxFQUFFLElBQUksQ0FBQztTQUNwRSxRQUFRLENBQUMsZUFBZSxFQUFFLHdDQUF3QyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdFLE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtTQUN6QyxRQUFRLENBQUMsNkJBQTZCLENBQUM7U0FDdkMsY0FBYyxDQUFDLDJMQUEyTCxDQUFDO1NBQzNNLFFBQVEsQ0FBQyxTQUFTLEVBQUUsc0NBQXNDLEVBQUUsSUFBSSxDQUFDO1NBQ2pFLGFBQWEsRUFBRTtTQUNmLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxxRkFBcUYsQ0FBQztTQUNqSCxRQUFRLENBQUMsYUFBYSxFQUFFLDJDQUEyQyxDQUFDLENBQUM7SUFDeEUsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQUUsT0FBTztJQUVsRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sT0FBTyxTQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsMENBQUUsV0FBVyxFQUFFLENBQUM7SUFFNUMsUUFBUSxPQUFPLEVBQUU7UUFDZixLQUFLLFNBQVM7WUFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztnQkFDaEUsT0FBTzthQUNSO1lBRUQsTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsZUFBZSxDQUFDO1lBRTFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDekMsT0FBTzthQUNSO1lBRUQsUUFBUSxPQUFPLEVBQUU7Z0JBQ2YsS0FBSyxJQUFJO29CQUNQLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTt3QkFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDNUIsT0FBTztxQkFDUjtvQkFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNuQyxNQUFNO2dCQUNSLEtBQUssS0FBSztvQkFDUixJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUU7d0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQzdCLE9BQU87cUJBQ1I7b0JBQ0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDcEMsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxVQUFVO1lBQ2IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsOENBQThDLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDaEYsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDckMsUUFBUSxDQUFDLE1BQU0sQ0FBQztpQkFDaEIsUUFBUSxDQUFDLFNBQVMsQ0FBQztpQkFDbkIsWUFBWSxDQUFDLDZGQUE2RixDQUFDO2lCQUMzRyxjQUFjLENBQUMsMEJBQTBCLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLENBQUM7aUJBQzlELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUM7aUJBQ2pFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxtQ0FBbUMsRUFBRSxJQUFJLENBQUM7aUJBQzNFLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUM7aUJBQzdELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLENBQUM7aUJBQy9ELFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixJQUFJO2dCQUNGLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7YUFDckQ7WUFDRCxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQXVDLEVBQUUsSUFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDeEwsT0FBTyxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztpQkFDdkUsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2xCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbkMsUUFBUSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDM0IsS0FBSyxJQUFJO3dCQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUNoQyxNQUFNO29CQUNSLEtBQUssSUFBSTt3QkFDUCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3dCQUN6QyxNQUFNO29CQUNSLEtBQUssSUFBSTt3QkFDUCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDbkMsTUFBTTtvQkFDUixLQUFLLElBQUk7d0JBQ1AsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7d0JBQ25DLE1BQU07b0JBQ1IsS0FBSyxJQUFJO3dCQUNQLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUNsQyxNQUFNO29CQUNSLEtBQUssSUFBSTt3QkFDUCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDbkMsTUFBTTtvQkFDUjt3QkFDRSxNQUFNO2lCQUNUO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1lBQ0wsTUFBTTtRQUNSLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxNQUFNO1FBQ1IsS0FBSyxRQUFRO1lBQ1gsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEMsTUFBTTtRQUNSLEtBQUssUUFBUTtZQUNYLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ25DLE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3pDLE1BQU07UUFDUixLQUFLLFVBQVU7WUFDYixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osTUFBTSxxQkFBcUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBd0IsQ0FBQztZQUNsRyxNQUFNLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQzVDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxlQUFlLENBQUM7aUJBQ25ELGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3pDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3BELE1BQU07UUFDUixLQUFLLFlBQVk7WUFDZixNQUFNLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUF3QixDQUFDO1lBQ25HLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUM3QyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsZUFBZSxDQUFDO2lCQUNuRCxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUMxQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3BELE1BQU07UUFDUixLQUFLLElBQUk7WUFDUCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztnQkFDOUQsT0FBTzthQUNSO1lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUNwQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsY0FBYyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsV0FBVyxDQUFDO2lCQUNuRixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztnQkFDcEUsT0FBTzthQUNSO1lBQ0QsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0MsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN0QixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUF3QixDQUFDO1lBQzNGLE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDckMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLGVBQWUsQ0FBQztpQkFDbkQsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztZQUNwRCxNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osTUFBTSxZQUFZLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUN6QyxRQUFRLENBQUMsMkJBQTJCLENBQUM7aUJBQ3JDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsdUtBQXVLLENBQUMsQ0FBQztZQUN0TSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxNQUFNO1FBQ1IsS0FBSyxVQUFVO1lBQ2IsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUF3QixDQUFDO1lBQzNGLE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDckMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLGFBQWEsQ0FBQztpQkFDakQsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUNsRCxNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNsRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7Z0JBQ2hFLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPO2FBQ1I7WUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ3JDLFFBQVEsQ0FBQyxtQkFBbUIsUUFBUSxFQUFFLENBQUM7aUJBQ3ZDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsZ0NBQWdDLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDN0YsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsWUFBWSxJQUFJLENBQUMsQ0FBQztZQUMvRCxNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztnQkFDbkUsT0FBTzthQUNSO1lBQ0QsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRCxJQUFJLEdBQUcsR0FBRyxXQUFXLE1BQU0sRUFBRSxDQUFDO1lBQzlCLElBQUksTUFBTSxHQUFHLEVBQUUsRUFBRTtnQkFDZixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxHQUFHLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLDBDQUEwQyxNQUFNLEVBQUUsQ0FBQztnQkFDckYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLHVHQUF1RyxDQUFDLENBQUM7YUFDaEo7aUJBQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDN0MsR0FBRyxHQUFHLEtBQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLHlDQUF5QyxNQUFNLEVBQUUsQ0FBQztnQkFDcEYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLDhFQUE4RSxDQUFDLENBQUM7YUFDdkg7aUJBQU07Z0JBQ0wsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RCxHQUFHLEdBQUcsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsb0NBQW9DLE1BQU0sR0FBRyxFQUFFLEVBQUUsQ0FBQztnQkFDcEYsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGlFQUFpRSxDQUFDLENBQUM7YUFDMUc7WUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyxDQUFDLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3JCLE1BQU07UUFDUixLQUFLLFlBQVk7WUFDZixNQUFNLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQzVDLFFBQVEsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUM7aUJBQ3JDLGNBQWMsQ0FBQyxjQUFjLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUM7aUJBQ3JELFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNqRCxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsVUFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDO2lCQUNoRCxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDO2lCQUNwQyxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RDLE1BQU07UUFDUixLQUFLLGFBQWE7WUFDaEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLENBQUM7WUFDbkUsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7Z0JBQzdFLE9BQU87YUFDUjtZQUNELFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNwQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEQsSUFBSSxPQUFPLEdBQUcsR0FBRyxJQUFJLE9BQU8sR0FBRyxHQUFHLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxxRkFBcUYsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO2FBQ25JO2lCQUFNLElBQUksT0FBTyxHQUFHLEdBQUcsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFO2dCQUN4QyxJQUFJLENBQUMscUZBQXFGLEVBQUUsK0RBQStELENBQUMsQ0FBQzthQUM5SjtpQkFBTSxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLHFGQUFxRixFQUFFLDZCQUE2QixDQUFDLENBQUM7YUFDNUg7aUJBQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxxRkFBcUYsRUFBRSw2RUFBNkUsQ0FBQyxDQUFDO2FBQzVLO2lCQUFNLElBQUksT0FBTyxHQUFHLEVBQUUsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMscUZBQXFGLEVBQUUsa0NBQWtDLENBQUMsQ0FBQzthQUNqSTtpQkFBTSxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRTtnQkFDdkMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxxRkFBcUYsRUFBRSw2RkFBNkYsQ0FBQyxDQUFDO2FBQzVMO2lCQUFNLElBQUksT0FBTyxHQUFHLEVBQUUsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFO2dCQUN2QyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLHFGQUFxRixFQUFFLDhEQUE4RCxDQUFDLENBQUM7YUFDN0o7aUJBQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxxRkFBcUYsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUMxRztpQkFBTSxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxDQUFDLHFGQUFxRixFQUFFLHdCQUF3QixDQUFDLENBQUM7YUFDdkg7aUJBQU0sSUFBSSxPQUFPLEdBQUcsRUFBRSxJQUFJLE9BQU8sR0FBRyxFQUFFLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxzRkFBc0YsRUFBRSx5REFBeUQsQ0FBQyxDQUFDO2FBQ3pKO2lCQUFNLElBQUksT0FBTyxHQUFHLEVBQUUsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsc0ZBQXNGLEVBQUUsbURBQW1ELENBQUMsQ0FBQzthQUNuSjtpQkFBTSxJQUFJLE9BQU8sR0FBRyxFQUFFLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLHNGQUFzRixFQUFFLHNEQUFzRCxDQUFDLENBQUM7YUFDdEo7WUFDRCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QyxDQUFDLEVBQUUsVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3RCLE1BQU07UUFDUixLQUFLLG1CQUFtQjtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztnQkFDaEUsT0FBTzthQUNSO1lBQ0QsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ25ELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPO2FBQ1I7WUFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLG1CQUFtQixFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUMzRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRyxNQUFNO1FBQ1IsS0FBSyxnQkFBZ0I7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNsRCxPQUFPLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUM7Z0JBQ2hFLE9BQU87YUFDUjtZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pHLE1BQU07UUFDUixLQUFLLG1CQUFtQjtZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztnQkFDaEUsT0FBTzthQUNSO1lBQ0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDbEUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkcsTUFBTTtRQUNSLEtBQUssU0FBUztZQUNaLE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDekMsUUFBUSxDQUFDLEVBQUUsQ0FBQztpQkFDWixTQUFTLENBQUMsaUNBQWlDLEVBQUUsa0dBQWtHLENBQUM7aUJBQ2hKLFFBQVEsQ0FBQyxlQUFlLENBQUM7aUJBQ3pCLGNBQWMsQ0FBQyxZQUFZLENBQUM7aUJBQzVCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUNsRCxZQUFZLENBQUMsNkZBQTZGLENBQUMsQ0FBQztZQUMvRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNuQyxNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsTUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxpRkFBaUYsQ0FBQyxDQUFDO1lBQzdKLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDakQsT0FBTyxDQUFDLEtBQUssQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO2dCQUN0RSxPQUFPO2FBQ1I7WUFDRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQzlELE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QixPQUFPO2FBQ1I7WUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTTtnQkFBRSxNQUFNLEdBQUcsb0JBQW9CLENBQUM7WUFDM0MsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDdEIsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsT0FBTyxDQUFDLE1BQU0saUNBQWlDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLHVCQUF1QixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsYUFBYSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQ2hHLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsTUFBTSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO1lBQzNKLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO2dCQUNyRSxPQUFPO2FBQ1I7WUFFRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztnQkFDOUQsT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JCLE9BQU87YUFDUjtZQUNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxPQUFPO2dCQUFFLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO2lCQUN2QixLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxPQUFPLENBQUMsTUFBTSxnQ0FBZ0MsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25HLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsdUJBQXVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxhQUFhLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDbEcsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzVELE1BQU07UUFDUixLQUFLLE9BQU87WUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztnQkFDaEUsT0FBTzthQUNSO1lBQ0QsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsR0FBRyxDQUFDLElBQUksV0FBVyxHQUFHLEdBQUcsRUFBRTtnQkFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxnRkFBZ0YsQ0FBQyxDQUFDO2dCQUNoRyxPQUFPO2FBQ1I7WUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDNUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO2lCQUNoQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwRixNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNyRCxRQUFRLE9BQU8sRUFBRTtnQkFDZixLQUFLLENBQUM7b0JBQ0osU0FBUyxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN0QyxNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixTQUFTLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUMzQixNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixTQUFTLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNoQyxNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM3QixNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUM5QixNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixTQUFTLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3hDLE1BQU07Z0JBQ1IsS0FBSyxDQUFDO29CQUNKLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDL0MsTUFBTTtnQkFDUixLQUFLLENBQUM7b0JBQ0osU0FBUyxDQUFDLDRCQUE0QixFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNsRCxNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixTQUFTLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNuQyxNQUFNO2dCQUNSLEtBQUssRUFBRTtvQkFDTCxTQUFTLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1IsS0FBSyxFQUFFO29CQUNMLFNBQVMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1IsS0FBSyxFQUFFO29CQUNMLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3pCLE1BQU07Z0JBQ1IsS0FBSyxFQUFFO29CQUNMLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7b0JBQ3pCLE1BQU07Z0JBQ1IsS0FBSyxFQUFFO29CQUNMLFNBQVMsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDeEMsTUFBTTtnQkFDUjtvQkFDRSxNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxPQUFPO1lBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzlDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNoQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUNsQztZQUNELE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM1QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUMvQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEseUJBQXlCLENBQUM7aUJBQzdELGNBQWMsQ0FBQyxjQUFjLFFBQVEsSUFBSSxDQUFDO2lCQUMxQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxhQUFhLFFBQVEsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDekMsTUFBTTtRQUNSLEtBQUssUUFBUTtZQUNYLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7aUJBQ2hELFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSx5QkFBeUIsQ0FBQztpQkFDN0QsY0FBYyxDQUFDLGNBQWMsUUFBUSxJQUFJLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLGFBQWEsUUFBUSxDQUFDLENBQUM7WUFDL0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUMxQyxNQUFNO1FBQ1IsS0FBSyxjQUFjO1lBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDbEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPO2FBQ1I7WUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU07UUFDUixLQUFLLFdBQVc7WUFDZCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLGdCQUFnQixDQUFDLE1BQU0sNEJBQTRCLENBQUMsQ0FBQztZQUN6RixNQUFNO1FBQ1IsS0FBSyxLQUFLO1lBQ1IsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRixRQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUN6QixLQUFLLG9CQUFvQjtvQkFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQztvQkFFdkUsTUFBTTtnQkFDUixLQUFLLG9CQUFvQjtvQkFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQztvQkFFdkUsTUFBTTtnQkFDUjtvQkFDRSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO29CQUNuRSxNQUFNO2FBQ1Q7WUFDRCxNQUFNO1FBQ1IsS0FBSyxhQUFhO1lBQ2hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixVQUFVLGdCQUFnQixDQUFDLENBQUM7WUFDcEUsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDbEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPO2FBQ1I7WUFDRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztnQkFDOUQsT0FBTzthQUNSO1lBQ0QsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Z0JBQ2hELE9BQU87YUFDUjtZQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUMxQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hDLE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEVBQUU7Z0JBQ2xELE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztnQkFDaEUsT0FBTzthQUNSO1lBQ0QsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7Z0JBQzlELE9BQU87YUFDUjtZQUNELElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDMUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUNoRCxPQUFPO2FBQ1I7WUFDRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUNqRDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQzVDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxRQUFRLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsTUFBTTtRQUNSLEtBQUssT0FBTztZQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDbEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO2dCQUNoRSxPQUFPO2FBQ1I7WUFDRCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztnQkFDOUQsT0FBTzthQUNSO1lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVFLE1BQU07UUFDUixLQUFLLFNBQVM7WUFDWixRQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO2dCQUN6QixLQUFLLG9CQUFvQjtvQkFDdkIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDMUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO29CQUN0QixNQUFNO2dCQUNSLEtBQUssb0JBQW9CO29CQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUMxQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7b0JBQ3RCLE1BQU07Z0JBQ1I7b0JBQ0UsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQztvQkFDbkUsTUFBTTthQUNUO1lBQ0QsTUFBTTtRQUNSO1lBQ0UsTUFBTTtRQUNSLEtBQUssTUFBTTtZQUNULElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUN2QyxPQUFPLENBQUMsS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7Z0JBQ3BFLE9BQU87YUFDUjtZQUNELE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdEIsTUFBTTtRQUNSLEtBQUssU0FBUztZQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQywyRkFBMkYsQ0FBQyxDQUFDO2dCQUNsSCxPQUFPO2FBQ1I7WUFDRCxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUNyQixPQUFPLENBQUMsS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7b0JBQzlELE9BQU87aUJBQ1I7Z0JBQ0QsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsZ0JBQWdCLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuRjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6RDtZQUNELE1BQU07UUFDUixLQUFLLEtBQUs7WUFDUixNQUFNLE1BQU0sR0FBRyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQztZQUN0RSxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQzlFLE1BQU0sSUFBSSxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hFLE1BQU0sSUFBSSxHQUFHLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hFLE1BQU0sU0FBUyxHQUFHLGdCQUFnQixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDL0UsTUFBTSxNQUFNLEdBQUcsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdEUsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNCO2lCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzdCO2lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCO2lCQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5QixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2lCQUNyQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7aUJBQzFCLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDJGQUEyRixDQUFDLENBQUM7Z0JBQ2xILE9BQU87YUFDUjtZQUNELElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRCxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNmLEtBQUssUUFBUTt3QkFDWCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBQ3RDLE1BQU07b0JBQ1IsS0FBSyxVQUFVO3dCQUNiLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQzt3QkFDeEMsTUFBTTtvQkFDUixLQUFLLE1BQU07d0JBQ1QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNwQyxNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7d0JBQ3BDLE1BQU07b0JBQ1IsS0FBSyxXQUFXO3dCQUNkLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDekMsTUFBTTtvQkFDUixLQUFLLFFBQVE7d0JBQ1gsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNO29CQUNSO3dCQUNFLE1BQU07aUJBQ1Q7Z0JBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsTUFBTTtRQUNSLEtBQUssUUFBUTtZQUNYLE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtpQkFDbkMsUUFBUSxDQUFDLFlBQVksQ0FBQztpQkFDdEIsY0FBYyxDQUFDLDBCQUEwQixRQUFRLGtDQUFrQyxVQUFVLDhCQUE4QixNQUFNLDhCQUE4QixNQUFNLG1DQUFtQyxXQUFXLGdDQUFnQyxRQUFRLElBQUksQ0FBQyxDQUFDO1lBQ3BRLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLE1BQU07S0FDVDtBQUNILENBQUMsQ0FBQSxDQUFDLENBQUM7QUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMifQ==
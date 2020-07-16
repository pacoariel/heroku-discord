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
const prefix = "+";
const logChannel = client.channels.find("id", "726526090813898854");
const code = Math.floor(Math.random() * 1000);
let dt = new Date();
let utcDate = dt.toUTCString();
let peopleinGiveaway = [];
let cooldown = new Set();
let cdseconds = 18000;
let cooldown1 = new Set();
let cdseconds1 = 86400;
let cooldown2 = new Set();
let cdseconds2 = 30;
function emoji(id) {
    var _a;
    return (_a = client.emojis.get(id)) === null || _a === void 0 ? void 0 : _a.toString();
}
client.on("ready", () => {
    client.user.setActivity("+help for help", { type: "WATCHING" });
    let allUsers = client.users.array();
    let serverOn = client.guilds.array();
    for (let i = 0; i < allUsers.length; i++) {
        if (util_1.isNull(db.get(allUsers[i].id))) {
            db.set(allUsers[i].id, { money: 50, warns: 0, messages: [] });
        }
        db.set(client.user.id, { entered: [] });
    }
    for (let i = 0; i < serverOn.length; i++) {
        if (util_1.isNull(db.get(serverOn[i].id))) {
            db.set(serverOn[i].id, { automodon: 0, welcomeChannelId: ``, welcomeMessage: `` });
        }
    }
    console.log(chalk.keyword('green')('Ready to go!'));
    console.log(chalk.keyword('magenta') `The secret code is ${code}`);
});
client.on("guildMemberAdd", member => {
    let welcomeChannel = db.get(`${member.guild}.welcomeChannelId`);
    welcomeChannel.send(`${member} ${db.get(`${member.guild.id}.welcomeMessage`)}`);
    if (util_1.isNull(db.get(member.id))) {
        db.set(member.id, { money: 50, warns: 0, messages: [] });
    }
});
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    let allMembers = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.members.filter(member => !member.user.bot).size;
    let allBots = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.members.filter(member => member.user.bot).size;
    let forAtomod = message.content.split(" ");
    if (message.author.bot)
        return;
    db.push(`${message.author.id}.messages`, "```" + `${message.content}` + "```");
    let playersMoney = db.get(`${message.author.id}.money`);
    if (message.content.indexOf(prefix) !== 0)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = (_c = args.shift()) === null || _c === void 0 ? void 0 : _c.toLowerCase();
    switch (command) {
        case `help`:
            let hepEmbed = new Discord.RichEmbed()
                .setTitle(`Help`)
                .setColor(`#ff6699`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/725324556696420402/725992377575145523/Cakey_logo.png`)
                .setDescription(`All types of Help embeds`)
                .addField("\`help-n\`", "aka Normal HelpEmbed", true)
                .addField("\`help-m\`", "aka Moderator HelpEmbed", true)
                .addField("\`help-r\`", "aka Bugrepot/Suggestion HelpEmbed", true)
                .addField("\`help-fun\`", "aka fun HelpEmbed", true)
                .addField("\`help-e\`", "aka economy HelpEmbed", true)
                .addField("\`help-g\`", "***Giveaways!!***", true);
            message.channel.send(hepEmbed);
            break;
        case `help-g`:
            let giveawayHelp = new Discord.RichEmbed()
                .setTitle(`***Global Cakey Giveaway***`)
                .setDescription("**Current Giveaway:** \n ```html\n<Price: One custom command>\n</Consdition: needs to be sfw and no advertising>```\n the giveaway will end as soon as we have like...idk maybe 20 people")
                .addField("`enter`", "This makes you enter the giveaway :D", true)
                .addBlankField()
                .addField("`participants`", "outputs all people that entered **(Adminstartor command + will ping people be carefull!)**")
                .addField("`g-p-count`", "outputs the amount of people in giveaway!");
            message.channel.send(giveawayHelp);
            break;
        case `help-n`:
            let helpembed = new Discord.RichEmbed()
                .setColor("#66ffff")
                .setTitle("Normal Help")
                .setDescription("Command and under it is description")
                .addField("`botinfo`", "Outputs info about the bot", true)
                .addField("`invite`", "Outputs the bot invite", true)
                .addField("`support`", "Outputs the support server invite", true)
                .addField("`website`", "Outputs the support website link", true)
                .addField("`membercount`", "Outputs the amount of human people on the server", true)
                .addField("`serverinfo`", "Outputs some info about the server", true)
                .addField("`servercount`", "Outputs on how many servers the bot is", true);
            message.channel.send(helpembed);
            break;
        case `help-e`:
            let economyHelp = new Discord.RichEmbed()
                .setColor("#66ffff")
                .setTitle("Economy Help")
                .setDescription("Command and under it is description")
                .addField("`bal`", "Outputs your money", true)
                .addField("`work`", "Adds money to you", true)
                .addField("`daily`", "gives you 2000(can be used every 24 hours)");
            message.channel.send(economyHelp);
            break;
        case `help-r`:
            let helpBugembed = new Discord.RichEmbed()
                .setColor("#993366")
                .setTitle("Report/Suggestion Help")
                .setDescription("Command and under it is description")
                .addField("`suggest` or `suggestion`", `+suggestion + description of suggestion`, true)
                .addField("`bug`", `+bug + the bug`, true)
                .addField("`question`", `+question + the question`, true);
            message.channel.send(helpBugembed);
            break;
        case `help-m`:
            let helpModeratorembed = new Discord.RichEmbed()
                .setColor("#993366")
                .setTitle("Modertor Help")
                .setDescription("Command and under it is description")
                .addField("`kick`", `@member Reason`, true)
                .addField("`ban`", `@member Reason`, true)
                .addField("`purge`", `deletes up to 100 messages in the channel`, true)
                .addField("`log`", `@member / gives you all messages a person ever send`, true)
                .addField("`warn`", `@member / warns the person`, true)
                .addField("`unwarn`", `@member / unwarns the person`, true)
                .addField("`warns`", `@member / gives you amount of warns the person has`, true)
                .addBlankField()
                .addField("`setwelcomechannel`", `sets the welome channel id: needs the id as argument`, true)
                .addField("`setwelcomemessage`", `sets the welome message`, true);
            message.channel.send(helpModeratorembed);
            break;
        case `help-fun`:
            let helpFunembed = new Discord.RichEmbed()
                .setColor("#993366")
                .setTitle("Fun Help")
                .setDescription("Command and under it is description")
                .addField("`cake`", "Outputs a cake. Yes exactly a cake.", true)
                .addField("`8ball`", "Outputs an answer to your question", true)
                .addBlankField()
                .addField("`say`", "Outputs whatever you say after the command", true)
                .addField("`think`", "Outputs what you thought", true);
            message.channel.send(helpFunembed);
            break;
        case `suggest`:
            let str2 = message.content;
            let suggestionDescription = str2.slice(8);
            let suggestionChannel = client.channels.find(`id`, `727965361093345421`);
            let suggestionEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s suggestion`)
                .setDescription(suggestionDescription);
            suggestionChannel.send(suggestionEmbed);
            message.channel.send(`sucessfully send suggestion`);
            break;
        case `suggestion`:
            let str4 = message.content;
            let suggestion1Description = str4.slice(11);
            let suggestion1Channel = client.channels.find(`id`, `727965361093345421`);
            let suggestion1Embed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s suggestion`)
                .setDescription(suggestion1Description);
            suggestion1Channel.send(suggestion1Embed);
            message.channel.send(`sucessfully send suggestion`);
            break;
        case `daily`:
            if (cooldown1.has(message.author.id)) {
                return message.reply("You need to wait 24 hours before using this again ");
            }
            cooldown1.add(message.author.id);
            message.reply(`You got 2000$`);
            db.add(`${message.author.id}.money`, 2000);
            setTimeout(() => {
                cooldown1.delete(message.author.id);
            }, cdseconds1 * 1000);
            break;
        case `bug`:
            let str3 = message.content;
            let bugDescription = str3.slice(4);
            let bugChannel = client.channels.find(`id`, `727965322329718837`);
            let bugEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s bug report`)
                .setDescription(bugDescription);
            bugChannel.send(bugEmbed);
            message.channel.send(`sucessfully send bug report`);
            break;
        case `question`:
            let str5 = message.content;
            let askDescription = str5.slice(9);
            let askChannel = client.channels.find(`id`, `727965394169757707`);
            let askEmbed = new Discord.RichEmbed()
                .setTitle(`${message.author.username}'s question`)
                .setDescription(askDescription);
            askChannel.send(askEmbed);
            message.channel.send(`sucessfully send question`);
            break;
        case `invite`:
            message.channel.send(`This is an invite to add this bot to a server. Feel free to do so. 🙂\n https://discord.com/api/oauth2/authorize?client_id=725635490694561802&permissions=8&scope=bot`);
            break;
        case `log`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member2 = message.mentions.members.first().id;
            if (!member2)
                return message.reply("Please mention a valid member of this server");
            let logEmbed = new Discord.RichEmbed()
                .setTitle(`All messages of ${member2}`)
                .setDescription(`${db.get(`${member2}.messages`)}`);
            console.log(`${member2}`);
            message.channel.send(logEmbed);
            break;
        case `think`:
            let thought = message.content.slice(7);
            message.channel.send(`**${message.author.username}** is trying to think about *${thought}*`);
            message.delete();
            break;
        case `support`:
            message.channel.send(`This is an invite to the Support server. If you have any questions feel free to join and ask. 🙂\n https://discord.gg/E9EanAg`);
            break;
        case `bal`:
            message.channel.send(`You currently have **${playersMoney}**`);
            break;
        case `say`:
            console.log(`${message.author.username}`);
            message.delete();
            message.channel.send(message.content.slice(5));
            break;
        case `work`:
            if (cooldown.has(message.author.id)) {
                return message.reply("You need to wait 5 hours before using this again ");
            }
            cooldown.add(message.author.id);
            let workEmbed = new Discord.RichEmbed();
            let random = Math.floor(Math.random() * 24) + 1;
            let msg = `You got ${random}`;
            if (random > 17) {
                db.add(`${message.author.id}.money`, random);
                msg = `**${message.author.username}**, You made a **yummy** cake. You got ${random}`;
                workEmbed.setTitle(`${msg}`).setImage(`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo4gUCdnQ4JQGW8FcpLyjmVw4AJJ0uE_rjxg&usqp=CAU`);
            }
            else if (random > 5) {
                db.add(`${message.author.id}.money`, random);
                msg = `**${message.author.username}**, You made a **ugly** cake. You got ${random}`;
                workEmbed.setTitle(`${msg}`).setImage(`https://i.pinimg.com/originals/29/fd/e2/29fde238bbe604cb04388d4b56b9afb1.jpg`);
            }
            else {
                db.subtract(`${message.author.id}.money`, random * 15);
                msg = `**${message.author.username}**, Your cake killed a peron pay ${random * 15}`;
                workEmbed.setTitle(`${msg}`).setImage(`https://tenor.com/view/dead-dying-dog-shocked-cake-gif-16453337`);
            }
            message.channel.send(workEmbed);
            setTimeout(() => {
                cooldown.delete(message.author.id);
            }, cdseconds * 1000);
            break;
        case `website`:
            message.channel.send(`This is our cool website :D https://hahota.fun/website/cake/`);
            break;
        case `serverinfo`:
            let serverinfoEmbed = new Discord.RichEmbed()
                .setTitle(`__${message.guild.name}__`)
                .setDescription(`Owner is **${message.guild.owner}**`)
                .addField(`Human members`, `${allMembers}`, true)
                .addField(`Bots`, `${allBots}`, true)
                .addField(`Complete`, `${message.guild.memberCount}`);
            message.channel.send(serverinfoEmbed);
            break;
        case `servercount`:
            message.channel.send(`I am on **${client.guilds.size}** Servers!`);
            break;
        case `cake`:
            if (cooldown2.has(message.author.id)) {
                return message.reply("You need to wait 30 seconds before using this command again");
            }
            cooldown2.add(message.author.id);
            function cake(link, description) {
                let cakeEmbed = new Discord.RichEmbed()
                    .setTitle(`${description}`)
                    .setImage(`${link}`);
                message.channel.send(cakeEmbed);
            }
            let random2 = Math.floor(Math.random() * 109) + 1;
            if (110 > random2 && random2 > 100) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974848155877378/5.jpeg", "Oreo with a big pile of fruits....");
            }
            else if (100 > random2 && random2 > 90) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974842900545587/1.jpeg", "Rainbows.... Wait what **no** rainbows don't have white!??!?!");
            }
            else if (90 > random2 && random2 > 80) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974844041265172/2.jpeg", "Choclate hearts.... Lovely.");
            }
            else if (80 > random2 && random2 > 70) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974845455007855/3.jpeg", "Not so smart now huh. Understood ? Cause of **SMART**ies?? Not funny? K 😭.");
            }
            else if (70 > random2 && random2 > 60) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974846528487557/4.jpeg", "Hmmm this looks veeeeeery yummy.");
            }
            else if (60 > random2 && random2 > 55) {
                db.add(`${message.author.id}.money`, 100);
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974849351385158/6.jpeg", "This is the rarest cake of the collection :-). You amazed? No? Ok you get the 100$ anyways.");
            }
            else if (55 > random2 && random2 > 50) {
                db.add(`${message.author.id}.money`, 75);
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974850530115666/7.jpeg", "This is also a rare cake though not the rarest. You get 75$.");
            }
            else if (50 > random2 && random2 > 40) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974852064968875/8.jpeg", "***Pig***");
            }
            else if (40 > random2 && random2 > 30) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974853474517073/9.jpeg", "Roses. Beautiful cake.");
            }
            else if (30 > random2 && random2 > 20) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727974854426624121/10.jpeg", "The Galaxy: infinite possibilities no end a real dream.");
            }
            else if (20 > random2 && random2 > 10) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727975007405211708/11.jpeg", "I'm not a Bunny !??!?!? WHAT DO YOU WANT FROM ME.");
            }
            else if (10 > random2 && random2 > 0) {
                cake("https://cdn.discordapp.com/attachments/727963617835614318/727975012945887312/12.jpeg", "Quadra Oreo with rainbow Stuff on it..... I like it!");
            }
            setTimeout(() => {
                cooldown2.delete(message.author.id);
            }, cdseconds2 * 1000);
            break;
        case `setwelcomechannel`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let split2 = message.content.split(" ");
            let newID = split2[1];
            db.set(`${message.guild.id}.welcomeChannelId`, `${newID}`);
            message.channel.send(`Changed welcomeChannel id to **${db.get(`${message.guild.id}.welcomeChannelId`)}**`);
            break;
        case `welcomeChannel`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            message.channel.send(`Current welcome channel is **${db.get(`${message.guild.id}.welcomeChannelId`)}**`);
            break;
        case `setwelcomemessage`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let split3 = message.content.slice(18);
            db.set(`${message.guild.id}.welcomeMessage`, `${split3}`);
            message.channel.send(`Changed welcome message to **${db.get(`${message.guild.id}.welcomeMessage`)}**`);
            break;
        case `botinfo`:
            let botinfoEmbed = new Discord.RichEmbed()
                .setColor("")
                .setAuthor("Owner: CAKE BOI", "https://cdn.discordapp.com/attachments/725324556696420402/726000190095622214/Cake-Boi.jpeg")
                .setTitle("**Cakey Pro**")
                .setDescription("CAKEYS SON")
                .setThumbnail(`https://cdn.discordapp.com/attachments/725324556696420402/725992377575145523/Cakey_logo.png`)
                .setFooter("Creator: Pacific Range", "https://cdn.discordapp.com/attachments/725324556696420402/725999010619457586/PacificRangePFP.png");
            message.channel.send(botinfoEmbed);
            break;
        case `apply`:
            message.channel.send(`You got Mail 📬`);
            break;
        case `kick`:
            let noKick = new Discord.RichEmbed().setColor('#ff0000').setDescription("I cannot kick this user! Do they have a higher role? Do I have ban permissions?");
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.kickable)
                return message.reply(noKick);
            let reason = args.slice(1).join(' ');
            if (!reason)
                reason = "No reason provided";
            yield member.kick(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
            break;
        case `ban`:
            let noBan = new Discord.RichEmbed().setColor('#ff0000').setDescription("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member1 = message.mentions.members.first();
            if (!member1)
                return message.reply("Please mention a valid member of this server");
            if (!member1.bannable)
                return message.reply(noBan);
            let reason1 = args.slice(1).join(' ');
            if (!reason1)
                reason = "No reason provided";
            yield member1.ban(reason1)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
            message.reply(`${member1.user.tag} has been banned by ${message.author.tag} because: ${reason1}`);
            break;
        case `purge`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            const deleteCount = parseInt(args[0], 10);
            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
            const fetched = yield message.channel.fetchMessages({ limit: deleteCount });
            message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            break;
        case `8ball`:
            let question = message.content.slice(6);
            let random3 = Math.floor((Math.random() * 10) + 1);
            function eightball(text) {
                let eightBall = new Discord.RichEmbed()
                    .setTitle(`The magic ball has responded !`)
                    .setDescription(`Your question: ${question}`)
                    .addField(`The ball has responded:`, "```" + `${text}` + "```");
                message.channel.send(eightBall);
            }
            switch (random3) {
                case 1:
                    eightball(`umm idk maybe?`);
                    break;
                case 2:
                    eightball(`OFC`);
                    break;
                case 3:
                    eightball(`yea sure`);
                    break;
                case 4:
                    eightball(`never`);
                    break;
                case 5:
                    eightball(`no way`);
                    break;
                case 6:
                    eightball(`maybe, maybe not`);
                    break;
                case 7:
                    eightball(`That question is stupid`);
                    break;
                case 8:
                    eightball(`There is no answer to that`);
                    break;
                case 9:
                    eightball(`🤔 not sure`);
                    break;
                case 10:
                    eightball(`les not answer that.`);
                    break;
                case 11:
                    eightball(`Ya`);
                    break;
                case 12:
                    eightball(`✅`);
                    break;
                case 13:
                    eightball(`❌`);
                    break;
                case 14:
                    eightball(`not gonna answer`);
                    break;
            }
            break;
        case `enter`:
            if (!peopleinGiveaway.includes(message.author)) {
                message.channel.send(`entered`);
                peopleinGiveaway.push(message.author);
            }
            else {
                message.reply(`You already in!`);
            }
            break;
        case `participants`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            message.channel.send(peopleinGiveaway);
            break;
        case `g-p-count`:
            message.channel.send(`There are **${peopleinGiveaway.length}** people in the giveaway.`);
            break;
        case `end`:
            let Winner = peopleinGiveaway[Math.floor(Math.random() * peopleinGiveaway.length)];
            switch (message.author.id) {
                case `634724788761395201`:
                    message.channel.send(`The Winner issssssss ${Winner}!!!! \n Conrgats`);
                    break;
                case `691206573837647924`:
                    message.channel.send(`The Winner issssssss ${Winner}!!!! \n Conrgats`);
                    break;
                default:
                    message.channel.send("Only `Cake Boi` and `Pacific` can do this!");
                    break;
            }
            break;
        case `membercount`:
            message.channel.send(`This Server has ${allMembers} human members`);
            break;
        case `warn`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member3 = message.mentions.members.first();
            let member3id = message.mentions.members.first();
            if (!member3)
                return message.reply("Please mention a valid member of this server");
            if (member3.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, This person is an admin");
            message.channel.send(`Warned ${member3}`);
            db.add(`${member3id}.warns`, 1);
            message.member.send(`You were warned`);
            break;
        case `unwarn`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member4 = message.mentions.members.first();
            let member4id = message.mentions.members.first();
            if (!member4)
                return message.reply("Please mention a valid member of this server");
            if (member4.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, This person is an admin");
            if (db.get(`${member4id}.warns`) == 0) {
                message.channel.send(`This Person has 0 Warns`);
            }
            else {
                message.channel.send(`Unwarned ${member4}`);
                db.subtract(`${member4id}.warns`, 1);
                message.member.send(`You were unwarned`);
            }
            break;
        case `warns`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member5 = message.mentions.members.first();
            let member5id = message.mentions.members.first();
            if (!member5)
                return message.reply("Please mention a valid member of this server");
            message.channel.send(`${member5} has ${db.get(`${member5id}.warns`)} warns`);
            break;
        case `clear-g`:
            switch (message.author.id) {
                case `634724788761395201`:
                    message.channel.send(`Cleared Giveaway!`);
                    peopleinGiveaway = [];
                    break;
                case `691206573837647924`:
                    message.channel.send(`Cleared Giveaway!`);
                    peopleinGiveaway = [];
                    break;
                default:
                    message.channel.send("Only `Cake Boi` and `Pacific` can do this!");
                    break;
            }
            break;
    }
}));
client.login(process.env.token1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUE4QjtBQUM5QiwrQkFBOEI7QUFZOUIsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQTtBQUNsQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQXdCLENBQUE7QUFDMUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDN0MsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNwQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDL0IsSUFBSSxnQkFBZ0IsR0FBdUIsRUFBRSxDQUFDO0FBRzlDLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDekIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBRXRCLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBRXZCLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBRXBCLFNBQVMsS0FBSyxDQUFDLEVBQVU7O0lBQ3JCLGFBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLDBDQUFFLFFBQVEsR0FBRztBQUM3QyxDQUFDO0FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBRXBCLE1B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
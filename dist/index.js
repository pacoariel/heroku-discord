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
    welcomeChannel.send(`${member} ${db.get(`${member.guild}.welcomeMessage`)}`);
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
            db.set(`${message.guild}.welcomeChannelId`, `${newID}`);
            message.channel.send(`Changed welcomeChannel id to **${db.get(`${message.guild}.welcomeChannelId`)}**`);
            break;
        case `welcomeChannel`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            message.channel.send(`Current welcome channel is **${db.get(`${message.guild}.welcomeChannelId`)}**`);
            break;
        case `setwelcomemessage`:
            if (!message.member.hasPermission("ADMINISTRATOR"))
                return message.reply("Sorry, you don't have permissions to use this!");
            let split3 = message.content.slice(18);
            db.set(`${message.guild}.welcomeMessage`, `${split3}`);
            message.channel.send(`Changed welcome message to **${db.get(`${message.guild}.welcomeMessage`)}**`);
            break;
        case `botinfo`:
            let botinfoEmbed = new Discord.RichEmbed()
                .setColor("")
                .setAuthor("Owner: CAKE BOI", "https://cdn.discordapp.com/attachments/725324556696420402/726000190095622214/Cake-Boi.jpeg")
                .setTitle("**Cakey 2.0**")
                .setDescription("CAKEYS SON")
                .setThumbnail(`https://cdn.discordapp.com/attachments/725324556696420402/725992377575145523/Cakey_logo.png`)
                .setFooter("Creator: Pacific Range", "https://cdn.discordapp.com/attachments/725324556696420402/725999010619457586/PacificRangePFP.png");
            message.channel.send(botinfoEmbed);
            break;
        case `apply`:
            message.channel.send(`You got Mail 📬`);
            message.author.send(``);
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
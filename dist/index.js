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
const un = require("underscore");
const client = new Discord.Client();
const prefix = "+";
const logChannel = client.channels.find("id", "726526090813898854");
const code = Math.floor(Math.random() * 1000);
let dt = new Date();
let utcDate = dt.toUTCString();
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
    for (let i = 0; i < allUsers.length; i++) {
        if (util_1.isNull(db.get(allUsers[i].id))) {
            db.set(allUsers[i].id, { money: 50, messages: [] });
        }
        db.set(client.user.id, { entered: [] });
    }
    console.log(chalk.keyword('green')('Ready to go!'));
    console.log(chalk.keyword('magenta') `The secret code is ${code}`);
});
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    db.push(`${message.author.id}.messages`, "```" + `${message.content}` + "```");
    let playersMoney = db.get(`${message.author.id}.money`);
    if (message.content.indexOf(prefix) !== 0)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
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
                .addField("\`help-e\`", "aka economy HelpEmbed", true);
            message.channel.send(hepEmbed);
            break;
        case `help-n`:
            let helpembed = new Discord.RichEmbed()
                .setColor("#66ffff")
                .setTitle("Normal Help")
                .setDescription("Command and under it is description")
                .addField("`botinfo`", "Outputs info about the bot", true)
                .addField("`invite`", "Outputs the bot invite", true)
                .addField("`support`", "Outputs the support server invite", true);
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
                .addField("`log`", `@member / gives you all messages a person ever send`, true);
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
            db.push(`${client.user.id}.entered`, message.author);
            break;
        case `g-end`:
            message.channel.send(un.sample(db.get(`${client.user.id}.entered`)));
            break;
    }
}));
client.login(process.env.token1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUE4QjtBQUM5QiwrQkFBOEI7QUFDOUIsaUNBQWlDO0FBVWpDLE1BQU0sTUFBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUE7QUFDbEIsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUF3QixDQUFBO0FBQzFGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBQzdDLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDcEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBRS9CLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDekIsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBRXRCLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBRXZCLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDMUIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBRXBCLFNBQVMsS0FBSyxDQUFDLEVBQVU7O0lBQ3JCLGFBQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLDBDQUFFLFFBQVEsR0FBRztBQUM3QyxDQUFDO0FBQ0QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBRXBCLE1BQU0sQ0FBQyxJQUFLLENBQUMsV0FB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
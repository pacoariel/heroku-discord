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
function emoji(id) {
    var _a;
    return (_a = client.emojis.get(id)) === null || _a === void 0 ? void 0 : _a.toString();
}
client.on("ready", () => {
    client.user.setActivity("+help for help", { type: "WATCHING" });
    let allUsers = client.users.array();
    for (let i = 0; i < allUsers.length; i++) {
        if (util_1.isNull(db.get(allUsers[i].id))) {
            db.set(allUsers[i].id, { money: 50 });
        }
    }
    console.log(chalk.keyword('green')('Ready to go!'));
    console.log(chalk.keyword('magenta') `The secret code is ${code}`);
});
client.on("roleCreate", role => {
    logChannel.send(`Channel created: ${role}`);
});
client.on("message", (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
                .addField("\`help-m\`", "aka Moderator HelpEmbed", true);
            message.channel.send(hepEmbed);
            break;
        case `help-n`:
            let helpembed = new Discord.RichEmbed()
                .setColor("#66ffff")
                .setTitle("Help **(Prefix = +)**")
                .setDescription("Command and under it is description")
                .addField("`help`", "Outputs Overview help", true)
                .addField("`help-n`", "Outputs this embed", true)
                .addField("`botinfo`", "Outputs info about the bot", true)
                .addField("`invite`", "Outputs the bot invite", true)
                .addField("`support`", "Outputs the support server invite", true)
                .addField("`bal`", "Outputs your money", true)
                .addField("`work`", "Adds money to you", true)
                .addField("`say`", "Outputs whatever you say after the command", true);
            message.channel.send(helpembed);
            break;
        case `help-m`:
            let helpModeratorembed = new Discord.RichEmbed()
                .setColor("#993366")
                .setTitle("Help **(Prefix = +)**")
                .setDescription("Command and under it is description")
                .addField("`kick`", `@member Reason`, true)
                .addField("`ban`", `@member Reason`, true)
                .addField("`purge`", `deletes up to 100 messages in the channel`, true);
            message.channel.send(helpModeratorembed);
            break;
        case `invite`:
            message.channel.send(`This is an invite to add this bot to a server. Feel free to do so. 🙂\n https://discord.com/api/oauth2/authorize?client_id=725635490694561802&permissions=8&scope=bot`);
            break;
        case `support`:
            message.channel.send(`This is an invite to the Support server. If you have any questions feel free to join and ask. 🙂\n https://discord.gg/E9EanAg`);
            break;
        case `bal`:
            message.channel.send(`You currently have **${playersMoney}**`);
            break;
        case `say`:
            message.delete();
            message.channel.send(message.content.slice(5));
            break;
        case `work`:
            let random = Math.floor(Math.random() * 24) + 1;
            let msg = `You got ${random}`;
            if (random > 17) {
                db.add(`${message.author.id}.money`, random);
                msg = `**${message.author.username}**, You made a **yummy** cake. You got ${random} \n https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSo4gUCdnQ4JQGW8FcpLyjmVw4AJJ0uE_rjxg&usqp=CAU`;
            }
            else if (random > 5) {
                db.add(`${message.author.id}.money`, random);
                msg = `**${message.author.username}**, You made a **ugly** cake. You got ${random} \n https://i.pinimg.com/originals/29/fd/e2/29fde238bbe604cb04388d4b56b9afb1.jpg`;
            }
            else {
                db.subtract(`${message.author.id}.money`, random * 15);
                msg = `**${message.author.username}**, Your cake killed a peron pay ${random * 15} \n https://tenor.com/view/dead-dying-dog-shocked-cake-gif-16453337`;
            }
            message.channel.send(msg);
            break;
        case `cake`:
            function cake(file, description) {
                message.channel.send(description, { files: [`${file}`] });
            }
            let random2 = Math.floor(Math.random() * 109) + 1;
            if (110 > random2 && random2 > 100) {
                cake("../assets/cakes/5.jpeg", "Oreo with a big pile of fruits....");
            }
            else if (100 > random2 && random2 > 90) {
                cake("../assets/cakes/1.jpeg", "Rainbows.... Wait what **no** rainbows don't have white!??!?!");
            }
            else if (90 > random2 && random2 > 80) {
                cake("../assets/cakes/2.jpeg", "Choclate hearts.... Lovely.");
            }
            else if (80 > random2 && random2 > 70) {
                cake("../assets/cakes/3.jpeg", "Not so smart now huh. Understood ? Cause of **SMART**ies?? Not funny? K 😭.");
            }
            else if (70 > random2 && random2 > 60) {
                cake("../assets/cakes/4.jpeg", "Hmmm this looks veeeeeery yummy.");
            }
            else if (60 > random2 && random2 > 55) {
                db.add(`${message.author.id}.money`, 100);
                cake("../assets/cakes/6.jpeg", "This is the rarest cake of the collection :-). You amazed? No? Ok you get the 100$ anyways.");
            }
            else if (55 > random2 && random2 > 50) {
                db.add(`${message.author.id}.money`, 75);
                cake("../assets/cakes/7.jpeg", "This is also a rare cake though not the rarest. You get 75$.");
            }
            else if (50 > random2 && random2 > 40) {
                cake("../assets/cakes/8.jpeg", "***Pig***");
            }
            else if (40 > random2 && random2 > 30) {
                cake("../assets/cakes/9.jpeg", "Roses. Beautiful cake.");
            }
            else if (30 > random2 && random2 > 20) {
                cake("../assets/cakes/10.jpeg", "The Galaxy: infinite possibilities no end a real dream.");
            }
            else if (20 > random2 && random2 > 10) {
                cake("../assets/cakes/11.jpeg", "I'm not a Bunny !??!?!? WHAT DO YOU WANT FROM ME.");
            }
            else if (10 > random2 && random2 > 0) {
                cake("../assets/cakes/12.jpeg", "Trippel Oreo with rainbow Stuff on it..... I like it!");
            }
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
            if (!message.member.roles.some(r => ["Developer", "Moderator"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member = message.mentions.members.first() || message.guild.members.get(args[0]);
            if (!member)
                return message.reply("Please mention a valid member of this server");
            if (!member.kickable)
                return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
            let reason = args.slice(1).join(' ');
            if (!reason)
                reason = "No reason provided";
            yield member.kick(reason)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
            message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
            break;
        case `ban`:
            if (!message.member.roles.some(r => ["Administrator"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");
            let member1 = message.mentions.members.first();
            if (!member1)
                return message.reply("Please mention a valid member of this server");
            if (!member1.bannable)
                return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
            let reason1 = args.slice(1).join(' ');
            if (!reason1)
                reason = "No reason provided";
            yield member1.ban(reason1)
                .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
            message.reply(`${member1.user.tag} has been banned by ${message.author.tag} because: ${reason1}`);
            break;
        case `purge`:
            const deleteCount = parseInt(args[0], 10);
            if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
            const fetched = yield message.channel.fetchMessages({ limit: deleteCount });
            message.channel.bulkDelete(fetched)
                .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
            break;
        case `coinflip`:
            let str = message.content;
            let res = str.split(" ");
            let side = res[2];
            let bet = res[1];
            let Wside = "";
            if (bet > playersMoney)
                return;
            let flipNumber = Math.floor(Math.random() * 10) + 1;
            if (flipNumber = 1) {
                Wside = "Heads";
            }
            else {
                Wside = "Tails";
            }
            if (Wside = side) {
                let winEmbed = new Discord.RichEmbed()
                    .setColor(`#ffff00`)
                    .setTitle(`${message.author}, You **Won** !!!`)
                    .setDescription(`You get ${Number(bet) * 2}`)
                    .addField(`The coin landed on ${Wside}`, `You bet on ${side}`);
                message.channel.send(winEmbed);
                db.add(`${message.author.id}.money`, Number(bet) * 2);
            }
            else {
                let loseEmbed = new Discord.RichEmbed()
                    .setTitle(`${message.author}, You **Lost** ...`)
                    .setDescription(`You lost ${Number(bet)}`)
                    .addField(`The coin landed on ${Wside}`, `You bet on ${side}`);
                message.channel.send(loseEmbed);
                db.subtract(`${message.author.id}.money`, Number(bet));
            }
            break;
    }
}));
client.login(process.env.token1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUE4QjtBQUM5QiwrQkFBOEI7QUFVOUIsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQTtBQUNsQixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQXdCLENBQUE7QUFDMUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDN0MsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUNwQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDL0IsU0FBUyxLQUFLLENBQUMsRUFBVTs7SUFDckIsYUFBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsMENBQUUsUUFBUSxHQUFHO0FBQzdDLENBQUM7QUFDRCxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7SUFFcEIsTUFBTSxDQUFDLElBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUNoRSxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksYUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENB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
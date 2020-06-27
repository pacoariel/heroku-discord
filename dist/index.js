"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const db = require("quick.db");
const util_1 = require("util");
const chalk = require("chalk");
const client = new Discord.Client();
const prefix = "+";
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
client.on("message", message => {
    var _a;
    let playersMoney = db.get(`${message.author.id}.money`);
    if (message.content.indexOf(prefix) !== 0)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    switch (command) {
        case `help`:
            let helpembed = new Discord.RichEmbed()
                .setColor("#66ffff")
                .setTitle("Help **(Prefix = +)**")
                .setDescription("Command and under it is description")
                .addField("help", "outputs this embed", false)
                .addField("botinfo", "outputs info about the bot", false)
                .addField("invite", "outputs the bot invite", false)
                .addField("support", "outputs the support server invite", false)
                .addField("bal", "outputs your money", false)
                .addField("work", "Adds money to you", false)
                .addField("cake", "Outputs a cake. Yes exactly a cake.", false)
                .addField("say", "Outputs whatever you say after the command", false);
            message.channel.send(helpembed);
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
    }
});
client.login(process.env.token1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CLCtCQUE4QjtBQUM5QiwrQkFBOEI7QUFVOUIsTUFBTSxNQUFNLEdBQW1CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQTtBQUNsQixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUM3QyxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3BCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMvQixTQUFTLEtBQUssQ0FBQyxFQUFVOztJQUNyQixhQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxRQUFRLEdBQUc7QUFDN0MsQ0FBQztBQUNELE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtJQUVwQixNQUFNLENBQUMsSUFBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFBO0lBQ2hFLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxhQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtZQUNoQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFD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
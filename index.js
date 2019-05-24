const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Комманды не найдены");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} загружен!`);
        bot.commands.set(props.help.name, props);
    });

})


fs.readdir("./admins", (err, files) => {
    
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Комманды не найдены");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./admins/${f}`);
        console.log(`${f} загружен!`);
        bot.commands.set(props.help.name, props);
    });

})

fs.readdir("./funs", (err, files) => {
    
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Комманды не найдены");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./funs/${f}`);
        console.log(`${f} загружен!`);
        bot.commands.set(props.help.name, props);
    });

})


bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} подключился к серверу.`)

    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
    welcomechannel.send(`Вау, смотрите кто пришёл на вечеринку ${member}!`);
});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} покинул серверу.`)

    let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
    welcomechannel.send(`Очень жаль, ${member} покинул наш сервер!`);
});

bot.on("channelCreate", async channel => {
    console.log(`${channel.name} был создан!`);

    let sChannel = channel.guild.channels.find(`name`, "general");
    sChannel.send(`${channel} был создан!`);
});

bot.on("channelDelete", async channel => {
    console.log(`${channel.name} был удалён!`);

    let sChannel = channel.guild.channels.find(`name`, "general");
    sChannel.send(`Канал ${channel} был удалён!`);
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} в сети на ${bot.guilds.size} серверах!`);

    bot.user.setStatus('idle');
    bot.user.setActivity("Лучший бот на свете - Толстяк!", { type: "STREAMING" });

    let activeNum = 0;

    setInterval(function() {
        if (activeNum === 0) {
            bot.user.setActivity("Лучший бот на свете - Толстяк!", { type: "STREAMING" });
            activeNum = 1; 
        } else if (activeNum === 1) {
            bot.user.setActivity("Разработан пользователем tElore.", { type: "STREAMING" });
            activeNum = 2;
        }  else if (activeNum === 2) {
            bot.user.setActivity("Для помощи напиши !help.", { type: "STREAMING" });
            activeNum = 0;
        }
    }, 3 * 1000);
});

//console chatter
let y = process.openStdin()
y.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    bot.channels.get("387889474790490133").send(x.join(" "));
});


bot.on("message", async message => {
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

});



bot.login(tokenfile.token);
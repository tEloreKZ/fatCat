const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Список доступных комманд")
    .setDescription("Я покажу тебе список по всем доступным коммандам.")
    .setAuthor("fatCat", "https://i.imgur.com/lm8s41J.png")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Информация", "`!help`, `!botinfo`, `!serverinfo`", true)
    .addField("Модерирование", "`!ban`, `!kick`, `!clear`, `!addrole`, `!removerole`, `!say`, `!warn`, `!say`, `!tempmute`", true)
    .addField("Весёлое", "`!react`, `!8ball`, `!react`, `!cat`, `!dog`", true)
    .setFooter("Все права защищены © tElore")

    message.channel.send("Отправил команды в личные сообщения");
    return  bot.users.get(message.author.id).send(botembed);
}

module.exports.help = {
    name: "help"
}
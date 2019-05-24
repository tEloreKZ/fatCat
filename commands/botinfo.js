const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Привет! Меня моё имя Толстый! Я большой и ленивый бот с кучей всяких полезностей.        Я большой и ленивый бот, напиши `!help` что бы получить список всех доступных команд.")
    .setAuthor("fatCat", "https://i.imgur.com/lm8s41J.png")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Мой разработчик", "tElore#1204", true)
    .addField("Последняя сборка", "1.0.0 (от 23 мая 2019 года)", true)
    .addField("Полезные ссылки", "LINKS", true)
    .addField("Разработан на", "Java-Script", true)
    .addField("Количество серверов", bot.guilds.size, true)
    .setFooter("Все права защищены © tElore")

    return message.channel.send(botembed);
}

module.exports.help = {
    name: "botinfo"
}
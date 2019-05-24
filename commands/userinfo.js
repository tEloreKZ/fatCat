const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
   let user;
   if (message.mentions.users.first()) {
       users = message.mentions.users.first();
   } else {
       user = message.author;
   }

   const member = message.guild.member(user);

    const usEmbed = new Discord.RichEmbed()
    .setTitle(`${user.username}#${user.discriminator}`)
    .setColor("#15f153")
    .setThumbnail(message.author.avatarURL)
    .addField("Ник на сервере", `${member.nickname !== null ? `${member.nickname}` : 'Страндартный'}`, true)
    .addField("Зарегестрирован", `${moment.utc(member.joinedAt).format("dddd, MMMM do YYYY, HH:mm:ss")}`, true)
    .addField("Бот", `${user.bot}`, true)
    .addField("Статус", `${user.presence.status}`, true)
    .addField("Играет", `${user.presence.game ? user.presence.game.name : 'Нивочто'}`, true)
    .addField("Роли", member.roles.map(roles => `${roles.name}`).join(', '), true)
    .setFooter("Все права защищены © tElore")

    message.channel.send(usEmbed);
}

module.exports.help = {
    name: "userinfo",
    usage: "!userinfo",
    aliases: ["latency"]
}
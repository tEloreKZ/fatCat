const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.channel.send("Пингация...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["Это мой реальный пинг", "Все хорошо? Я могу посмотреть", "Я недеюсь это не плохо"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}: Отклик бота: \`${ping}\`, Отклик API: \`${Math.round(bot.ping)}\``)
    })

}

module.exports.help = {
    name: "ping",
    usage: "!ping",
    aliases: ["latency"]
}
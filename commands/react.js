const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "293017471223595010") return;
    message.react('🤔');
}

module.exports.help = {
    name: "react"
}
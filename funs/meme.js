const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {

    let {body} = await superagent
    .get(`https://apis.duncte123.me/meme`);

    let memembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Мем :dog:")
    .setImage(body.image);

    message.channel.send(memembed);

}

module.exports.help = {
    name: "meme"
}
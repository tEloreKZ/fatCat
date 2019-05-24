const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Пользователь не найден.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Не возможно его замутить!");
    let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if(!muterole){
        try{
            muterole = await message.guild.createRole({
                name: "muted", 
                color: "#000000",
                permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        }catch(e){
            console.log(e.stack);
        }
    }
    //end of created role
    let mutetime = args[1];
    if(!mutetime) return message.reply("Некоректное время!");

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> был замучен на ${ms(ms(mutetime))}`);
    
    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> был размучен!`);
    }, ms(mutetime));
}

module.exports.help = {
    name: "tempmute"
}
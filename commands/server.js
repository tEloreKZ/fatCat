const Discord = require("discord.js");
const request = require('request');

module.exports.run = async (bot, message, args) => {
    
    
    url = 'https://arma3-servers.net/api/?object=servers&element=detail&key=ZD26ryE4SnMG05UCLLFIkjrndduxabUf13';
    let options = {
        url: url,
        headers: {
            'User-Agent' : 'request'
        }
    };

    function embedCallBack(error, response, body) {
        if (!error && response.statusCode == 200) {
            let info = JSON.parse(body);
            let text = '**Сервер:** server.hardmodegames.ru:2302\n**Карта: **'+info.map+'\n**Игроков: **'+info.players+'\ | \ '+'**Версия: **'+info.version+'\n\n';
            let messEmbed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('HardMode Games')
            .setURL('http://hardmodegames.ru')
            .setThumbnail('http://new.hardmodegames.ru/api/bots/pic/hmg_logo.jpg', 'http://hardmodegames.ru/')
            .addField('Игровой сервер Arma 3', text)
            .addField('Как начать играть', 'Ознакомится с правилами нашего игрового сервера, а так же найти инструкции по установке дополнений, вы можете на [этой странице форума](http://hardmodegames.ru/forum/index.php?/forum/4-informaciya/)', true)
            .addField('Расписание игр', 'На нашем сервере проводятся регулярные игры. С расписание можно ознакомится [на этой](http://hardmodegames.ru/forum) странице', true)
            .setFooter('Администрация проекта HardMode Games', 'http://new.hardmodegames.ru/api/bots/pic/hmg_logo.jpg')
            
            return message.channel.send(messEmbed);
        }
    }

    request(options, embedCallBack);

}

module.exports.help = {
    name: "server"
}
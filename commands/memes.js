const Discord = require("discord.js")
const randomPuppy = require("random-puppy")

exports.command = (bot, message, args) => {
    randomPuppy('memes')
    .then(url => {
        let embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setImage(url)
            .setColor('RANDOM')
        message.channel.send({embeds: [embed]});
    });
}
exports.infos = {
    name: "memes",
    description: "Génère un meme pour vous depuis reddit",
    usage: "[prefix]memes",
    alias: [

    ]
}

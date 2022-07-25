const Discord = require("discord.js")
const randomPuppy = require("random-puppy")

exports.command = (bot, interaction, options) => {
    randomPuppy('memes')
    .then(url => {
        let embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setImage(url)
            .setColor('RANDOM')
        return interaction.reply({embeds: [embed]});
    });
}
exports.infos = {
    name: "meme",
    description: "Génère un meme pour vous depuis reddit",
    usage: "[prefix]meme",
    alias: [

    ]
}
const Discord = require("discord.js")
exports.embedMaker = (color, msg) => {
    let embed = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(msg)

    message.channel.send({ embeds: [embed]})
}

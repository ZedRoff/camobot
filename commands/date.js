const Discord = require("discord.js")

exports.command = (bot, interaction, options) => {
    const date = new Date();
    const embed = new Discord.MessageEmbed()
    .setDescription(`Nous sommes le ${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()}\nEt il est ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    interaction.reply({
        embeds: [embed]
    })
}
exports.infos = {
    alias: [],
    name: "date",
    description: "Donne la date d'aujourd'hui",
    usage: "[prefix]date"
}
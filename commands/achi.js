const Discord = require("discord.js")
const funcs = require("../utils/errors")

exports.command = (bot, interaction, options) => {
    let texte = options.getString("texte")
    if(texte.length > 20) return interaction.reply({embeds: [funcs.wrongLength(20)]})
   return interaction.reply({content: `https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement%20unlocked&t=${texte.replaceAll(" ", "%20")}`})
}

exports.infos = {
    name: "achi",
    description: "Permet de réalisé un achievement comme dans minecraft avec le texte que vous donnez au bot",
    usage: "[prefix]achi [texte]",
    alias: [],
    options: [
        {name: "texte", description: "Le texte dont vous voulez faire l'achievement", required: true, type: Discord.Constants.ApplicationCommandOptionTypes.STRING}
    ]
}
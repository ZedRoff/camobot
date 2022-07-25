const isgd = require("isgd")
const funcs = require("../utils/errors")
const Discord = require("discord.js")

exports.command = (bot, interaction, options) => {
    let mot = options.getString("mot")
    let url = options.getString("url")
    isgd.custom(url, mot, (res) => {
        if(res.includes("Error:")) {
            return interaction.reply({content: "Cette url est déjà prise"}) 
        }
        let embed = new Discord.MessageEmbed()
        .setTitle("Commande shorten")
        .addFields({name: "URL d'origine", value: url}, {name: "URL raccourcie", value: res})

        return interaction.reply({embeds: [embed] })
    })
    
}
exports.infos = {
    name: "shorten",
    description: "Raccourci l'url d'entrée par le mot saisi",
    alias: [],
    usage: "[prefix]shorten [mot] [url]",
    options: [{
        name: "mot",
        description: "Mot par lequel vous souhaitez raccourcir l'URL",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    },{
        name: "url",
        description: "URL que vous souhaitez raccourcir",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
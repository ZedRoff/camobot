const isgd = require("isgd")
const funcs = require("../utils/errors")
const Discord = require("discord.js")

exports.command = (bot, interaction, options) => {
    
    isgd.lookup(options.getString("url"), (res) => {
        if(res.includes("Error:"))  return interaction.reply({content: "Désolé ce message est en anglais, mais voici l'erreur : "+ res}) // TODO : translate this to french with translate-google
     
        let embed = new Discord.MessageEmbed()
        .setTitle("Commande shorten")
        .addFields({name: "L'url d'origine est : ", value: res})

        interaction.reply({embeds: [embed] })
    })
    
}
exports.infos = {
    name: "lengthen",
    description: "Repart a l'URL d'origine qui a été utilisée pour raccourcir l'url",
    alias: [],
    usage: "[prefix]lengthen [URL ou mot du shorten utilisé]",
    options: [{
        name: "url",
        description: "URL du shorten utilisé ou MOT du shorten utilisé",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
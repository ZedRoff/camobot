const isgd = require("isgd")
const funcs = require("../utils/errors")
const Discord = require("discord.js")

exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]shorten [mot] [url] (mot manquant)")
    if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]shorten [mot] [url] (url manquante)")

    isgd.custom(args[1], args[0], (err, res) => {
        if(err) {
            return message.channel.send("Désolé ce message est en anglais, mais voici l'erreur : "+ err) // TODO : translate this to french with translate-google
        }
        let embed = new Discord.MessageEmbed()
        .setTitle("Commande shorten")
        .addFields({name: "URL d'origine", value: args[1]}, {name: "URL raccourcie", value: res})

        message.channel.send({embeds: [embed] })
    })
    
}
exports.infos = {
    name: "shorten",
    description: "Raccourci l'url d'entrée par le mot saisi",
    alias: [],
    usage: "[prefix]shorten [mot] [url]"
}

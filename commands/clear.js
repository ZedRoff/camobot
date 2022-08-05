const Discord = require("discord.js")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const md = require("../utils/md")

exports.command = (bot, interaction, options) => {
    let num = options.getString("nombre")
    if(num > 100) return interaction.reply({content: "Je ne peux pas supprimer plus de 100 messages d'un coup"})
    interaction.channel.bulkDelete(num).then(_m => {
        return interaction.reply({ embeds: [emb.embedMaker("#00FF00", `${md.encadrer(num)} messages ont été supprimés`)] })
    }).catch(e => {
        console.log(e)
        return interaction.reply({ embeds: [emb.embedMaker("#FF0000", `Une erreur est survenue, je n'ai pas pu supprimé les messages`)] })
    })
}

exports.infos = {
    name: "clear",
    description: "Supprime une quantité n de messages dans le salon",
    usage: "[prefix]clear [nombre}",
    alias: [],
    options: [
        {name: "nombre", description: "Le nombre de messages que vous souhaitez supprimer", required: true, type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER}
    ]
}
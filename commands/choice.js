const Discord = require("discord.js")
const funcs = require("../utils/errors")

exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]choice [choix1] | [choix2] | [choix ...] (choix1 manquant)")
    if(!args[1]) return funcs.errorArgs(Discord, message, "Met plus d'un choix, sinon comme qui dirais la question est vite répondue")

    let choices = args.join(" ").split(" | ")


    let rnd = Math.floor(Math.random() * choices.length)
    let embed = new Discord.MessageEmbed()
    .setTitle("Commande choix")
    .addFields({name: `Tu devrais choisir ton choix ${rnd+1}`, value: choices[rnd]})

    message.channel.send({ embeds: [embed] })
}
exports.infos = {
    name: "choice",
    description: "Le bot fait le choix entre vos deux choix spécifiés",
    usage: "[prefix]choice [choix1] | [choix2] | [choix ...]",
    alias: []
}

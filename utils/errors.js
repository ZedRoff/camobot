const Discord = require("discord.js")
exports.errorArgs = (msg) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Problème d'argument")
    .setDescription(msg)

    return embed
}

exports.negativeInteger = () => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Mauvais nombre en entré")
    .setDescription("Les nombres négatifs ne sont pas autorisées dans cette commande")

    return embed
}
exports.wrongEntry = (msg) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Mauvaise entrée")
    .setDescription(msg)

    return embed
}
exports.missingPerms = (perm) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`Hep hep, tu n'as pas la permission ${perm}, tu ne peux pas executer cette commande`)

    return embed
}

exports.wrongLength = (max) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`Dans cette commande, le texte donné ne peut pas dépasser les ${max} caractères`)

    return embed
}
exports.resLength = () => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`La taille de la réponse était trop longue, je ne peux pas l'afficher malheureusement`)

    return embed
}
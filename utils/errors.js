exports.errorArgs = (Discord, message, msg) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Problème d'argument")
    .setDescription(msg)

    message.channel.send({embeds: [embed]})
}

exports.negativeInteger = (Discord, message ) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Mauvais nombre en entré")
    .setDescription("Les nombres négatifs ne sont pas autorisées dans cette commande")

    message.channel.send({ embeds: [embed]})
}
exports.wrongEntry = (Discord, message, msg) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Mauvaise entrée")
    .setDescription(msg)

    message.channel.send({ embeds: [embed]})
}
exports.missingPerms = (Discord, message, perm) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`Hep hep, tu n'as pas la permission ${perm}, tu ne peux pas executer cette commande`)

    message.channel.send({ embeds: [embed] })
}

exports.wrongLength = (Discord, message, max) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`Dans cette commande, le texte donné ne peut pas dépasser les ${max} caractères`)

    message.channel.send({ embeds: [embed] })
}
exports.resLength = (Discord, message) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(`La taille de la réponse était trop longue, je ne peux pas l'afficher malheureusement`)

    message.channel.send({ embeds: [embed] })
}

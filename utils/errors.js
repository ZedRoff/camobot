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

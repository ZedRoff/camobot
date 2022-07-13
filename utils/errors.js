exports.errorArgs = (Discord, message, prefix, msg) => {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Problème d'argument")
    .setDescription(msg.replace("[prefix]", prefix))

    message.channel.send({embeds: [embed]})
}

const Discord = require("discord.js")
const emb = require("../utils/embed")
exports.command = (bot,  message, args) => {
    let user = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
    if(!user) return emb.embedMaker(Discord, message, '#00FFFF', "L'utilisateur n'a pas été trouver.")
    let embed = new Discord.MessageEmbed()
    .setColor("DARKER_GREY")
    .setTitle("L'image de profile de : "+user.username)
    .setImage(user.displayAvatarURL())

    message.channel.send({ embeds: [embed] })
}

exports.infos = {
    name: "avatar",
    usage: "[prefix]avatar (user)",
    description: "Affiche l'avatar d'un utilisateur",
    alias: []
}

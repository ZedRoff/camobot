const Discord = require("discord.js")
const emb = require("../utils/embed")
exports.command = (bot,  interaction, options) => {
    let user = options.getUser("utilisateur") || interaction.member
  
    let embed = new Discord.MessageEmbed()
    .setColor("DARKER_GREY")
    .setTitle("L'image de profile de : "+user.username)
    .setImage(user.displayAvatarURL())

   return interaction.reply({ embeds: [embed] })
}

exports.infos = {
    name: "avatar",
    usage: "[prefix]avatar (user)",
    description: "Affiche l'avatar d'un utilisateur",
    alias: [],
    options: [{
        name: "utilisateur",
        description: "L'utilisateur dont vous souhaitez afficher l'avatar",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER
    }]
}
const Discord = require("discord.js")
const funcs = require("../utils/errors")



exports.command = (bot, interaction, options) => {
 
    let choices = options.getString("choix").split(" | ")


    let rnd = Math.floor(Math.random() * choices.length)
    let embed = new Discord.MessageEmbed()
    .setTitle("Commande choix")
    .addFields({name: `Tu devrais choisir ton choix ${rnd+1}`, value: choices[rnd]})

    interaction.reply({ embeds: [embed] })
}
exports.infos = {
    name: "choice",
    description: "Le bot fait le choix entre vos deux choix spécifiés",
    usage: "[prefix]choice [choix1] | [choix2] | [choix ...] (n'oubliez pas le |)",
    alias: [],
    options: [
        
        {name: "choix", description: "Les choix que parmis lesquels le bot doit choisir", required: true, type: Discord.Constants.ApplicationCommandOptionTypes.STRING}
    ]
}
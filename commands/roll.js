const Discord = require("discord.js")
const funcs = require("../utils/errors")
exports.command = (bot, interaction, options) => {
    let num = options.getNumber("nombre")
    
    if(!num) num = 100
  

    let generated = Math.round(Math.random() * num)

    let embed = new Discord.MessageEmbed()
    .setTitle("Commande roll")
    .setDescription(`Le bot a choisit le nombre ${generated} !`)

    return interaction.reply({ embeds: [embed]})
}
exports.infos = {
    name: "roll",
    description: "Choisit un nombre au hasard de 0 à n (n étant le nombre que vous avez rentrer)",
    alias: [],
    usage: "[prefix]roll (num)",
    options:[{
        name: "nombre",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER,
        description: "Le nombre max que le roll pourra atteindre"
    }]
}
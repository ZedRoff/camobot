const Discord = require("discord.js")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const math = require("mathjs")

exports.command = (bot, interaction, options) => {
   
 
    try {
        let expr = options.getString("expression")
        let resp = math.evaluate(expr)
        resp = JSON.stringify(resp)
        if(resp.length > 2047) return interaction.reply({embeds: [errors.resLength()]})
        let embed = new Discord.MessageEmbed()
        .setTitle("Commande calculatrice")
        .addFields({name: "Expression", value: expr}, {name: "Résultat", value: resp})
        return interaction.reply({ embeds: [embed] })
    

    }catch(e) {
        return interaction.reply({embeds: [emb.embedMaker("#FF0000", "Cette expression est invalide\n\n"+e)]})
    }
   

}
exports.infos = {
    name: "calc",
    description: "Rempli les fonctions d'une calculatrice basique",
    usage: "[prefix]calc [expression]",
    alias: [],
    options: [
        {name: "expression", description: "Expression a évalué", required: true, type: Discord.Constants.ApplicationCommandOptionTypes.STRING}
    ]

}
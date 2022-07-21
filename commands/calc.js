const Discord = require("discord.js")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const math = require("mathjs")

exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]calc [expression]")

 
    try {
        let resp = math.evaluate(args.join(" "))
        resp = JSON.stringify(resp)
        if(resp.length > 2047) return errors.resLength(Discord, message)
        let embed = new Discord.MessageEmbed()
        .setTitle("Commande calculatrice")
        .addFields({name: "Expression", value: args.join(" ")}, {name: "Résultat", value: resp})
        return message.channel.send({ embeds: [embed] })
    

    }catch(e) {
        return emb.embedMaker(Discord, message, "#FF0000", "Cette expression est invalide\n\n"+e)
    }
   

}
exports.infos = {
    name: "calc",
    description: "Rempli les fonctions d'une calculatrice basique",
    usage: "[prefix]calc [expression]",
    alias: []
}

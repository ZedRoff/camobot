const Discord = require("discord.js")
const funcs = require("../utils/md")
const errors = require("../utils/errors")
exports.command = (bot, message, args) => {
    if(!args[0]) return errors.errorArgs(Discord, message, "[prefix]8ball [question]")
    let res = [
        "Oui",
        "Non",
        "Surement",
        "Peut-être",
        "Pourquoi pas", 
        "Pas du tout",
        "Absolument pas",
        "Ouep",
        "Ouaip"
    ]
    let chosen = Math.floor(Math.random() * res.length)
    let embed = new Discord.MessageEmbed()
    .setColor("NAVY")
    .setTitle("Commande 8ball")
    .addFields({name: "Question :", value: funcs.encadrer(args.join(" "))}, {name: "Réponse :", value: funcs.encadrer(res[chosen])})
    
    message.channel.send({ embeds: [embed]})
}
exports.infos = {
    name: "8ball",
    description: "Posez une question au bot et il vous répondra",
    alias: ["8b"],
    usage: "[prefix]8ball [question]"
}

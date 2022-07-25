const Discord = require("discord.js")
const funcs = require("../utils/md")
const errors = require("../utils/errors")
exports.command = (bot, interaction, options) => {
    
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
    let question = options.getString("question")
    let embed = new Discord.MessageEmbed()
    .setColor("NAVY")
    .setTitle("Commande 8ball")
    .addFields({name: "Question :", value: funcs.encadrer(question)}, {name: "Réponse :", value: funcs.encadrer(res[chosen])})
    
    return interaction.reply({ embeds: [embed]})
}
exports.infos = {
    name: "8ball",
    description: "Posez une question au bot et il vous répondra",
    alias: ["8b"],
    usage: "[prefix]8ball [question]",
    options: [{
        name: "question",
        description: "La question que vous souhaitez poser au bot",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
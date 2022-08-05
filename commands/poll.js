// still some bugs to fix but since it's only for staff it's ok.
// TODO : check again this command, not sure about all the tests made
const Discord = require("discord.js")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
exports.command = async (bot, interaction, options) => {
    
const emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];


let question = options.getString("question")

let choices = options.getString("choix").split(" | ")

let tab = []

for(let i=0;i<choices.length;i++) {
    tab.push(`${emotes[i]} | ${choices[i]}`)
}

let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(question)
.addFields({name: "Choix", value: tab.join("\n")})

const message = await interaction.reply({ embeds: [embed] , fetchReply: true})

    for(let i=0;i<choices.length;i++) {    
        message.react(emotes[i])
    }


}

exports.infos = {
    name: "poll",
    description: "Permet de crée un sondage",
    usage: "[prefix]poll [Question] [choix 1] | [choix2] | [choix ...] (attention aux | entre les choix et a la virgule entre la question et les choix)",
    alias: [],
    options: [
        {name: "question", description: "La question du sondage", required: true, type: Discord.Constants.ApplicationCommandOptionTypes.STRING}, {name: "choix", description: "Les choix du sondage", required: true, type: Discord.Constants.ApplicationCommandOptionTypes.STRING}
    ]
}
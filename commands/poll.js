// still some bugs to fix but since it's only for staff it's ok.
// TODO : check again this command, not sure about all the tests made
const Discord = require("discord.js")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
exports.command = (bot, message, args) => {
    
const emotes = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

let res = args.join(" ")

if(!res.includes(",")) return funcs.errorArgs(Discord, message, "[prefix]poll [Question], [choix 1] | [choix2] | [choix ...] (virgule manquante)")
res = res.split(",")

let question = res[0].trim()
if(question.length == 0) return funcs.errorArgs(Discord, message, "[prefix]poll [Question], [choix 1] | [choix2] | [choix ...] (question manquante)")
let choices = res[1].split("|")
if(choices.length == 0) return funcs.errorArgs(Discord, message, "[prefix]poll [Question], [choix 1] | [choix2] | [choix ...] (choix manquants)")

let tab = []

for(let i=0;i<choices.length;i++) {
    tab.push(`${emotes[i]} | ${choices[i]}`)
}

let embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(question)
.addFields({name: "Choix", value: tab.join("\n")})

message.channel.send({ embeds: [embed] }).then(msg => {
    for(let i=0;i<choices.length;i++) {
        msg.react(emotes[i])
    }
})

}

exports.infos = {
    name: "poll",
    description: "Permet de crée un sondage",
    usage: "[prefix]poll [Question], [choix 1] | [choix2] | [choix ...] (attention aux | entre les choix et a la virgule entre la question et les choix)",
    alias: []
}

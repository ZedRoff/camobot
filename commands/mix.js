const funcs = require("../utils/errors")
const Discord = require("discord.js")
const md = require("../utils/md")
exports.command = (bot, interaction, options) => {


function shuffle(s1,s2) {
	let end_str = ""
  let s = s1 + s2 
  s = s.split("")
	while(s.length != 0) {
  let rnd = Math.floor(Math.random() * s.length)
  end_str += s[rnd]
  s.splice(rnd, 1)
  }
 return end_str
}

let texte1 = options.getString("texte1")
let texte2 = options.getString("texte2")

return interaction.reply({content: md.encadrer(shuffle(texte1, texte2))})
}

exports.infos = {
    name: "mix",
    description: "Renvoie un mix des deux textes donnés en entrée",
    alias: [],
    usage: "[prefix]mix [texte 1] | [texte 2] (n'oubliez pas le |)",
    options: [{
        name: "texte1",
        description: "Le premier texte",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    },{
        name: "texte2",
        description: "Le deuxième texte",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
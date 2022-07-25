const Discord = require("discord.js")
const translate = require('translate-google')
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const md = require("../utils/md")

exports.command =  (bot, interaction, options) => {

  
let langue = options.getString("langue")
let texte = options.getString("texte")
translate(texte, {to: langue}).then(res => {
interaction.reply({content: md.encadrer(res)})
}).catch(err => {
    return interaction.reply({embeds: [emb.embedMaker( "#FF0000", "Une erreur est survenue, merci de vérifier si la langue entrée est bonne (exemple: pour le français ça devient fr, pour l'anglais c'est en etc ...")]})
})

}

exports.infos = {
  name: "translate",
  description: "Traduit le texte qui a été donné en entré dans la langue spécifiée",
  usage: "[prefix]translate [langue] [texte]",
  alias: [],
  options: [{
    name: "langue",
    description: "La langue dans laquelle vous souhaitez traduire le texte donné",
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  },
  {
    name: "texte",
    description: "Le texte que vous souhaitez traduire",
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }]
}

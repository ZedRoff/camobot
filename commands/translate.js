const Discord = require("discord.js")
const translate = require('translate-google')
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const md = require("../utils/md")

exports.command =  (bot, message, args) => {

  

if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]translate [langue] [texte] (langue manquante)")
if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]translate [langue] [texte] (texte manquant)")
translate(args.slice(1).join(" "), {to: args[0]}).then(res => {
message.channel.send(md.encadrer(res))
}).catch(err => {
    return emb.embedMaker(Discord, message, "#FF0000", "Une erreur est survenue, merci de vérifier si la langue entrée est bonne (exemple: pour le français ça devient fr, pour l'anglais c'est en etc ...")
})

}

exports.infos ={
  name: "translate",
  description: "Traduit le texte qui a été donné en entré dans la langue spécifiée",
  usage: "[prefix]translate [langue] [texte]",
  alias: []
}

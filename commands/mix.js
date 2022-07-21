const funcs = require("../utils/errors")
const Discord = require("discord.js")
const md = require("../utils/md")
exports.command = (bot, message, args) => {


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
args = args.join(" ").split(" | ")
if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]mix [texte 1] | [texte 2] (texte 1 manquant)")
if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]mix [texte 1] | [texte 2] (texte 1 manquant)")


message.channel.send(md.encadrer(shuffle(args[0], args[1])))
}

exports.infos = {
    name: "mix",
    description: "Renvoie un mix des deux textes donnés en entrée",
    alias: [],
    usage: "[prefix]mix [texte 1] | [texte 2] (n'oubliez pas le |)"
}

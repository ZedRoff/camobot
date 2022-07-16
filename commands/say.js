const Discord = require("discord.js")
const funcs = require("../utils/errors")
const embed_f = require("../utils/embed")

exports.command = (bot, message, args) => {
if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]say [mode] [message]")
if(!message.member.hasPermission("MANAGE_MESSAGES")) return funcs.missingPerms(Discord, message, 'MANAGE_MESSAGES')
let choices = ["normal", "embed"]
let mode = args[0]
if(!choices.includes(mode)) return embed_f.embedMaker(Discord, message, '#FF0000', "Le mode n'est pas le bon, (normal et embed supportés uniquement)")

if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]say [mode] [message]")
if(args.slice(1).includes("@everyone")) return embed_f.embedMaker(Discord, message, '#FF0000', "Bien essayé mais impossible de faire cela")
let msg = args.slice(1).join(" ")
switch(mode) {
    case "normal": {
        message.channel.send(args.slice(1).join(" "))
    }
    break;
    case "embed": {
        return embed_f.embedMaker(Discord, message, '#00FFFF', msg)
    }
}
}
exports.infos = {
    name: "say",
    description: "Fait parler le bot a votre place",
    usage:"[prefix]say [mode] [message]",
    alias: []
}

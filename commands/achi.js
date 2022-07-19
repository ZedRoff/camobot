const Discord = require("discord.js")
const funcs = require("../utils/errors")

exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, '[prefix]achi [texte]')
    if(args.join(" ").length > 20) return funcs.wrongLength(Discord, message, 20)
    message.channel.send(`https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement%20unlocked&t=${args.join(" ")}`)
}

exports.infos = {
    name: "achi",
    description: "Permet de réalisé un achievement comme dans minecraft avec le texte que vous donnez au bot",
    usage: "[prefix]achi [texte]",
    alias: []
}

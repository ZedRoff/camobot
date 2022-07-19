const funcs = require("../utils/errors")
const Discord = require("discord.js")
exports.command = async (bot, message, args) => {

        if(!args[0]) return funcs.errorArgs(Discord, message, '[prefix]qrcode [texte]')

            message.channel.send(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${args.join(" ").replaceAll(" ", "%20")}`)
  
      
  
}
exports.infos = {
    name: "qrcode", 
    description: "Crée un qrcode avec le texte donné",
    usage: "[prefix]qrcode [texte]"
}

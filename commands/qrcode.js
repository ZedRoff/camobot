const funcs = require("../utils/errors")
const Discord = require("discord.js")
exports.command = async (bot, interaction, options) => {

      
            interaction.reply(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${options.getString("texte").replaceAll(" ", "%20")}`)
  
      
  
}
exports.infos = {
    name: "qrcode", 
    description: "Crée un qrcode avec le texte donné",
    usage: "[prefix]qrcode [texte]",
    alias: [],
    options:[{
        name: "texte",
        description: "Texte que vous souhaitez rendre en QRCode",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
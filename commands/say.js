const Discord = require("discord.js")
const funcs = require("../utils/errors")
const embed_f = require("../utils/embed")

exports.command = (bot, interaction, options) => {
   
if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({embeds: [funcs.missingPerms('MANAGE_MESSAGES')]})
let choices = ["normal", "embed"]
let mode = options.getString("type")
if(!choices.includes(mode)) return interaction.reply({embeds: [embed_f.embedMaker('#FF0000', "Le mode n'est pas le bon, (normal et embed supportés uniquement)")]})

let msg = options.getString("message")
if(msg.includes("@everyone")) return interaction.reply({embeds: [embed_f.embedMaker('#FF0000', "Bien essayé mais impossible de faire cela")]})

switch(mode) {
    case "normal": {
        return interaction.reply({content: msg})
    }
   
    case "embed": {
        return interaction.reply({embeds: [embed_f.embedMaker('#00FFFF', msg)]})
    }
}
}
exports.infos = {
    name: "say",
    description: "Fait parler le bot a votre place",
    usage:"[prefix]say [mode] [message]",
    alias: [],
    options: [
        {name: "type", description: "Type normal|embed", required: true, type: Discord.Constants.ApplicationCommandOptionTypes.STRING},
        {
            name: "message",
            description: "Le message que vous souhaitez",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
        }
    ]
}
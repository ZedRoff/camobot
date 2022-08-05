const funcs = require("../utils/errors")
const Discord = require("discord.js")
const emb = require("../utils/embed")
const hastebin = require("hastebin")
exports.command = (bot, interaction, options) => {
    let content = options.getString("texte")
    let extension = options.getString("extension")
    hastebin.createPaste(content, {extension}).then(r => {
    const embed = new Discord.MessageEmbed()
    .setColor("#43D3CC")
    .setTitle("Générateur d'hastebin")
    .addFields({name: "Voici votre lien", value: `[Lien](${r})`})
 
   
    interaction.reply({ embeds: [embed] })
    }).catch(e => {
        return interaction.reply({ embeds: [emb.embedMaker("#FF0000", "`Une erreur est survenue lors de la création de votre hastebin.`")]})
    })
}
exports.infos = {
    name: "hastebin",
    description: "Permet de crée un fichier texte sécurisé avec hastebin",
    usage: "[prefix]hastebin [extension] [texte]",
    alias: [],
    options: [
        {
            name: "extension",
            description: "L'extension du hastebin a crée (exemple : json,js,py)",
            required:true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: "texte",
            description: "Le texte a mettre dans le hastebin",
            required:true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
        }
    ]
}
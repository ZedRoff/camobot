const funcs = require("../utils/errors")
const Discord = require("discord.js")
const emb = require("../utils/embed")
const hastebin = require("hastebin")
exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]hastebin [extension] [texte] (extension manquante)")
    if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]hastebin [extension] [texte] (texte manquant)")
    let content = args.slice(1).join(" ")
    let extension = args[0]
    hastebin.createPaste(content, {extension}).then(r => {
    const embed = new Discord.MessageEmbed()
    .setColor("#43D3CC")
    .setTitle("Générateur d'hastebin")
    .addFields({name: "Voici votre lien", value: `[Lien](${r})`})
 
   
    message.channel.send({ embeds: [embed] })
    }).catch(e => {
        return emb.embedMaker(Discord, message, "#FF0000", "`Une erreur est survenue lors de la création de votre hastebin.`")
    })
}
exports.infos = {
    name: "hastebin",
    description: "Permet de crée un fichier texte sécurisé avec hastebin (pour ensuite pouvoir le partager aux autres etc...)",
    usage: "[prefix]hastebin [extension] [texte]",
    alias: []
}

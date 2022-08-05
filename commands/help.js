const Discord = require("discord.js")
const funcs = require("../utils/md.js")
const config = require("../private/config.json")
const embed_f = require("../utils/embed")

exports.command = (bot, interaction, options) => {

    let general = ["help", "botinfo", "macro", "avatar", "date", "profile", "register", "unregister", "set", "serverinfo", "info"]
    let fun = ["roll", "lovecalc", "rps", "bingo", "achi", "image", "pendu", "twitter", "wanted", "memes"]
    let utils = ["ascii", "qrcode", "afk", "calc", "choice", "rename"]
    let mods = ["eval", "macro", "setprefix", "say", "role"]

    const fs = require("fs")
    let count;
    fs.readdir("./commands/", (err, files) => {
        count = files.length // a_template should require a -1 since it's not a command, but the command info is not in the ./commands/ dir
    })

    let embed = new Discord.MessageEmbed()
    .setColor("#7F56FF")
    .setTitle("Commande d'aide du bot")
    .setDescription("Si vous souhaitez avoir plus d'informations sur une commande spécifique, merci d'utiliser la commande `info`.\n\nNombre de commandes : "+count)
    .addFields(
        {name: "Commandes Générales", value: funcs.encadrer(general.join(" | "))},
        {name: "Commandes Fun", value: funcs.encadrer(fun.join(" | "))},
        {name: "Commandes Utilitaires", value: funcs.encadrer(utils.join(" | "))},
        {name: "Commande de modération", value: funcs.encadrer(mods.join(" | "))}

    )
    .setFooter({text: `Version : ${config.version}`, iconURL: bot.user.displayAvatarURL()})

      
    if(options.getString("choix") !== "mp") {
        return interaction.reply({embeds: [embed]})
    }

        const user = bot.users.cache.get(interaction.member.user.id)
        interaction.member.send({ embeds: [embed] }).then(msg => {
            return interaction.reply({embeds: [embed_f.embedMaker('#00FFFF', "Je vous ai envoyer la page d'aide en MP")]})
        }).catch(e => {
            console.log(e)
            return interaction.reply({content: funcs.encadrer("Vos mps sont fermés, je peux pas vous envoyer la page d'aide")})
        })
    
    
    }
exports.infos = {
    name: "help",
    description:"Page d'aide des commandes du bot",
    alias: ["h"],
    usage: "[prefix]help (choix : mp)",
    options:[
        {name: "choix",
    description: "Exemple : mp",
    required: false,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING}
    ]
}

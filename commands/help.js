const Discord = require("discord.js")
const funcs = require("../utils/md.js")
const config = require("../utils/config.json")
const embed_f = require("../utils/embed")

exports.command = (bot, message,args) => {

    let general = ["help", "botinfo", "macro", "avatar", "date", "profile", "register", "unregister", "set", "serverinfo"]
    let fun = ["roll", "lovecalc", "rps", "bingo", "achi", "image", "pendu", "twitter", "wanted"]
    let utils = ["ascii", "qrcode"]
    let mods = ["eval", "macro", "setprefix", "say", "role"]

    let embed = new Discord.MessageEmbed()
    .setColor("#7F56FF")
    .setTitle("Commande d'aide du bot")
    .setDescription("Si vous souhaitez avoir plus d'informations sur une commande spécifique, merci d'utiliser la commande `info`.\n\nNombre de commandes :"+general.length+fun.length+utils.length+mods.length)
    .addFields(
        {name: "Commandes Générales", value: funcs.encadrer(general.join(" | "))},
        {name: "Commandes Fun", value: funcs.encadrer(fun.join(" | "))},
        {name: "Commande de modération", value: funcs.encadrer(mods.join(" | "))}

    )
    .setFooter({text: `Version : ${config.version}`, iconURL: bot.user.displayAvatarURL()})

   
    if(!args[0]) {
        message.channel.send({embeds: [embed]})
    }else if(args[0] == "mp") {
        message.author.send({ embeds: [embed] }).then(msg => {
            return embed_f.embedMaker(Discord, message, '#00FFFF', "Je vous ai envoyer la page d'aide en MP")
        }).catch(e => {
            return message.channel.send(funcs.encadrer("Une erreur est survenue, merci de contacter le créateur du bot : </ZedRoff>#6268"))
        })
    }
    
    }
exports.infos = {
    name: "help",
    description:"Page d'aide des commandes du bot",
    alias: ["h"],
    usage: "[prefix]help (choix : mp)"
}

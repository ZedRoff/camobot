const Discord = require("discord.js")
const funcs = require("../utils/md.js")
const config = require("../utils/config.json")
exports.command = (bot, message,args) => {

    let general = ["test", "help"]
    let fun = ["roll"]
    let embed = new Discord.MessageEmbed()
    .setColor("#7F56FF")
    .setTitle("Commande d'aide du bot")
    .setDescription("Si vous souhaitez avoir plus d'informations sur une commande spécifique, merci d'utiliser la commande `info`")
    .addFields(
        {name: "Commandes Générales", value: funcs.encadrer(general.join(" | "))},
        {name: "Commandes Fun", value: funcs.encadrer(fun.join(" | "))}
    )
    .setFooter({text: `Version : ${config.version}`, iconURL: bot.user.displayAvatarURL()})

    message.channel.send({embeds: [embed]})
    }
exports.infos = {
    name: "help",
    description:"Page d'aide des commandes du bot",
    aliases: ["h"],
    usage: "[prefix]help"
}

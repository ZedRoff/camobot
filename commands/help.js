const Discord = require("discord.js")
const funcs = require("../utils/md.js")
const config = require("../utils/config.json")
exports.command = (bot, message,args) => {

    let general = ["test", "help"]
    let embed = new Discord.MessageEmbed()
    .setColor("#7F56FF")
    .setTitle("Commande d'aide du bot")
    .setDescription("Si vous souhaitez avoir plus d'informations sur une commande spécifique, merci d'utiliser la commande `info`")
    .addFields({
        name: "Commandes générales", value: funcs.encadrer(general.join(" | "))
    })
    .setFooter(`Version : ${config.version}`)

    message.channel.send({embeds: [embed]})
    }
exports.infos = {
    name: "help",
    description:"Page d'aide des commandes du bot",
    aliases: ["h"]
}

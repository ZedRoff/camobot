const Discord = require("discord.js")
const fs = require("fs")
const config = require("../private/config.json")
const moment = require("moment")
require("moment-duration-format")
exports.command = async (bot, interaction, options) => {
    let tab = []
   fs.readdir("./commands/", (err, files) => {
        files.forEach(f => {
            tab.push(f)
       
        })

        let embed = new Discord.MessageEmbed()
    .setColor("AQUA")
    .setTitle("Informations relatives au bot")
    .addFields(
        {name: "Nom", value: bot.user.username},
        {name: "Commandes", value: (tab.length).toString()},
        {name: "Serveurs", value: (bot.guilds.cache.size).toString()},
        {name: "Développeur", value: "</ZedRoff>#6268"},
        {name: "Version", value: config.version},
        {name: "Latence", value: (Date.now() - interaction.createdTimestamp).toString()+"ms"},
        {name: "Uptime", value: (moment.duration(bot.uptime).format(" D [Jours], H [Heures], m [Minutes], s [Secondes]")).toString()})
        .setFooter({text: "Merci d'utiliser ce bot"})

        interaction.reply({ embeds: [embed]})
    })
 
    
    
}

exports.infos = {
    name: "botinfo",
    description: "Affiche des informations relatives au bot",
    alias: ["bi"],
    usage: "[prefix]botinfo"
}
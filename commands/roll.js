const Discord = require("discord.js")
const funcs = require("../utils/errors")
exports.command = (bot, message, args) => {
    let num;
    let nums = "abcdefghijklmnopqrstuvwxyz"
    if(!args[0]) num = 100
    else if(args[0] < 0) return funcs.negativeInteger(Discord, message)
    else if(nums.includes(args[0].toLowerCase())) return funcs.wrongEntry(Discord, message, "Seulement les nombres entiers sont autorisés dans cette commande")
    else num = args[0]

    let generated = Math.round(Math.random() * num)

    let embed = new Discord.MessageEmbed()
    .setTitle("Commande roll")
    .setDescription(`Le bot a choisit le nombre ${generated} !`)

    message.channel.send({ embeds: [embed]})
}
exports.infos = {
    name: "roll",
    description: "Choisit un nombre au hasard de 0 à n (n étant le nombre que vous avez rentrer)",
    alias: [],
    usage: "[prefix]roll (num)"
}

const emb = require("../utils/embed")
const Discord = require("discord.js")
exports.command = (bot, message, args) => {
    const date = new Date();
    return emb.embedMaker(Discord, message, '#00FFFF', `Nous sommes le ${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()}\nEt il est ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    // TODO : add zeros before one digit numbers
}
exports.infos = {
    alias: [],
    name: "date",
    description: "Donne la date d'aujourd'hui",
    usage: "[prefix]date"
}

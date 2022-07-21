const Discord = require("discord.js")
const md = require("../utils/md")
const funcs = require("../utils/errors")
let emb = require("../utils/embed")

exports.command = async (bot, message, args) => {

    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]rename [ID utilisateur (si deuxième argument, sinon seulement ID utilisateur pour vous rename rapidement)] [nouveau nom]")
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .addFields({name: "Le pseudo a été changé", value: "Avec succès"})
       
    if(args[1]) {
        if(!message.member.permissions.has("MANAGE_NICKNAMES")) return funcs.missingPerms(Discord, message, "MANAGE_NICKNAMES")
        message.guild.members.cache.get(args[0]).setNickname(args.slice(1).join(" ")).then(_m => {
            message.channel.send({embeds: [embed]})
        }).catch(e => {
            return emb.embedMaker(Discord, message, "#FF0000", "Je ne peux pas rename cet utilisateur")
        })
    }else {
        message.member.setNickname(args.join(" ")).then(_m => {
            message.channel.send({embeds: [embed]})
        }).catch(e => {
            return emb.embedMaker(Discord, message, "#FF0000", "Je ne peux pas te rename")
        })
    }


 }
exports.infos = {
    name: "rename",
    description: "Renomme un utilisateur",
    alias: [],
    usage: "[prefix]rename [ID utilisateur (si deuxième argument, sinon seulement ID utilisateur pour vous rename rapidement)] [nouveau nom]"
}


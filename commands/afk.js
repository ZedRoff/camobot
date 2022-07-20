const Discord = require("discord.js")
const mongoose = require("mongoose")
const model = require("../models/afk")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]afk [on|off] [raison si (oui)] (mode manquant)")
    let mode = args[0]
    function emb_make(r) {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Afk commande")
        .addFields({name: "Vous êtes désormais en afk pour la raison : ", value: r})
        return message.channel.send({embeds: [embed]})
    }
    
    if(mode == "on") {
        if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]afk [on|off] [raison si (oui)] (raison manquante)")
        let reason = args.slice(1).join(" ")
        model.findOne({user_id: message.author.id}, (err, doc) => {
            if(!doc) {
                const new_model = new model({
                    user_id: message.author.id,
                    reason
                })
                new_model.save().then(_m => {
                    
                 return emb_make(reason)
                })
            }else {
                if(doc.reason.length > 0) return emb.embedMaker(Discord, message, '#FF0000', "Tu es déjà afk")
                doc.reason = reason 
                doc.save().then(_m => {
                    return emb_make(reason)
                })
            }
        })
    }else if(mode == "off") {
        model.findOne({user_id: message.author.id}, (err, doc) => {
            if(!doc) return emb.embedMaker(Discord, message, '#FF0000', "Tu n'es pas afk")
            if(doc.reason.length == 0) return emb.embedMaker(Discord, message, '#FF0000', "Tu n'es pas afk")
            doc.reason = ""
            doc.save().then(_m => {
                return emb.embedMaker(Discord, message, '#00FF00', ":white_check_mark: Tu n'es plus afk")
            })
        })
    } else {
        return emb.embedMaker(Discord, message, '#FF0000', "Les seuls modes supportés sont : `on|off`")
    }
  

}
exports.infos = {
    name: "afk",
    description: "Permet de vous rendre afk dans un salon textuel (si une personne vous mentionne, elle saura si vous êtes afk ou non ainsi que la raison du afk (assez utile not gonna lie)).",
    usage: "[prefix]afk [on|off] [raison si (oui)]",
    alias: []
}

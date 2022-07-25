const Discord = require("discord.js")
const mongoose = require("mongoose")
const model = require("../models/afk")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
exports.command = (bot, interaction, options) => {
   let mode = options.getString("mode")
    function emb_make(r) {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Afk commande")
        .addFields({name: "Vous êtes désormais en afk pour la raison : ", value: r})
        return interaction.reply({embeds: [embed]})
    }
    
    if(mode == "on") {
        let reason =  options.getString("raison")
       
        model.findOne({user_id: interaction.member.user.id}, (err, doc) => {
            if(!doc) {
                const new_model = new model({
                    user_id: interaction.member.user.id,
                    reason
                })
                new_model.save().then(_m => {
                    
                emb_make(reason)
                })
            }else {
                console.log(doc.reason)
                if(doc.reason.length > 0) return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Tu es déjà afk")]})
                doc.reason = reason 
                doc.save().then(_m => {
                    emb_make(reason)
                })
            }
        })
    }else if(mode == "off") {
        model.findOne({user_id: interaction.member.user.id}, (err, doc) => {
            if(!doc) return interaction.reply({embeds: [emb.embedMaker( '#FF0000', "Tu n'es pas afk")]})
            if(doc.reason.length == 0) return interaction.reply({embeds: [emb.embedMaker( '#FF0000', "Tu n'es pas afk")]})
            doc.reason = ""
            doc.save().then(_m => {
                return interaction.reply({embeds: [emb.embedMaker('#00FF00', ":white_check_mark: Tu n'es plus afk")]})
            })
        })
    } else {
        return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Les seuls modes supportés sont : `on|off`")]})
    }
  

}
exports.infos = {
    name: "afk",
    description: "Permet de vous rendre afk dans un serveur.",
    usage: "[prefix]afk [on|off] [raison si (oui)]",
    alias: [],
    options: [{
        name: "mode",
        description: "Mode supportés : on|off. on = vous êtes afk, off = vous n'êtes plus afk",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    },{
        name: "raison",
        description: "Entrez une raison si vous avez mit le mode on",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
const Discord = require("discord.js")
const mongoose = require("mongoose")
const model = require("../models/account")
const emb = require("../utils/embed")

exports.command = (bot, interaction, options) => {
 
    model.deleteOne({user_id: interaction.member.user.id}, (err, doc) => {
       if(err) return interaction.reply({content: "Une erreur est survenue, merci de contacter le créateur du bot </ZedRoff>#6268"})
        if(doc.deletedCount !== 1) {
            return interaction.reply({embeds: [emb.embedMaker(Discord, message, '#FF0000', "Tu n'as pas de compte")]})
        }else {
          
           
                const embed = new Discord.MessageEmbed()
                .setColor("#00FF00")
                .setTitle("Compte supprimé avec succès")
                

                return interaction.reply({ embeds: [embed] })
        
        }
  
    })
}
exports.infos = {
    name: "unregister",
    description: "Permet d'enlever votre compte du bot",
    usage: "[prefix]unregister",
    alias: []
}
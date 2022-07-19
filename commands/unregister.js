const Discord = require("discord.js")
const mongoose = require("mongoose")
const model = require("../models/account")
const emb = require("../utils/embed")

exports.command = (bot, message, args) => {
 
    model.deleteOne({user_id: message.author.id}, (err, doc) => {
       
        if(doc.deletedCount !== 1) {
            emb.embedMaker(Discord, message, '#FF0000', "Tu n'as pas de compte")
        }else {
          
           
                const embed = new Discord.MessageEmbed()
                .setColor("#00FF00")
                .setTitle("Compte supprimé avec succès")
                

                message.channel.send({ embeds: [embed] })
        
        }
    })

}
exports.infos = {
    name: "unregister",
    description: "Permet d'enlever votre compte du bot",
    usage: "[prefix]unregister",
    alias: []
}

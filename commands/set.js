const Discord = require("discord.js")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const mongoose = require("mongoose")
const model = require("../models/account")

exports.command = (bot, interaction, options) => {
    let stat = options.getString("stat")
    let value = options.getString("valeur")
model.findOne({user_id: interaction.member.user.id}, (err, doc) => {
    if(!doc) return interaction.reply({embeds: [funcs.embedMaker('#FF0000', "Tu n'as pas de compte a ton actif")]})



   switch(stat) {
        case "anniversaire": {
           
            let date = value.split("")
            
            let cpt = 0;
            let cpt2 = 0;
            
            date.map(letter => {
                if(letter == "/") {
                    cpt++
                }else
                if(isNaN(parseInt(letter))) {
                    cpt2++
                }
                
            })
         
            if(cpt !== 2 || cpt2 !== 0) return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Le format de la date doit être : JJ/MM/AAAA")]})
            doc.user_birth_date = value
            doc.save().then(_m => {
                return interaction.reply({embeds: [emb.embedMaker('#00FFFF', `Ta date d'anniversaire a été changée sur ${value}`)]})
            })
        }
        break;
        
        case "couleur": {
            
            if(value[0] !== "#" || value.length !== 7) return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Le format de la couleur doit être : #ABCDEF (le hex factorisé n'est pas supporté pour l'instant)")]}) // TODO : check for #fff case here.
            
            doc.user_color = value
            doc.save().then(_m => {
                return interaction.reply({embeds: [emb.embedMaker('#00FFFF', `Ta couleur a été changée sur ${value}`)]})
            })
         
        }
        break;
        case "fond": {
            return interaction.reply("En cours de développement")
        }
        break;
        case "description": {
            doc.user_description = value
            doc.save().then(_m => {
                return interaction.reply({embeds: [emb.embedMaker('#00FFFF', `Ta description a été changée sur ${value}`)]})
            })
        }
        break;
        default: {
            return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Ce type n'existe pas, les seuls types acceptés sont : `anniversaire | couleur | fond | description`")]})
        }
    }
})
    
} 
exports.infos = {
    name: "set",
    description: "Permet de changer les informations de votre compte",
    usage: "[prefix]set [stat] [valeur]",
    alias: [],
    options: [{
        name: "stat",
        description: "La stat que vous voulez changer",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    },{
        name: "valeur",
        description: "La valeur par laquelle que vous voulez la changerr",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
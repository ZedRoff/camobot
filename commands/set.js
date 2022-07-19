const Discord = require("discord.js")
const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const mongoose = require("mongoose")
const model = require("../models/account")

exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]set [stat] [valeur]")
    let stat = args[0]
model.findOne({user_id: message.author.id}, (err, doc) => {
    if(!doc) return emb.embedMaker(Discord, message, '#FF0000', "Tu n'as pas de compte a ton actif")



    /*   user_id: String,
    user_name: String,
    user_rep: Number,
    user_badge: Array,
    user_cmd_count: Number,
    user_description: String,
    user_bg: String,
    user_color: String,
    user_birth_date: String

    */
   switch(stat) {
        case "anniversaire": {
            if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]set anniversaire [valeur]")
    
            let date = args[1].split("")
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
            console.log(cpt2)
            if(cpt !== 2 || args[2] || cpt2 !== 0) return emb.embedMaker(Discord, message, '#FF0000', "Le format de la date doit être : JJ/MM/AAAA")
            doc.user_birth_date = args[1]
            doc.save().then(_m => {
                return emb.embedMaker(Discord, message, '#00FFFF', `Ta date d'anniversaire a été changée sur ${args[1]}`)
            })
        }
        break;
        
        case "couleur": {
            if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]set couleur [valeur]")
            
            if(args[1][0] !== "#" || args[1].length !== 7) return emb.embedMaker(Discord, message, '#FF0000', "Le format de la couleur doit être : #ABCDEF (le hex factorisé n'est pas supporté pour l'instant)") // TODO : check for #fff case here.
            
            doc.user_color = args[1]
            doc.save().then(_m => {
                return emb.embedMaker(Discord, message, '#00FFFF', `Ta couleur a été changée sur ${args[1]}`)
            })
         
        }
        break;
        case "fond": {
            if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]set fond [valeur]")
            return message.channel.send("En cours de développement")
        }
        break;
        case "description": {
            if(!args[1]) return funcs.errorArgs(Discord, message, "[prefix]set description [valeur]")
            doc.user_description = args.slice(1).join(" ")
            doc.save().then(_m => {
                return emb.embedMaker(Discord, message, '#00FFFF', `Ta description a été changée sur ${args.slice(1).join(" ")}`)
            })
        }
        break;
        default: {
            return emb.embedMaker(Discord, message, '#FF0000', "Ce type n'existe pas, les seuls types acceptés sont : `anniversaire | couleur | fond | description`")
        }
    }
})
    
} 
exports.infos = {
    name: "set",
    description: "Permet de changer les informations de votre compte",
    usage: "[prefix]set [stat] [valeur]",
    alias: []
}

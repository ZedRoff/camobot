const Discord = require("discord.js")
const funcs = require("../utils/errors")
const model_macro = require("../models/macro")
const embed_f = require("../utils/embed")
const md = require("../utils/md")
exports.command = (bot, message, args) => {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return funcs.missingPerms(Discord, message, "MANAGE_MESSAGES")
    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]macro help (l'argument est manquant)")
    
    let cmd = args[0]
    switch(cmd) {
        case "help": {
            let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle("Commande d'aide de la commande macro")
            .setDescription("Voici la liste des arguments que peut prendre cette commande")
            .addFields(
                {name: "macro help", value: "Affiche cette page"},
                {name: "macro create [nom] [type (normal|embed)] [texte]", value: "Permet de crée une macro"},
                {name: "macro delete [nom]", value: "Supprime la macro"},
                {name: "macro liste", value: "Affiche la liste des macros présentes sur le serveur"},
                {name: "macro affiche [votre_macro]", value: "Affiche votre macro"}
            )
        message.channel.send({ embeds: [embed]})
        }
        break;
case "liste": {
    model_macro.find({ identifier: "milleka" }, (err, doc) => {
        if(doc.length == 0) return embed_f.embedMaker(Discord, message, '#FF0000', "Il n'y a aucune macro sur ce serveur")
        if(!doc) return message.reply("Merci de contacter le créateur du bot, votre serveur n'est pas enregistré comme abilité à utiliser les macros")
       
        let embed = new Discord.MessageEmbed()

        doc.map(macro => {
            embed.addFields({name: macro.name_macro, value: macro.text_macro})
        })

        message.channel.send({ embeds: [embed] })
    })
}
break;

case "create": {
    if(!args[1]) return funcs.errorArgs(Discord, message, "Il manque le nom de la macro")
    let banned_words = ["help", "create", "delete", "liste"]
    if(banned_words.includes(args[1])) return embed_f.embedMaker(Discord, message, '#FF0000', "Bien essayé, mais non ces mots sont réservés évidemment -)")
  
    if(!args[2]) return funcs.errorArgs(Discord, message, "Il manque le type de la macro (normal et embed supportés uniquement)")
    let supported_types = ["embed", "normal"]
    if(!supported_types.includes(args[2])) return funcs.errorArgs(Discord, message, "Le typage n'est pas bon, (normal et embed supportés uniquement)")
   
    if(!args[3]) return funcs.errorArgs(Discord, message, "Il manque le texte de la macro")
    model_macro.findOne({name_macro: args[1], identifier: "milleka"}, (err, doc) => {
        
        if(doc) return embed_f.embedMaker(Discord, message, '#FF0000', "Cette macro existe déjà merci d'essayer un autre nom de macro")
        
        const new_model = model_macro({
            name_macro: args[1],
            type_macro: args[2],
            text_macro: args.slice(3).join(" "),
            identifier: "milleka"
        })
        new_model.save()
        let embed = new Discord.MessageEmbed()
        .setColor("NAVY")
        .setDescription(`La macro ${args[1]} a été crée, gg à toi lmao. Tu peux tapper ${md.encadrer('macro [nom de ta macro]')}`)

        message.channel.send({ embeds: [embed] })
    })
}
break;
case "delete": {
    if(!args[1]) return funcs.errorArgs(Discord, message, "Il manque le nom de la macro")
    model_macro.findOne({identifier: "milleka", name_macro: args[1]}, (err, doc) => {
        if(!doc) return embed_f.embedMaker(Discord, message, '#FF0000', "Cette macro n'existe pas")
          // IMPORTANT : in case of backup / troll, I send them to me directly
          bot.users.cache.get('327074335238127616').send(doc.text_macro)
       
        doc.delete()
       return embed_f.embedMaker(Discord, message, 'AQUA', "Cette macro a été supprimée avec succès")
    })
}
break;

case "affiche": {


model_macro.find({identifier: "milleka"}, (err, doc) => {
    if(!doc) return message.reply("Merci de contacter le créateur du bot, votre serveur n'est pas enregistré comme abilité à utiliser les macros")
      
    if(!args[1]) return funcs.errorArgs(Discord, message, "Il manque le nom de la macro")
 
        let considered_macro = doc.filter(macro => macro.name_macro == args[1])
        if(considered_macro.length == 0) {
            message.delete()
            message.author.send("Cette macro n'existe pas").catch(e => {
                message.channel.send("Vos mp sont bloqués, juste pour vous informer que cette macro n'existe pas").then(msg => {
                  setTimeout(() => {
                    msg.delete()
                  }, 5000)
                })
            })
        }else {
            let macro = considered_macro[0]
            if(macro.type_macro == "embed") {
                let embed = new Discord.MessageEmbed()
                .setColor("AQUA")
                .setDescription(macro.text_macro) 

                message.channel.send({ embeds: [embed] })
            }else {
                message.channel.send("```"+macro.text_macro+"```")
            }
         
        }
      
    })
}
break;
    
default: {
    return embed_f.embedMaker(Discord, message, '#FF0000', "Ce mode n'existe pas, essayez la commande `macro help`")
}

}
   
  
}

exports.infos = {
    name: "macro",
    description: "Les macros sont les commandes personnalisées que vous pouvez crée vous même. (seulement les modérateurs peuvent en crée)",
    usage: "[prefix]macro help (pour avoir de l'aide sur la commande",
    alias: []
}

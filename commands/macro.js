const Discord = require("discord.js")
const funcs = require("../utils/errors")
const model_macro = require("../models/macro")
const embed_f = require("../utils/embed")
const md = require("../utils/md")
exports.command = (bot, interaction, options) => {
    
    let cmd = options.getString("commande")
    let name = options.getString("nom")
    let type = options.getString("type")
    let content = options.getString("contenu")
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
            return interaction.reply({ embeds: [embed]})
        }
        break;
case "liste": {
    model_macro.find({ identifier: "milleka" }, (err, doc) => {
        if(doc.length == 0) return interaction.reply({embeds: [embed_f.embedMaker( '#FF0000', "Il n'y a aucune macro sur ce serveur")]})
        if(!doc) return interaction.reply("Merci de contacter le créateur du bot, votre serveur n'est pas enregistré comme abilité à utiliser les macros")
       
        let embed = new Discord.MessageEmbed()

        doc.map(macro => {
            embed.addFields({name: macro.name_macro, value: macro.text_macro})
        })

        interaction.reply({ embeds: [embed] })
    })
}
break;

case "create": {
    if(!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({embeds: [funcs.missingPerms("MANAGE_MESSAGES")]})
   
    let banned_words = ["help", "create", "delete", "liste"]
    if(banned_words.includes(name)) return interaction.reply({embeds: [embed_f.embedMaker('#FF0000', "Bien essayé, mais non ces mots sont réservés évidemment -)")]})
  if(!name) return interaction.reply({embeds: [funcs.errorArgs("Le nom de la macro est manquant")]})
    if(!type) return interaction.reply({embeds: [funcs.errorArgs("Il manque le type de la macro (normal et embed supportés uniquement)")]})
    let supported_types = ["embed", "normal"]
    if(!supported_types.includes(type)) return interaction.reply({embeds: [funcs.errorArgs("Le typage n'est pas bon, (normal et embed supportés uniquement)")]})
   
    if(!content) return interaction.reply({embeds: [funcs.errorArgs("Il manque le texte de la macro")]})
    model_macro.findOne({name_macro: name, identifier: "milleka"}, (err, doc) => {
        
        if(doc) return interaction.reply({embeds: [embed_f.embedMaker('#FF0000', "Cette macro existe déjà merci d'essayer un autre nom de macro")]})
        
        const new_model = model_macro({
            name_macro: name,
            type_macro: type,
            text_macro: content,
            identifier: "milleka"
        })
        new_model.save()
        let embed = new Discord.MessageEmbed()
        .setColor("NAVY")
        .setDescription(`La macro ${name} a été crée, gg à toi lmao. Tu peux tapper ${md.encadrer('macro [nom de ta macro]')}`)

        interaction.reply({ embeds: [embed] })
    })
}
break;
case "delete": {
    if(!interaction.member.permissions.has("MANAGE_MESSAGES")) interaction.reply({embeds: [funcs.missingPerms("MANAGE_MESSAGES")]})
    if(!name) return interaction.reply({embeds: [funcs.errorArgs("Le nom de la macro est manquant")]})
    model_macro.findOne({identifier: "milleka", name_macro: name}, (err, doc) => {
        if(!doc) return interaction.reply({embeds: [embed_f.embedMaker('#FF0000', "Cette macro n'existe pas")]})
          // IMPORTANT : in case of backup / troll, I send them to me directly
          bot.users.cache.get('327074335238127616').send(doc.text_macro)
       
        doc.delete()
       return interaction.reply({embeds: [embed_f.embedMaker('AQUA', "Cette macro a été supprimée avec succès")]})
    })
}
break;

case "affiche": {


model_macro.find({identifier: "milleka"}, (err, doc) => {
    if(!doc) return interaction.reply("Merci de contacter le créateur du bot, votre serveur n'est pas enregistré comme abilité à utiliser les macros")
      
    if(!name) return interaction.reply({embeds: [funcs.errorArgs("Le nom de la macro est manquant")]})
        let considered_macro = doc.filter(macro => macro.name_macro == name)
        if(considered_macro.length == 0) {
            
            interaction.member.send("Cette macro n'existe pas").catch(e => {
                interaction.reply("Vos mp sont bloqués, juste pour vous informer que cette macro n'existe pas").then(msg => {
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

                interaction.reply({ embeds: [embed] })
            }else {
                interaction.reply("```"+macro.text_macro+"```")
            }
         
        }
      
    })
}
break;
    
default: {
    return interaction.reply({embeds: [embed_f.embedMaker( '#FF0000', "Ce mode n'existe pas, essayez la commande `macro help`")]})
}

}
   
  
}

exports.infos = {
    name: "macro",
    description: "Les macros sont les commandes personnalisées que vous pouvez crée vous même. ",
    usage: "[prefix]macro help (pour avoir de l'aide sur la commande",
    alias: [],
    options: [
        {
            name: "commande",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            description: "Commandes supportées : affiche | liste | create | delete | help"
        },
        {
            name: "nom",
            required: false,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            description: "Valeur que vous voulez insérer (util qu'en create|delete|affiche)"
        },
        {
            name: "type",
            required: false,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            description: "Types supportés : normal|embed (utile qu'en create)"
        },
        {
            name: "contenu",
            required: false,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
            description: "Contenu (utile qu'en create)"
        }
    ]
}
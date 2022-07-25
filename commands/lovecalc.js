const Discord = require("discord.js")
const embed = require("../utils/embed")
const funcs = require("../utils/errors.js")
exports.command = (bot, interaction, options) => {
    let stat_love;
    let user = options.getUser("utilisateur")
   
    if(user.id == message.author.id) return interaction.reply({embeds: [embed.embedMaker('#FF0000', "Tu ne peux pas t'aimer, c'est bizarre o_0)")]}) // revoir ce texte
    
        stat_love = Math.round(Math.random() * 100)
    
        let message_love = ""
        if(stat_love >= 85) message_love = "Un amour est envisageable <3"
        else if(stat_love < 85 && stat_love >= 50) message_love = "Ouais cool à vous de voir en vrai"
        else if(stat_love < 50 && stat_love >= 25) message_love = "Bof quoi, on est des milliards sur Terre, allez voir ailleurs -)"
        else message_love = "Bon, je pense que les chiffres parlent d'eux-mêmes, je vais pas enfoncer le couteau dans la plaie, bon toujours mieux qu'une friendzone, nan ?"


        const smth = (concerned1, concerned2) => {
            let embed = new Discord.MessageEmbed()
            .setColor("DARK_VIVID_PINK")
            .setTitle(`Pourcentage d'amour entre ${concerned1} & ${concerned2}`)
            .setDescription(`Il y a ${stat_love}% d'amour qui règne entre vous`)
            .addFields({name: "Mon conseil (rp Tinder)", value: message_love})
    
           interaction.reply({ embeds: [embed]})
        }
        if(args[1]) {
            let user2 = options.getUser("utilisateur2")
             if(user.id == user2.id) return interaction.reply({embeds: [embed.embedMaker('#FF0000', "Alors bon, ne forçons pas les gens a s'aimer eux-même, faites ça entre vous")]})
            if(!user2) return interaction.reply({embeds: [embed.embedMaker( '#FF0000', "L'utilisateur 2 n'a pas été trouvé")]})

           smth(user.username, user2.username)
    
        }else {
           smth(message.author.username, user.username)
        }
      
}
exports.infos = {
    name: "lovecalc",
    description: "Calcul le pourcentage d'amour entre deux utilisateurs",
    alias: ["lc"],
    usage: "[prefix]lovecalc [utilisateur (ID uniquement)] (utilisateur2 si envie)",
    options: [{
        name: "utilisateur",
        description: "L'utilisateur avec lequel vous voulez tester votre lovecalc",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER
    },{
        name: "utilisateur2",
        description: "L'utilisateur 2 avec lequel vous voulez comparez le lovecalc avec une autre personne",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER
    }]
}
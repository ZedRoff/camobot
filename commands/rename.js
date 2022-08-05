const Discord = require("discord.js")
const md = require("../utils/md")
const funcs = require("../utils/errors")
let emb = require("../utils/embed")

exports.command = async (bot, interaction, options) => {
    let user = options.getUser("utilisateur")

    user = interaction.member.guild.members.cache.get(user.id)
    let new_name = options.getString("nouveau_nom")
    let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .addFields({name: "Le pseudo a été changé", value: "Avec succès"})
       

        if(!interaction.member.permissions.has("MANAGE_NICKNAMES")) return interaction.reply({ embeds: [funcs.missingPerms("MANAGE_NICKNAMES")]})
        user.setNickname(new_name).then(_m => {
           interaction.reply({embeds: [embed]})
        }).catch(e => {
            return interaction.reply({embeds: [emb.embedMaker( "#FF0000", "Je ne peux pas rename cet utilisateur")]})
        })
   


 }
exports.infos = {
    name: "rename",
    description: "Renomme un utilisateur",
    alias: [],
    usage: "[prefix]rename [utilisateur] [nouveau nom]",
    options: [
        {
            name: "utilisateur",
            description: "L'utilisateur que vous souhaitez rename",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.USER
       
        },
        {
            name: "nouveau_nom",
            description: "Le nouveau nom que vous voulez assigner a l'utilisateur",
            required: true,
            type: Discord.Constants.ApplicationCommandOptionTypes.STRING
        }
    ]
}


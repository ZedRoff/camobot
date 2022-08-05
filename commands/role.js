const Discord = require("discord.js")
const funcs = require("../utils/md")
const errors = require("../utils/errors")
let emb = require("../utils/embed")
exports.command = async (bot, interaction, options) => {
   
    if(!interaction.member.permissions.has('MANAGE_ROLES')) return errors.missingPerms("MANAGE_ROLES")
   let mode = options.getString("type")
    let user = options.getUser("utilisateur")
    let role_c = options.getRole("role")
    let role_name = options.getString("role_nom")
   if(mode == "help") {
    let embed = new Discord.MessageEmbed()
    .setColor("AQUA")
    .setDescription("Voici les modes supportés par la commande role :")
    .addFields(
        {name: "add [role] [utilisateur]", value: "Ajouter un rôle a un membre"},
        {name: "remove [role] [utilisateur]", value: "Enleve un rôle a un utilisateur"},
        {name: "Futurs modes", value: "Create, delete et modify"}
        // TODO : Do the last thing that is written on the last field
    )
    return interaction.reply({ embeds: [embed] })

   }else if(mode == "add") {
    if(!user) return interaction.reply({embeds: [emb.embedMaker("#FF0000", "L'utilisateur est manquant")]})
  let member = interaction.member.guild.members.cache.get(user.id)
   if(!role_c) return interaction.reply({embeds: [emb.embedMaker("#FF0000", "Le rôle est manquant")]})
    let role = interaction.member.guild.roles.cache.find(c => c.id == role_c.id)

    if(!role) return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Le rôle n'a pas été trouvé")]})
    if(member.roles.cache.some(r => r.name == role.name)) return interaction.reply({embeds: [ emb.embedMaker('#FF0000', "Cet utilisateur possède déjà ce rôle")]})
   await member.roles.add(role).then(m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle ajouté avec succès")
        .setDescription(`${member.user.username} est désormais en possession du rôle ${role.name}`)


        interaction.reply({ embeds: [embed] })
    }).catch(e => {
        return  interaction.reply({embeds: [emb.embedMaker('#FF0000', "Je ne peux pas ajouter de rôle a cet utilisateur, il est certainement plus haut gradé que moi")]})
    })
    
   }else if(mode == "remove") {
    if(!user) return interaction.reply({embeds: [emb.embedMaker("#FF0000", "L'utilisateur est manquant")]})
    
    let member = interaction.member.guild.members.cache.get(user.id)
    if(!role_c) return interaction.reply({embeds: [emb.embedMaker("#FF0000", "Le rôle est manquant")]})
  
    let role = interaction.member.guild.roles.cache.find(c => c.id == role_c.id)

    if(!member.roles.cache.some(r => r.name == role.name)) return interaction.reply({embeds: [ emb.embedMaker('#FF0000', "Cet utilisateur ne possède pas ce rôle")]})
   await member.roles.remove(role).then(_m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle enlevé avec succès")
        .setDescription(`${member.user.username} n'a désormais plus le rôle ${role.name}`)


        interaction.reply({ embeds: [embed] })
    }).catch(e => {
        return  interaction.reply({embeds: [emb.embedMaker( '#FF0000', "Je ne peux pas ajouter de rôle a cet utilisateur, il est certainement plus haut gradé que moi")]})
    })
   }else if(mode == "create") {
    if(!role_name) return interaction.reply({embeds: [emb.embedMaker( '#FF0000', "Il manque le nom du rôle")]})
 
    let role = interaction.member.guild.roles.cache.find(c => c.name == role_name)
  
    if(role) return interaction.reply({embeds: [ emb.embedMaker('#FF0000', "Ce rôle existe déjà")]})
  
  
    interaction.member.guild.roles.create({name: role_name, reason: "ROLE CREATE COMMAND USED"}).then(_m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle crée avec succès")
        .setDescription(`Le rôle ${role_name} est désormais présent dans le serveur`)


        interaction.reply({ embeds: [embed] })
    }).catch(e => {
        return interaction.reply({embeds: [emb.embedMaker( '#FF0000', "Je ne peux pas crée ce rôle, surement par manque de permissions sur ce serveur")]})
    })
   }else if(mode == "delete") {
    if(!role_c) return interaction.reply({embeds: [emb.embedMaker( '#FF0000', "Il manque le nom du rôle")]})
 
    let role = interaction.member.guild.roles.cache.find(c => c.name == role_c.name)
    if(!role) return  interaction.reply({embeds: [emb.embedMaker('#FF0000', "Ce rôle n'existe pas")]})
  
 role.delete().then(_m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle supprimé avec succès")
        .setDescription(`Le rôle ${role_c.name} n'est désormais plus présent dans ce serveur`)


        interaction.reply({ embeds: [embed] })
    }).catch(e => {
        return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Je ne peux pas supprimé ce rôle, surement par manque de permissions sur ce serveur")]})
    })
   }else {
    return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Ce mode n'existe pas, les seuls modes supportés sont : `create|delete|add|remove`")]})
   }
 }
exports.infos = {
    name: "role",
    description: "Permet de manipuler des rôles assez aisement",
    alias: [],
    usage: "[prefix]role [add|remove|create|delete] [ID de l'utilisateur ou Nom du rôle si (create|delete)] [ID du rôle ou rien si (create|delete)]",
    options: [{
        name: "type",
        description: "Types supportés : add|remove|create|delete",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    },{
        name: "utilisateur",
        description: "L'utilisateur victime de l'action",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.USER
    },{
        name: "role",
        description: "Le rôle que vous voulez ajouter",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.ROLE
    },{
        name: "role_nom",
        description: "Le nom du rôle que vous souhaitez crée",
        required: false,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
}]
}

// TODO : end this command
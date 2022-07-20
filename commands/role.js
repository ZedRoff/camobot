const Discord = require("discord.js")
const funcs = require("../utils/md")
const errors = require("../utils/errors")
let emb = require("../utils/embed")
exports.command = async (bot, message, args) => {
    if(!args[0]) return errors.errorArgs(Discord, message, "[prefix]role help")
    if(!message.member.permissions.has('MANAGE_ROLES')) return errors.missingPerms(Discord, message, "MANAGE_ROLES")
   let mode = args[0]

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
    message.channel.send({ embeds: [embed] })

   }else if(mode == "add") {
  let member = message.guild.members.cache.get(args[1])
    if(!member) return emb.embedMaker(Discord, message, '#FF0000', "L'utilisateur n'a pas été trouver.")

    if(!args[1])  return errors.errorArgs(Discord, message, '[prefix]role [add] [ID utilisateur] [ID role]')
    let role = message.guild.roles.cache.find(c => c.id == args[2])

    if(!role) return emb.embedMaker(Discord, message, '#FF0000', "Le rôle n'a pas été trouvé")
    if(member.roles.cache.some(r => r.name == role.name)) return emb.embedMaker(Discord, message, '#FF0000', "Cet utilisateur possède déjà ce rôle")
   await member.roles.add(role).then(m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle ajouté avec succès")
        .setDescription(`${member.user.username} est désormais en possession du rôle ${role.name}`)


        message.channel.send({ embeds: [embed] })
    }).catch(e => {
        return emb.embedMaker(Discord, message, '#FF0000', "Je ne peux pas ajouter de rôle a cet utilisateur, il est certainement plus haut gradé que moi")
    })
    
   }else if(mode == "remove") {
    let member = message.guild.members.cache.get(args[1])
    if(!member) return emb.embedMaker(Discord, message, '#FF0000', "L'utilisateur n'a pas été trouver.")

    if(!args[1])  return errors.errorArgs(Discord, message, '[prefix]role [remove] [ID utilisateur] [ID role]')
    let role = message.guild.roles.cache.find(c => c.id == args[2])

    if(!role) return emb.embedMaker(Discord, message, '#FF0000', "Le rôle n'a pas été trouvé")
    if(!member.roles.cache.some(r => r.name == role.name)) return emb.embedMaker(Discord, message, '#FF0000', "Cet utilisateur ne possède pas ce rôle")
   await member.roles.remove(role).then(_m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle enlevé avec succès")
        .setDescription(`${member.user.username} n'a désormais plus le rôle ${role.name}`)


        message.channel.send({ embeds: [embed] })
    }).catch(e => {
        return emb.embedMaker(Discord, message, '#FF0000', "Je ne peux pas ajouter de rôle a cet utilisateur, il est certainement plus haut gradé que moi")
    })
   }else if(mode == "create") {
    if(!args[1])  return errors.errorArgs(Discord, message, '[prefix]role [create] [Nom du role]')
    let role = message.guild.roles.cache.find(c => c.name == args.slice(1).join(" "))
    if(role) return emb.embedMaker(Discord, message, '#FF0000', "Ce rôle existe déjà")
  
  
    message.guild.roles.create({name: args.slice(1).join(" "), reason: "ROLE CREATE COMMAND USED"}).then(_m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle crée avec succès")
        .setDescription(`Le rôle ${args.slice(1).join(" ")} est désormais présent dans le serveur`)


        message.channel.send({ embeds: [embed] })
    }).catch(e => {
        return emb.embedMaker(Discord, message, '#FF0000', "Je ne peux pas crée ce rôle, surement par manque de permissions sur ce serveur")
    })
   }else if(mode == "delete") {
    if(!args[1])  return errors.errorArgs(Discord, message, '[prefix]role [delete] [Nom du role]')
    let role = message.guild.roles.cache.find(c => c.name == args.slice(1).join(" "))
    if(!role) return emb.embedMaker(Discord, message, '#FF0000', "Ce rôle n'existe pas")
  
 role.delete().then(_m => {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FF00")
        .setTitle("Rôle supprimé avec succès")
        .setDescription(`Le rôle ${args.slice(1).join(" ")} n'est désormais plus présent dans ce serveur`)


        message.channel.send({ embeds: [embed] })
    }).catch(e => {
        return emb.embedMaker(Discord, message, '#FF0000', "Je ne peux pas supprimé ce rôle, surement par manque de permissions sur ce serveur")
    })
   }else {
    return emb.embedMaker(Discord, message, '#FF0000', "Ce mode n'existe pas, les seuls modes supportés sont : `create|delete|add|remove`")
   }
 }
exports.infos = {
    name: "role",
    description: "Permet de manipuler des rôles assez aisement",
    alias: [],
    usage: "[prefix]role [add|remove|create|delete] [ID de l'utilisateur ou Nom du rôle si (create|delete)] [ID du rôle ou rien si (create|delete)]"
}

// TODO : end this command

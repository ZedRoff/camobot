const Discord = require("discord.js");
const funcs = require("../utils/errors")
const embed = require("../utils/embed")
const model = require("../models/prefix")
const md = require("../utils/md")

exports.command = (bot, message, args) => {

    if(!message.member.permissions.has("MANAGE_MESSAGES")) return funcs.missingPerms(Discord, message, "MANAGE_MESSAGES")

    if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]setprefix [nouveau_prefix]")
    let new_prefix = args[0];
    let anc_prefix;

    if(new_prefix.length > 2) return embed.embedMaker(Discord, message, '#FF0000', "Vous ne pouvez pas entrer un préfixe d'une taille supérieur à 2.")
    
    model.findOne({guild_id: message.guild.id}, (err, doc) => {
        if(!doc) {
            // TODO : I think this part is kind of useless since the initialization is already done in index.js, but in order to avoid any kind of bugs I put it there anyway
            let n_prefix = new model({
                guild_id: message.guild.id,
                prefix: "²"
            })
            n_prefix.save()
            message.channel.send("**Initialization was done, please run this command again.**")
        }else {
            anc_prefix = doc.prefix
            doc.prefix = new_prefix;
            doc.save()

            let embed = new Discord.MessageEmbed()
            .setColor("AQUA")
            .setTitle("Commande pour changer le préfix du bot")
            .setDescription(`Le préfix est passer de ${md.encadrer(anc_prefix)} à ${md.encadrer(doc.prefix)}`)

            message.channel.send({ embeds: [embed] })
        }
    })
}
exports.infos = {
    name: "setprefix",
    alias: [],
    description: "Change le prefix du bot",
    usage: "[prefix]setprefix [nouveau_prefix]"
}

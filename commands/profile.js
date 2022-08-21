const Discord = require("discord.js")
const mongoose = require("mongoose")
const model = require("../models/account")
const emb = require("../utils/embed")
exports.command = (bot, interaction, options) => {

        model.findOne({user_id: interaction.user.id}, (err, doc) => {
            if(!doc) {
                return interaction.reply({ embeds: [emb.embedMaker('#FF0000', "Vous n'avez pas de compte à votre actif, merci d'executer la commande `register` pour vous en créez un.")]})
            }else {
                const embed = new Discord.MessageEmbed()
                .setColor(doc.user_color)
                .setTitle(`Profile de : ${doc.user_name}`)
                .setThumbnail(doc.user_bg)
                .addFields({
                    name: "Réputation", value: JSON.stringify(doc.user_rep)

                },
                {
                    name: "Date d'anniversaire", value: doc.user_birth_date
                },
                {
                    name: "Présentation", value: doc.user_description
                },
                {
                    name: "Badges", value: doc.user_badge.join(" | ")
                },{
                    name: "Argent", value: JSON.stringify(doc.user_money) + " " + "🍫"
                },
                {
                    name: "Items", value: doc.user_items.length == 0 ? "Pas d'items" : doc.user_items.join(" | ")
                })
                .setFooter({text: "Vous pouvez changez votre date d'anniversaire et votre présentation à l'aide de la commande `set`"})
interaction.reply({ embeds: [embed]})

            }
        })
}
exports.infos = {
    name: "profile",
    description: "Examiner votre profile sur le bot", 
    usage: "[prefix]profile",
    alias: ["acc"]
}
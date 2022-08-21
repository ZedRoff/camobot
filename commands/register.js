const Discord = require("discord.js")
const mongoose = require("mongoose")
const model = require("../models/account")
const emb = require("../utils/embed")

exports.command = (bot, interaction, options) => {

    model.findOne({user_id: interaction.member.user.id}, (err, doc) => {
        if(doc) {
            interaction.reply({embeds: [emb.embedMaker('#FF0000', "Tu es déjà enregistré dans la base de donnée, execute la commande `profile` pour examiner ton profile.")]})
        }else {
            const new_model = new model({
                guild_id: interaction.member.guild.id,
                user_id: interaction.member.user.id,
                user_name: interaction.member.user.username,
                user_rep: 0,
                user_badge: ["A crée son compte"],
                user_cmd_count: 1,
                user_description: "Aucune description",
                user_bg: 'https://cdn.glitch.global/5f373f55-ab8d-4671-80ea-c21805f80314/concours-discord-cartes-voeux-fortnite-france-6.png?v=1658253669032',
                user_color: 'RANDOM',
                user_birth_date: "Pas de date d'anniversaire de set" ,
                user_items: [],
                user_money: 0,
                user_xp: 0
            })
            new_model.save().then(msg => {
                const embed = new Discord.MessageEmbed()
                .setColor("#00FF00")
                .setTitle("Compte crée avec succès")
                .setDescription("Executez la commande `profile` pour découvrir ce dernier")

                interaction.reply({ embeds: [embed] })
            })
        }
    })

}
exports.infos = {
    name: "register",
    description: "Permet de vous enregistrez dans la base de donnée du bot",
    usage: "[prefix]register",
    alias: []
}
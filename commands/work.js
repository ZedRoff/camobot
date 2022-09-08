const Discord = require("discord.js")
let cd = new Set()
const emb = require("../utils/embed")
const model = require("../models/account")
exports.command = (bot, interaction, options) => {


    if(cd.has(interaction.member.id)) {
        return emb.embedMaker("#FF0000", "Vous ne pouvez pas travailler pour l'instant")
    }
    
    let jobs = ["animateu.r.se", "modérateu.r.se", "cassi.er.ère", "boulang.er.ère","gameu.r.se", "streameu.r.se"]
    let n = Math.floor(Math.random() * jobs.length)
    let selected_job = jobs[n]
    let money = n == 0 ? (n+1) * 10 : n * 10
    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Vous avez travaillé.e en tant que ${selected_job}`)
    .addFields({name: "Argent collectée :", value: JSON.stringify(money)})
    .setFooter({text: "Revenez dans 2 heures pour travailler à nouveau"})

    interaction.reply({embeds: [embed]}).then(_m => {
        model.findOne({user_id: interaction.member.id}, (err, doc) => {
            if(!doc) return message.reply("Vous n'avez pas de compte, executez la commande `register` pour vous en créez un")
            doc.user_money += money
            doc.save()
            console.log(cd)
        })
    })
    cd.add(interaction.member.id)
   
    setTimeout(() => {
        cd.delete(interaction.member.id)
  60 * 60 * 24 * 2 * 1000    })
}
exports.infos = {
    name: "work",
    description: "Travaillez pour gagner de l'argent",
    usage: "[prefix]work"
}
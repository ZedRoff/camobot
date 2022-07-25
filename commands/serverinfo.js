const Discord = require("discord.js");
const md = require("../utils/md")

exports.command = (bot, interaction, options) => {
    let humans = interaction.member.guild.members.cache.filter(member => !member.user.bot).size;
    let bots = interaction.member.guild.members.cache.filter(member => member.user.bot).size
    let embed = new Discord.MessageEmbed()
    .setColor("FUCHSIA")
    .setTitle("Informations relatives au serveur : " + md.encadrer(interaction.member.guild.name))
    .addFields(
        {name: "Créateur(rice) du serveur", value: "<@"+interaction.member.guild.ownerId+">"},
        {name: "ID du serveur", value: md.encadrer(interaction.member.guild.id)},
        {name: "AFK Channel", value: "<#"+interaction.member.guild.afkChannelId+">"},
        {name: "Membres", value: md.encadrer(`- Nombre de membres : ${humans+bots}.\n- Nombre d'humains : ${humans}.\n- Nombre de robots : ${bots}.`)}
    )

    return interaction.reply({embeds: [embed] })
}

exports.infos = {
    name: "serverinfo",
    description: "Donne des informations relatives au serveur dans lequel est lancée la commande",
    usage: "[prefix]serverinfo",
    alias: ["si"]
}
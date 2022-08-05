const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const Discord = require("discord.js")
const figlet = require('figlet');
const config = require("../utils/config.json")
exports.command = (bot, interaction, options) => {
    
    
    let texte = options.getString("texte")
    if(texte.length > 35) return funcs.wrongLength(35)
figlet(texte, function(err, data) {
    if (err) {
        interaction.reply({embeds: [emb.embedMaker('#FF0000', `Une erreur est survenue, merci de contacter le créateur du bot ${config.owner}`)]})
        console.dir(err);
        return;
    }
    interaction.reply({content: "```"+data+"```"})
});
}
exports.infos = {
    name: "ascii",
    description: "Converti votre texte en ascii",
    usage: "[prefix]ascii [texte]",
    alias: [],
    options: [{
        name: "texte",
        description: "Le texte que vous souhaitez convertir en ascii",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
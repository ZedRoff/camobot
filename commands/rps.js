const funcs = require("../utils/errors")
const Discord = require("discord.js")
exports.command = (bot, interaction, options) => {


let choices = ["pierre", "feuille", "ciseaux"];
let rnd = Math.floor(Math.random() * choices.length);
let botchoice = choices[rnd];


let userchoice = options.getString("outil")

function emb(u1, u2, win) {
    let embed = new Discord.MessageEmbed()
    .setColor("#FF5151")
    .addFields({
        name: "Choix de l'utilisateur", value: u1

    },
    {
        name: "Choix du bot", value: u2

    },
    {
        name: "Gagnant", value: win
    })
   
  return interaction.reply({embeds: [embed]});
}

let c = ["🗿 caillou", "📄 feuille", "✂️ ciseaux"]
if (userchoice == "pierre" && botchoice == "feuille") {
    emb(c[0], c[1], "Bot")

 
} else if (userchoice == "feuille" && botchoice == "pierre") {
    emb( c[1], c[0], "Utilisateur")

} else if (userchoice == "pierre" && botchoice == "ciseaux") {
    emb( c[0], c[2], "Utilisateur")
  
} else if (userchoice == "ciseaux" && botchoice == "pierre") {
    emb(c[2], c[0], "Bot")


} else if (userchoice == "ciseaux" && botchoice == "feuille") {
    emb(c[2], c[1], "Utilisateur")
} else if (userchoice == "feuille" && botchoice == "ciseaux") {
    emb(c[1], c[2], "Bot")
} else if (userchoice == "feuille" && botchoice == "feuille") {
    emb(c[1], c[1], "Bot")
} else if (userchoice == "ciseaux" && botchoice == "ciseaux") {
    emb(c[2], c[2], "Match nul")
} else if (userchoice == "pierre" && botchoice == "pierre") {
    emb(c[0], c[0], "Match nul")
} 
else {
    return interaction.reply({embeds: [funcs.errorArgs('rps [feuille | pierre | ciseaux]')]})
}

}
exports.infos = {
    name: "rps",
    help: "[prefix]rps [rock|paper|cisors]",
    description: "Play the rock paper cisors game with the bot",
    alias: [],
    options: [{
        name: "outil",
        description: "pierre|feuille|ciseaux",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
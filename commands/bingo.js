const Discord = require("discord.js")
const funcs = require("../utils/errors")
const embed = require("../utils/embed")

exports.command = (bot, interaction, options) => {
    
    
let n = options.getNumber("nombre")
if(n < 0) return interaction.reply({embeds: [funcs.negativeInteger()]})

const filter = m => m.author.id ==  interaction.member.user.id && m.author.id != bot.user.id;
const collector = interaction.channel.createMessageCollector({filter, time: 60000 });

let num = Math.round(Math.random() * n)

interaction.reply({embeds: [embed.embedMaker('#00FF00', "Le bingo a débuté, vous avez 1 minute pour trouver le bon nombre")]})

collector.on('collect', m => {
   
	let entry = m.content;
    
    if(entry < num) return m.channel.send({embeds: [embed.embedMaker('RANDOM', "Plus grand !")]})
    else if(isNaN(parseInt(entry))) return m.channel.send({embeds: [embed.embedMaker('RANDOM', "Seules les lettres sont autorisées")]})
    else if(entry > num) return m.channel.send({embeds: [embed.embedMaker('RANDOM', "Plus petit !")]})
    else if(entry == num) {collector.stop()
       }
       else return m.channel.send({embeds: [embed.embedMaker('RANDOM', "Requête inconnu, réessayer")]})
});

collector.on('end', collected => {

    // TODO : Maybe change win condition
  
    let tab = []
   collected.map(c => {
    if(c.content == num)  {
        tab.push(c.content)
    }
   })
  
   if(tab.length !== 0) return interaction.followUp({embeds: [embed.embedMaker('RANDOM', `Bien joué à toi ${interaction.member.user.username} ! Le nombre était ${num}. Tu as fais ${collected.size} essais.`)]})

        return interaction.followUp({embeds: [embed.embedMaker('#FF0000', `Dommage ${interaction.member.user.username} ! Le nombre était ${num}.`)]})
  });

}

exports.infos = {
    name: "bingo", 
    description: "Permet de jouer au jeu du plus et du moins",
    usage: "[prefix]bingo [num]",
    alias: [],
    options: [{
        name: "nombre",
        description: "Le nombre maximum que pourra atteindre le bingo (compris entre 0 et nombre)",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER
    }]
}
const Discord = require("discord.js")
const funcs = require("../utils/errors")
const embed = require("../utils/embed")

exports.command = (bot, message, args) => {
    
    

if(!args[0]) return funcs.errorArgs(Discord, message, "[prefix]bingo [num]")
if(isNaN(parseInt(args[0]))) return funcs.wrongEntry(Discord, message, "Seul les nombres entiers sont autorisés dans cette commande")

if(args[0] < 0) return funcs.negativeInteger(Discord, message)

const filter = m => m.author.id == message.author.id && m.author.id != bot.user.id;
const collector = message.channel.createMessageCollector({filter, time: 10000 });

let num = Math.round(Math.random() * parseInt(args[0]))

embed.embedMaker(Discord, message, '#00FF00', "Le bingo a débuté, vous avez 1 minute pour trouver le bon nombre")

collector.on('collect', m => {
   
	let entry = m.content;
    if(entry < num) return embed.embedMaker(Discord, message, 'RANDOM', "Plus grand !")
    else if(entry > num) embed.embedMaker(Discord, message, 'RANDOM', "Plus petit !")
    else {collector.stop()
        status = 1}
});

collector.on('end', collected => {

    // TODO : Maybe change win condition

    let tab = []
   collected.map(c => {
    if(c.content == num)  {
        tab.push(c.content)
    }
   })
  
   if(tab.length !== 0) return embed.embedMaker(Discord, message, 'RANDOM', `Bien joué à toi ${message.author.username} ! Le nombre était ${num}. Tu as fais ${collected.size} essais.`)

        return embed.embedMaker(Discord, message, '#FF0000', `Dommage ${message.author.username} ! Le nombre était ${num}.`)

      
  });

    
}

exports.infos = {
    name: "bingo", 
    description: "Permet de jouer au jeu du plus et du moins",
    usage: "[prefix]bingo [num]",
    alias: []
}

const Discord = require("discord.js")
const emb = require("../utils/embed")
const md = require("../utils/md")

exports.command = (bot, interaction, options) => {
    let words = ["fromage", "pain", "nourriture", "robot", "humain", "plateau", "faim", "soif", "congeler", "table", "tableau", "vaisseau", "sanguin", "tristesse", "entendre", "vendre", "peinture", "programmeur", "code", "programme", "surprise", "stupeur", "splendeur", "camille", "rigoler", "entendre", "voir", "savoir", "peindre", "coder", "croire", "acte", "puissance", "rater", "aller", "retour", "organiser", "esquiver", "atteindre", "acharner"]
    let chosen_word = words[Math.floor(Math.random() * words.length)].split("")
    let alpha = "abcdefghijklmnopqrstuvwxyz"
    let cur_res = [chosen_word[0]]
    for(let i=1;i<chosen_word.length;i++) {
        cur_res.push("_")
    }
    //TODO : find a better way to do this ^
    const filter = m => m.author.id == interaction.member.user.id && bot.user.id !== m.author.id;

    
    const collector = interaction.channel.createMessageCollector({ filter, time: 10000 });
let tries = 8;
let nb_essais = 0
    interaction.reply({embeds: [emb.embedMaker('#00FF00', "Ok, le pendu est lancé, tu as 2 minutes et 8 erreurs permises pour trouver le mot que le bot a choisit, c'est parti !"),emb.embedMaker('#00FF00', `Le board : ${md.encadrer(cur_res.join(" | "))}\n\nErreurs permises restantes : ${md.encadrer(tries)}.\n\n++`)]})

       
collector.on('collect', m => {
    if(m.content.includes('pendu')) {
        collector.stop()
    }
    if(m.content == chosen_word.join("")) {
        nb_essais++
        return collector.stop()
    }
   
    if(!alpha.includes(m.content)) return m.channel.send({embeds: [emb.embedMaker( '#FF0000', "Seul les lettres A-Z acceptés, pas d'accents ni de chiffres.")]})
	let cpt = 0
    nb_essais++
    for(let i=0;i<chosen_word.length;i++) {
        let lowered = m.content.toLowerCase()
        if(chosen_word[i] == lowered) {
            cur_res[i] = lowered
            cpt++
        }
    }
 
    if(cpt > 0) {
       
        m.channel.send({ embeds: [emb.embedMaker('#00FF00', `Le board : ${md.encadrer(cur_res.join(" | "))}\n\nErreurs permises restantes : ${md.encadrer(tries)}.\n\n++`)]})
        if(cur_res.join("") == chosen_word.join("")){ 
            collector.stop()
        }
        
    } else {
        tries--
        m.channel.send({ embeds: [emb.embedMaker('#FF0000', `Le board : ${md.encadrer(cur_res.join(" | "))}\n\nErreurs permises restantes : ${md.encadrer(tries)}\n\n--`)]})
        
        if(tries == 0) {
             collector.stop()
        }
    }
   
});

collector.on('end', collected => {
   
    let tab = collected.map(msg => msg.content)

    if(cur_res.join("") == chosen_word.join("")){
        interaction.followUp({embeds: [emb.embedMaker( '#00FF00',  `GG ! Tu as trouver le mot qui était ${md.encadrer(chosen_word.join(""))} en ${nb_essais} essais.`)]})
        collector.stop()
    }else if (tries == 0){
        interaction.followUp({embeds: [emb.embedMaker( '#FF0000', `Bien essayer, mais tu n'as pas su trouver le mot qui était : ${md.encadrer(chosen_word.join(""))}. Une prochaine fois peut-être !`)]})
           
    }else if(tab.includes(chosen_word.join(""))) {
        return interaction.followUp({embeds: [emb.embedMaker( '#00FF00',  `Ah ouais, t'es chaud toi, tu trouves tout direct, gg, le mot était ${md.encadrer(chosen_word.join(""))} et tu l'as trouver en ${nb_essais} essais.`)]})
    }
    
    
    else{
        return interaction.followUp({embeds: [emb.embedMaker( '#FF0000', `Fin du temps imparti, tu n'as pas su trouver le mot qui était : ${md.encadrer(chosen_word.join(""))}. Une prochaine fois peut-être !`)]})

    }
	});
}

exports.infos = {
    name: "pendu",
    description: "Jouez au jeu du pendu sur Discord",
    usage: "[prefix]pendu",
    alias: []
}
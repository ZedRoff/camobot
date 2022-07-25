const Discord = require("discord.js")
const funcs = require("../utils/errors")
const api = require("random-image-api")
const emb = require("../utils/embed")


exports.command = (bot, interaction, options) => {
    let type = options.getString("catégorie")
   
    if(type == "chat")  {

     
        api.cat().then(url => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Voici un chat : ")
            .setImage(url)
            
            interaction.reply({ embeds: [embed] })
        })
    }
    else if(type == "chien") {
        api.dog().then(url => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Voici un chien : ")
            .setImage(url)
            
            interaction.reply({ embeds: [embed] })
        })
    }else {
        return interaction.reply({embeds: [emb.embedMaker('#FF0000', "Les seuls modes supportés actuellement sont : `chat | chien`")]})
    }
    
}
exports.infos = {
    name: "image",
    alias: ["gen"],
    description: "Génère une image en rapport avec le contexte donné (seul certains contextes sont supportés)",
    usage: "[prefix]image [type]",
    options: [{
        name: "catégorie",
        description: "La catégorie d'image que vous souhaitez voir",
        required: true,
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]

}
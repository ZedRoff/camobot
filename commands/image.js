const Discord = require("discord.js")
const funcs = require("../utils/errors")
const api = require("random-image-api")
const emb = require("../utils/embed")


exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, '[prefix]image [type]')
    let type = args[0]

   
    if(type == "chat")  {

     
        api.cat().then(url => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Voici un chat : ")
            .setImage(url)
            
            message.channel.send({ embeds: [embed] })
        })
    }
    else if(type == "chien") {
        api.dog().then(url => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Voici un chien : ")
            .setImage(url)
            
            message.channel.send({ embeds: [embed] })
        })
    }else {
        return emb.embedMaker(Discord, message, '#FF0000', "Les seuls modes supportés actuellement sont : `chat | chien`")
    }
    
}
exports.infos = {
    name: "image",
    alias: ["gen"],
    description: "Génère une image en rapport avec le contexte donné (seul certains contextes sont supportés)",
    usage: "[prefix]image [type]"

}

const Discord = require("discord.js")
const allIntents = new Discord.Intents(32767)
const bot = new Discord.Client({ intents: allIntents, partials: ['CHANNEL']})
const config = require("./utils/config.json")
const fs = require("fs")
const funcs = require("./utils/errors.js")
const mongoose = require("mongoose")
const model_prefix = require("./models/prefix")
const embed_f = require("./utils/embed")

let cooldown = new Set()

let uri = config.mongo;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  
    useUnifiedTopology: true
  })
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

bot.commands = {}

fs.readdir('./commands/', (err, files) => {
    files.forEach(file => {
        const f = require(`./commands/${file}`);
        let cmd = file.split(".")[0]
        try {
            bot.commands[cmd] = [f.command, f.infos.name, f.infos.description, f.infos.usage, f.infos.alias]
        }catch(e) {
            console.log("erreur")
        }
        

    })
})


 

bot.once("ready", () => {

   
 
    console.log("Bot prêt !")

    let status = ["En développement", "Sert la déesse hylia", "Version 1.0.0", "²help"]
    let x = 0;

    setInterval(() => {
        if(x !== status.length-1) {
            bot.user.setActivity(status[x])
            x++
        }else {
            bot.user.setActivity(status[x])
            x = 0
        }
    }, 5000)
    
    bot.user.setStatus("dnd")
})


bot.on("messageCreate", message => {
    if(message.author.bot) return;
    if(message.channel.type == "DM") return embed_f.embedMaker(Discord, message, '#00FFFF', "Merci d'utiliser les services que ce bot propose en MP")
        let args_strip = message.content.split(" ")
        let cmd = args_strip[0]

        let prefix = ""
        model_prefix.findOne({guild_id: message.guild.id}, (err, doc) => {
            if(!doc) {
                const new_prefix = new model_prefix({
                    guild_id: message.guild.id,
                    prefix: "²"
                })
                new_prefix.save()
                prefix = "²"
            } else {
                prefix = doc.prefix
                
            }
             
        let name_cmd = cmd.split(prefix)[1]
        let args = args_strip.slice(1)





    if(cmd == prefix + "info") {
   
    if(!args[0]) return funcs.errorArgs(Discord,message,prefix,"[prefix]info [nom_de_la_commande]")
        
    if(bot.commands[args[0]] !== undefined) {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setTitle(`Page d'aide de la commande ${args[0]}`)
        .setDescription("Merci de ne pas inclure les `[] et ()` dans la commande.\nLégende : `[]` = requis, `()` = optionnel.")
        .addFields({name: "Description :", value: bot.commands[args[0]][2]}, {name: "Usage", value: bot.commands[args[0]][3].replace("[prefix]", prefix)}, 
         {name: "Alias", value: bot.commands[args[0]][4].length == 0 ? "Pas d'alias" : bot.commands[args[0]][4].join(" | ")})
     
        message.channel.send({embeds: [embed]})
    }else {
        let embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription("Cette commande n'a pas été trouvée")

        message.channel.send({embeds: [embed]})
    }
  
   }


   let keys = Object.keys(bot.commands)
   let values = Object.values(bot.commands)
   for(let i=0;i<keys.length;i++) {
    
       if(keys[i] == name_cmd || values[i][4].includes(name_cmd)) {
        try {
      
        if(cooldown.has(message.author.id)) return message.reply("Hep hep, calme sur le spam des commandes")
        values[i][0](bot, message, args)
        cooldown.add(message.author.id)
        if(message.author.id == '327074335238127616') return;
        setTimeout(() => {
            cooldown.delete(message.author.id)
        }, 3000)
        }catch(e) {
            message.channel.send("`Une erreur est survenue, merci de contacter le créateur du bot </ZedRoff>#6268`")
        }
       }
      
   }
      
        
 
})
   
   
       
})
bot.login(config.token)

// TODO : change all aliases to alias on github

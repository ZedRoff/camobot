const Discord = require("discord.js")
const allIntents = new Discord.Intents(32767)
const bot = new Discord.Client({ intents: allIntents})
const config = require("./utils/config.json")
const fs = require("fs")
const funcs = require("./utils/errors.js")
const mongoose = require("mongoose")
const model_prefix = require("./models/prefix")
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
            bot.commands[cmd] = [f.command, f.infos.description, f.infos.usage, f.infos.aliases]
        }catch(e) {
            console.log("erreur")
        }
        

    })
})



bot.once("ready", () => {
    console.log("Bot prêt !")

    let status = ["En développement", "Sert la déesse hylia", "Version 1.0.0", "²help"]
    let x = 0;

    // TODO : I think the bot goes to void after ²help and after 10 sec restarts to 0, have to verify that.
    setInterval(() => {
        if(x !== status.length) {
            bot.user.setActivity(status[x])
            x++
        }else {
            x = 0
        }
    }, 5000)
    bot.user.setActivity("En développement", {type: "WATCHING"})
    bot.user.setStatus("dnd")
})

bot.on("messageCreate", message => {
    if(message.author.bot) return;
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
        .addFields({name: "Description :", value: bot.commands[args[0]][1]}, {name: "Usage", value: bot.commands[args[0]][2]}, 
         {name: "Alias", value: bot.commands[args[0]][3].length == 0 ? "Pas d'alias" : bot.commands[args[0]][3].join(" | ")})
     
        message.channel.send({embeds: [embed]})
    }else {
        let embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription("Cette commande n'a pas été trouvée")

        message.channel.send({embeds: [embed]})
    }
  
   }
    if(bot.commands[name_cmd] !== undefined) {
        if(message.author.id == '327074335238127616') return;
        try {
            if(cooldown.has(message.author.id)) {
                return message.reply("Vous devez attendre 5 secondes avant de pouvoir lancer une commande a nouveau.")
            }else {
                bot.commands[name_cmd][0](bot, message, args)
                cooldown.add(message.author.id)
                setTimeout(() => {
                    cooldown.delete(message.author.id)
                }, 5000)
            }
           
            
            
        }catch(e) {
            message.channel.send("Erreur, merci de contacter le créateur du bot par mp : `</ZedRoff>#6268`")
            console.log(e)
        } 
    }
        })
       
})
bot.login(config.token)

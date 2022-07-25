const Discord = require("discord.js")
const allIntents = new Discord.Intents(32767)
const bot = new Discord.Client({ intents: allIntents, partials: ['CHANNEL']})
const config = require("./utils/config.json")
const fs = require("fs")
const funcs = require("./utils/errors.js")
const mongoose = require("mongoose")

const embed_f = require("./utils/embed")
const model_afk = require("./models/afk")
const md = require("./utils/md")
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

   const g = bot.guilds.cache.get("765920191967526932")
   let commands;
   if(g) {
    commands = g.commands;
   } else {
    commands = bot.application.commands
   }
  
   fs.readdir("./commands", (err, files) => {
    files.forEach(file => {
        const f = require(`./commands/${file}`)
        commands.create(f.infos)
    })
   })
  
 
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

bot.on("interactionCreate", async interaction => {
        if(!interaction.isCommand()) return;
        const { commandName, options } = interaction
        
        fs.readdir("./commands", (err, files) => {
            files.forEach(file => {
                const f = require(`./commands/${file}`)
        
                if(f.infos.name == commandName) {
                 if( cooldown.has(interaction.member.user.id)) return interaction.reply({content: "Tu es sous cooldown, tu dois attendre 5 secondes"})
              
                 try {

              
                    f.command(bot, interaction, options)
                }catch(e) {
                    message.channel.send(`Une erreur est survenue, merci de contacter le créateur du bot ${config.owner}`)
                    console.log(e)
                }
                if(interaction.member.user.id == config.ownerID) return;
                cooldown.add(interaction.member.user.id)
                    setTimeout(() => {
                        cooldown.delete(interaction.member.user.id)
                    }, 5000)
                }
            })
        })
        
})


bot.on("messageCreate", message => {
    if(message.author.bot) return;
    if(message.channel.type == "DM") return message.channel.send({embeds: [embed_f.embedMaker('#00FFFF', "Merci d'utiliser les services que ce bot propose en MP")]})



    let args_strip = message.content.split(" ")
    let cmd = args_strip[0]

    let prefix = "/"
  
    let name_cmd = cmd.split(prefix)[1]
    let args = args_strip.slice(1)


if(cmd == prefix + "info") {

    // TODO : have to convert this part to full indexed searching
if(!args[0]) return message.channel.send({embeds: [funcs.errorArgs("[prefix]info [nom_de_la_commande]")]})

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



    if(!message.content.includes("<@")) return;
    model_afk.find({}, (err, doc) => {
        doc.map(info => {
            if(message.content.includes(info.user_id) && info.reason.length > 0) {
                let find = bot.users.cache.get(info.user_id)
                return message.channel.send(`L'utilisateur ${find.username} est afk pour la raison suivante : ${md.encadrer(info.reason)}`)
            }
           
        })
    })
   
    
})

   
  
bot.login(config.token)

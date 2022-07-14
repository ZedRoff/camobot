const Discord = require("discord.js")
const allIntents = new Discord.Intents(32767)
const bot = new Discord.Client({ intents: allIntents})
const config = require("./utils/config.json")
const fs = require("fs")
const funcs = require("./utils/errors.js")

bot.commands = {}

fs.readdir('./commands/', (err, files) => {
    files.forEach(file => {
        const f = require(`./commands/${file}`);
        let cmd = file.split(".")[0]
        try {
            bot.commands[cmd] = [f.command, f.infos.description, f.infos.aliases]
        }catch(e) {
            console.log("erreur")
        }
        

    })
})

let prefix = config.prefix

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
        let name_cmd = cmd.split(prefix)[1]
        let args = args_strip.slice(1)

    if(cmd == prefix + "info") {
   
    if(!args[0]) return funcs.errorArgs(Discord,message,prefix,"[prefix]info [nom_de_la_commande]")

    if(bot.commands[args[0]] !== undefined) {
        let embed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setTitle(`Page d'aide de la commande ${args[0]}`)
        .setDescription("Merci de ne pas inclure les `[] et ()` dans la commande.\nLégende : `[]` = requis, `()` = optionnel.")
        .addFields({name: "Description :", value: bot.commands[args[0]][1]})
     
        message.channel.send({embeds: [embed]})
    }else {
        let embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription("Cette commande n'a pas été trouvée")

        message.channel.send({embeds: [embed]})
    }
  
   }
    if(bot.commands[name_cmd] !== undefined) {
        try {
            bot.commands[name_cmd][0](bot, message, args)
        }catch(e) {
            message.channel.send("Erreur, merci de contacter le créateur du bot par mp : `</ZedRoff>#6268`")
            console.log(e)
        } 
    }
})
bot.login(config.token)

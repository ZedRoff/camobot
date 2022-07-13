const Discord = require("discord.js")
const allIntents = new Discord.Intents(32767)
const bot = new Discord.Client({ intents: allIntents})
const config = require("./utils/config.json")
const fs = require("fs")

bot.commands = {}


fs.readdir('./commands/', (err, files) => {
    files.forEach(file => {
        const f = require(`./commands/${files}`);
        let cmd = file.split(".")[0]
        bot.commands[cmd] = [f.command, f.infos.description, f.infos.aliases]

    })
   
})
let prefix = config.prefix

bot.once("ready", () => {
    console.log("Bot prêt !")
    bot.user.setActivity("En développement", {type: "WATCHING"})
})

bot.on("messageCreate", message => {
    if(message.author.bot) return;
    let args_strip = message.content.split(" ")
    let cmd = args_strip[0]
    let name_cmd = cmd.split(prefix)[1]
   let args = args_strip.slice(1)

    if(bot.commands[name_cmd] !== undefined) {
        bot.commands[name_cmd][0](bot, message, args)
    }
})
bot.login(config.token)

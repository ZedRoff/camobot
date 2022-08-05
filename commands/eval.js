const Discord = require("discord.js")
const config = require("../private//config.json")
exports.command = async (bot, interaction, options) => {
    if(!interaction.member.user.id == config.ownerID) return interation.reply({content: 'Bien joué, mais nan pas aujourd\'hui -)'})
    const clean = async (text) => {
        if (text && text.constructor.name == "Promise")
          text = await text;
        
           text = require("util").inspect(text, { depth: 1 });
        text = text
      
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
          text = text.replaceAll(bot.token, "[SUPPRIMER]");
        return text;
        }

        try {
            const evaled = eval(options.getString("code"))
      
            const cleaned = await clean(evaled);
      
            interaction.reply(`\`\`\`js\n${cleaned}\n\`\`\``);
          } catch (err) {
            if(JSON.stringify(err).length > 1020) return interaction.reply({content: "check les logs"})
            interaction.reply({ content: `\`ERROR\` \`\`\`xl\n${err}\n\`\`\``});
            console.log(err)
          }
      
        }
      
exports.infos = {
    name: "eval",
    description: "Commande réservée au développeur du bot, mais permet de lancer du code JavaScript",
    alias: [],
    usage: "[prefix]eval [code]",
    options: [{
      name: "code",
      description: "pas de desc",
      required:true,
      type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    }]
}
/* review the eval cmd */

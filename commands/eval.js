exports.command = async (bot, message, args) => {
    if(!message.author.id == '327074335238127616') return message.channel.send('Bien joué, mais nan pas aujourd\'hui -)')
    const clean = async (text) => {
        if (text && text.constructor.name == "Promise")
          text = await text;
        
           text = require("util").inspect(text, { depth: 1 });
        text = text
      
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
          text = text.replaceAll(bot.token, "[REDACTED]");
        return text;
        }

        try {
            const evaled = eval(args.join(" "));
      
            const cleaned = await clean(evaled);
      
            message.channel.send(`\`\`\`js\n${cleaned}\n\`\`\``);
          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
          }
      
        }
      
exports.infos = {
    name: "eval",
    description: "Commande réservée au développeur du bot, mais permet de lancer du code JavaScript",
    alias: [],
    usage: "[prefix]eval [code]"
}

const Discord = require("discord.js");
const allIntents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents: allIntents, partials: ["CHANNEL", "REACTION", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "USER", "MESSAGE"] });
const config = require("./private/config.json");
const fs = require("fs");
const funcs = require("./utils/errors.js");
const mongoose = require("mongoose");

const embed_f = require("./utils/embed");
const model_afk = require("./models/afk");
const md = require("./utils/md");
let cooldown = new Set();

let uri = process.env.MONGO;

mongoose
  .connect(uri, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

bot.commands = {};

fs.readdir("./commands/", (err, files) => {
  files.forEach((file) => {
    const f = require(`./commands/${file}`);
    let cmd = file.split(".")[0];
    try {
      bot.commands[cmd] = [
        f.command,
        f.infos.name,
        f.infos.description,
        f.infos.usage,
        f.infos.alias,
      ];
    } catch (e) {
      console.log("erreur");
    }
  });
});


bot.once("ready", () => {
 
  
    commands = bot.application.commands;
  

  fs.readdir("./commands", (err, files) => {
    files.forEach((file) => {
      const f = require(`./commands/${file}`);
      commands.create(f.infos);
    });
    // Info command can't be in the ./commands/ dir, so I have to create it manually since it's in the ./index.js file.
    commands.create({
      name: "info",
      description: "Donne des informations sur une commande",
      usage: "[prefix]info [commande]",
      alias: ["i"],
      options: [
        {
          name: "commande",
          description: "Le nom de la commande",
          required: true,
          type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
        },
      ],
    });
  });

  console.log("Bot prêt !");

  let status = [
    "En développement",
    "Sert la déesse hylia",
    "Version 1.0.0",
    "/help",
  ];
  let x = 0;

  setInterval(() => {
    bot.user.setActivity(status[x], {
      type: "STREAMING",
      url: "https://twitch.tv/milleka__",
    });
    if (x !== status.length - 1) x++;
    else x = 0;
  }, 5000);
});

bot.on("guildCreate", guild => {
  guild.leave()
})
bot.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName, options } = interaction;
  if (commandName == "info") {
    // TODO : have to convert this part to full indexed searching
    let cmd = options.getString("commande");
    if (bot.commands[cmd] !== undefined) {
      let embed = new Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setTitle(`Page d'aide de la commande ${cmd}`)
        .setDescription(
          "Merci de ne pas inclure les `[] et ()` dans la commande.\nLégende : `[]` = requis, `()` = optionnel."
        )
        .addFields(
          { name: "Description :", value: bot.commands[cmd][2] },
          {
            name: "Usage",
            value: bot.commands[cmd][3].replace("[prefix]", "/"),
          },
          {
            name: "Alias",
            value:
              bot.commands[cmd][4].length == 0
                ? "Pas d'alias"
                : bot.commands[cmd][4].join(" | "),
          }
        );

      return interaction.reply({ embeds: [embed] });
    } else {
      let embed = new Discord.MessageEmbed()
        .setColor("#FF0000")
        .setDescription("Cette commande n'a pas été trouvée");

      return interaction.reply({ embeds: [embed] });
    }
  }
  fs.readdir("./commands", (err, files) => {
    files.forEach((file) => {
      const f = require(`./commands/${file}`);
    
     if (f.infos.name == commandName) {
        if (cooldown.has(interaction.member.user.id))
          return interaction.reply({
            content: "Tu es sous cooldown, tu dois attendre 5 secondes",
          });

        try {
        

          f.command(bot, interaction, options).catch(e => {
          interaction.reply({ content:  `Une erreur est survenue, merci de contacter le créateur du bot ${config.owner}`});
          console.log(e)
          })
        } catch (e) {
          interaction.reply({ content:  `Une erreur est survenue, merci de contacter le créateur du bot ${config.owner}`});
          console.log(e);
        }
        if (interaction.member.user.id == config.ownerID) return;
        cooldown.add(interaction.member.user.id);
        setTimeout(() => {
          cooldown.delete(interaction.member.user.id);
        }, 5000);
      }
    });
  });
});

bot.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "DM")
    return message.channel.send({
      embeds: [
        embed_f.embedMaker(
          "#00FFFF",
          "Merci d'utiliser les services que ce bot propose en MP"
        ),
      ],
    });
  if (message.content == "<@807615011719348235>")
    return embed_f.embedMaker(
      "RANDOM",
      "Mon préfix est `/` et je supporte les `slash commands` uniquement."
    );

  if (!message.content.includes("<@")) return;
  model_afk.find({}, (err, doc) => {
    doc.map((info) => {
      if (message.content.includes(info.user_id) && info.reason.length > 0) {
        let find = bot.users.cache.get(info.user_id);
        return message.channel.send(
          `L'utilisateur ${
            find.username
          } est afk pour la raison suivante : ${md.encadrer(info.reason)}`
        );
      }
    });
  });
});


bot.on("messageReactionAdd", function(messageReaction, user){
if(messageReaction._emoji.name == "✅") {
  let guild = bot.guilds.cache.get(messageReaction.message.guild.id)
  let guild_member = guild.members.cache.get(user.id);
  let role = guild.roles.cache.get("1005242037429338122")
  if(guild_member.roles.cache.has(role.id)) return;
  guild_member.roles.add(role.id)
}

});
bot.on("messageReactionRemove", function(messageReaction, user){
  if(messageReaction._emoji.name == "✅") {
    let guild = bot.guilds.cache.get(messageReaction.message.guild.id)
    let guild_member = guild.members.cache.get(user.id);
    let role = guild.roles.cache.get("1005242037429338122")
    if(!guild_member.roles.cache.has(role.id)) return;
    guild_member.roles.remove(role.id)
  }
  
  });

bot.login(process.env.TOKEN);

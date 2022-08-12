const dotenv = require('dotenv');
dotenv.config();


const Discord = require("discord.js");
const allIntents = new Discord.Intents(32767);
const bot = new Discord.Client({ intents: allIntents, partials: ["CHANNEL", "REACTION", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "USER", "MESSAGE"] });
const config = require("./utils/config.json");
const fs = require("fs");
const funcs = require("./utils/errors.js");
const mongoose = require("mongoose");
const axios = require("axios")
const model_streams = require("./models/stream")

const Parser = require('rss-parser');

const embed_f = require("./utils/embed");
const model_youtube = require("./models/youtube")
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


    if(message.channel.id == "873797873685397575") {
      if(!message.content.includes("https://clips.twitch.tv/")) {
        message.delete()
        message.channel.send("Ceci n'est pas un clip").then(msg => {
         setTimeout(() => msg.delete(), 5000)
          
        })
      }
    }


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



setInterval(async () => {

// TWITCH NOTIFICATION SYSTEM

  let data = {
      "client_id": process.env.TWITCH_ID,
      "client_secret": process.env.TWITCH_SECRET,
      "grant_type": "client_credentials"
    }
    let headers = {
      "Content-type": "application/x-www-form-urlencoded"
    }
 
    const infos = await axios.post("https://id.twitch.tv/oauth2/token", data, headers)
    let access_token = infos.data.access_token;

    headers = {
      "Client-Id": process.env.TWITCH_ID,
      "Authorization": `Bearer ${access_token}`,
     
      "Content-type": "application/x-www-form-urlencoded"
      
    }
    let users = ["milleka__", "meoscend", "zfg1", "sunn_usk", "feenieh", "willx49", "zenki12", "xhaii", "vildiuss", "axoly", "oxido83", "tdc_slide"]
      
    users.forEach(async user => {
     
      const req = await axios.get(`https://api.twitch.tv/helix/streams?user_login=${user}`, {headers: headers})
if(req.data.data.length == 0) return;
   
      let data_fetched = req.data.data[0]
      
      model_streams.findOne({identifier: "ab26"}, (err, doc) => {
        if(!doc) {
          const model_streams_new = new model_streams({
            dates: [],
            identifier: "ab26"
          })
          model_streams_new.save()
          //return message.channel.send("Init réalisée, merci de re-lancer la commande.")
        }
        if(doc.dates.includes(data_fetched.started_at)) return;
        let embed = new Discord.MessageEmbed()
        .setColor("#6441a5")
        .setTitle(`${data_fetched.user_name} stream du ${data_fetched.game_name} !`)
        .setDescription(data_fetched.title)
        .setThumbnail(data_fetched.thumbnail_url.replace("{width}", "500").replace("{height}", "500"))
        .addFields({name: "Nombre de viewers", value: JSON.stringify(data_fetched.viewer_count)})
        .addFields({name: "Lien vers le stream", value: `[Lien](https://twitch.tv/${data_fetched.user_login})`})
      //  .setImage("https://static-cdn.jtvnw.net/jtv_user_pictures/7b49926a-df1b-496a-b023-14dcc5d87465-profile_image-70x70.png")
  
      if(user == "milleka__") {
      //  bot.channels.cache.get("1007378640318779512").send("<@&806570099208749126>")
          bot.channels.cache.get("1007378640318779512").send({ embeds: [embed]})
      } else {
        bot.channels.cache.get("1007378654130602165").send({ embeds: [embed]})
      }

      let copy = [...doc.dates, data_fetched.started_at];
      doc.dates = copy;
      doc.save()
     
      })
    
  

  })

// END TWITCH NOTIFICATION SYSTEM


// YOUTUBE NOTIFICATION SYSTEM


let parser = new Parser();
  model_youtube.findOne({identifier: "ab26"}, async(err, doc) => {

    let feed = await parser.parseURL('https://www.youtube.com/feeds/videos.xml?channel_id=UCPGfjTSbx8BZYWUcedSkNIw');
    let parsed = feed.items[0]
   console.log(doc.last_video, parsed.link)
 if(doc.last_video == parsed.link) return;
 console.log(feed)
    
  let embed = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setTitle(`Nouvelle vidéo de ${parsed.author}`)
  .addFields({name: "Titre", value: parsed.title})
  .addFields({name: "Voir la vidéo", value: `[Lien](${parsed.link})`})
  bot.channels.cache.get("1007766213742559323").send({embeds: [embed]});
doc.last_video = parsed.link 
doc.save()

})

// END YOUTUBE NOTIFICATION


}, 60000)

   

let payload = {
  "⚒️": "872448269832314950",
  "🤝": "872448467488866315",
  "🎊": "872448022435475487",
  "⚕️": "872683354619785257",
  "♀️": "872169194995736656",
  "♂️": "872169147465887775",
  "🍩": "872168924718985237", 
  "🎓": "872169001181130852",
  "🍺": "872169063827243028",
  "👱‍♂️": "872683402149625918",
  "🚗": "987725895517212694",
  "👓": "987725969408262194",
  "⚔️": "934485638642794586",
  "🔫": "1001528451620147210",
  "1️⃣": "872449533307658310",
  "2️⃣": "872449451023794217"
}
bot.on("messageReactionAdd", function(messageReaction, user){

  if(messageReaction.message.channelId != "872445982976147568") return;
 
  let emoji_name = messageReaction._emoji.name;


  if(payload[emoji_name]) {
    let guild = bot.guilds.cache.get(messageReaction.message.guild.id)
    let guild_member = guild.members.cache.get(user.id);
    let role = guild.roles.cache.get(payload[emoji_name])
    if(guild_member.roles.cache.has(role.id)) return;
  guild_member.roles.add(role.id)
 
  }

});
bot.on("messageReactionRemove", function(messageReaction, user){
  if(messageReaction.message.channelId != "872445982976147568") return;
  let emoji_name = messageReaction._emoji.name
  if(payload[emoji_name]) {
    let guild = bot.guilds.cache.get(messageReaction.message.guild.id)
    let guild_member = guild.members.cache.get(user.id);
    let role = guild.roles.cache.get(payload[emoji_name])
    if(!guild_member.roles.cache.has(role.id)) return;
  guild_member.roles.remove(role.id)
 
  }

  
  });

bot.login(process.env.TOKEN);

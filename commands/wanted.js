const Discord = require("discord.js")
exports.command = async(bot, interaction, options) => {
    const Canvas = require("canvas")
    const canvas = Canvas.createCanvas(189, 287);
       const ctx = canvas.getContext('2d');
  
   
   const target = options.getUser("utilisateur")
     
    
       const background = await Canvas.loadImage(`https://cdn.glitch.com/5f373f55-ab8d-4671-80ea-c21805f80314%2Fimages.jpg?v=1589987701516`);
    
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   
       ctx.strokeStyle = '#74037b';
       ctx.strokeRect(0, 0, canvas.width, canvas.height);
   
     
       const avatar = await Canvas.loadImage(target.displayAvatarURL().replace(".webp", ""));
       console.log(avatar)
       ctx.drawImage(avatar, 15.5, 60, 156, 120);
   ctx.font = '25px sans-serif';
   
       ctx.fillStyle = '#4f3e24';
   let rnd = Math.round(Math.random() * 100) + "000 000 $"
       ctx.fillText(rnd, 15.5, 237);
   
   interaction.reply({
         files: [
           {
             attachment: canvas.toBuffer(),
             name: `${target.tag}-wanted.png`
           }
         ]
       });
   }
   exports.infos = {
     name: "wanted",
     description: "Crée un poster wanted comme dans one piece",
     usage: "[prefix]wanted (utilisateur)",
     alias: [],
     options: [{
      name: "utilisateur",
      required: true,
      type: Discord.Constants.ApplicationCommandOptionTypes.USER,
      description: "L'utilisateur qui est victime de l'action"
     }]
   }
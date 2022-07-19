exports.command = async(bot, message, args) => {
    const Canvas = require("canvas")
    const canvas = Canvas.createCanvas(189, 287);
       const ctx = canvas.getContext('2d');
   const Discord = require("discord.js")
   
   const target = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
     
    
       const background = await Canvas.loadImage(`https://cdn.glitch.com/5f373f55-ab8d-4671-80ea-c21805f80314%2Fimages.jpg?v=1589987701516`);
     console.log(background)
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
   
   message.channel.send({
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
     alias: []
   }

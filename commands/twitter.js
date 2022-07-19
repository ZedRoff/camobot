// Deprecated command, needs a rewrite



exports.command = async(bot, message, args) => {
    const Canvas = require("canvas")
    const canvas = Canvas.createCanvas(1920, 613);
       const ctx = canvas.getContext('2d');
   const Discord = require("discord.js")
   
   const target = message.mentions.users.first() || bot.users.cache.get(args[0]) || message.author;
     if(!args[0]) return message.reply("pas assez d'arg")
     args = args.slice(1)
    if(args.join(" ").length > 34) return message.channel.send("The max size is 34.")
       const background = await Canvas.loadImage(`https://cdn.glitch.com/5f373f55-ab8d-4671-80ea-c21805f80314%2FUntitled.png?v=1590080605696`);
     
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   
       ctx.strokeStyle = '#74037b';
       ctx.strokeRect(0, 0, canvas.width, canvas.height);
   
     
       const avatar = await Canvas.loadImage(target.displayAvatarURL().replace(".webp", ""));
     
       ctx.drawImage(avatar, 15.5, 15.5, 180, 183);
     
   ctx.font = '75px sans-serif';
   
       ctx.fillStyle = '#000';
   
       ctx.fillText(args.join(" "), 295, 237);
   
   ctx.font = '45px sans-serif';
   
       ctx.fillStyle = '#000';
   
       ctx.fillText(`${Math.round(Math.random() * 100)}K`, 50, 560);
     
     
     
     ctx.font = '45px sans-serif';
   
       ctx.fillStyle = '#000';
   
       ctx.fillText(`${Math.round(Math.random() * 100)}K`, 490, 560);
     
     
     
   
   ctx.font = '45px sans-serif';
   
       ctx.fillStyle = '#84829A';
   var options = { month: 'long'};
   
       ctx.fillText(`${new Date().getHours()+2}:${new Date().getMinutes()} PM · ${new Intl.DateTimeFormat('en-US', options).format(new Date())}, ${new Date().getDay()} ${new Date().getFullYear()}`, 35, 389);
     if(target.username.length > 0 && target.username.length < 15 ) {
       
       ctx.font = '45px sans-serif';
       ctx.fillStyle = '#000';
   
       ctx.fillText(target.username, 245, 100);
   
     
   message.channel.send({
         files: [
           {
             attachment: canvas.toBuffer(),
             name: `${target.tag}-twitter.png`
           }
         ]
       });
     }else if(target.username.length > 15) {
     return message.channel.send("You can't use this command because your nickname's length is longer than 15 caracters.")
     }else {
   ctx.font = '65px sans-serif';
   
       ctx.fillStyle = '#000';
   
       ctx.fillText(target.username, 285, 100);
   
     
   message.channel.send({
         files: [
           {
             attachment: canvas.toBuffer(),
             name: `${target.tag}-twitter.png`
           }
         ]
       });
     }
   }
   exports.infos = {
     name: "twitter",
     description: "Permet de rédiger un tweet avec le texte donné",
     usage: "[prefix]twitter [texte]",
     alias: []
   }

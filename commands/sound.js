const Discord = require("discord.js")

exports.command = async(bot, interaction, options) => {
  const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection, AudioPlayerStatus} = require('@discordjs/voice');
let mode = options.getString("type")
let valeur = options.getString("valeur")
let connection;

if(interaction.member.voice.channel == null) return interaction.reply({content: "Tu dois être dans un vocal pour executer ce genre de commandes."})
if(interaction.guild.members.cache.get(bot.user.id).voice.channelId)  {
    if(interaction.member.voice.channel.id !== interaction.guild.members.cache.get(bot.user.id).voice.channelId) return interaction.reply({content: "On est pas dans le même vocal"})

}
    
if(mode == "join") {
    connection = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.member.guild.id,
        adapterCreator: interaction.member.guild.voiceAdapterCreator,
    })

        interaction.reply({content: "Ok, je rejoins le vocal"})
   
} 
   else if(mode == "play") {
    const payload = {
        "audio1": "https://cdn.glitch.global/ad386ccf-a028-4a1a-b88c-3c1a27fe8d24/2022-06-03%2019-21-09%20(mp3cut.net).mp3?v=1654277196950"
    }
    
    const cn = getVoiceConnection(interaction.member.guild.id);
    if(cn) return interaction.reply({content: "Le bot joue déjà une alerte (si il a quitté de façon prématurée, merci de le reinviter ici avec la commande join"})
    const connection =  joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.member.guild.id,
        adapterCreator: interaction.member.guild.voiceAdapterCreator,
    })
    if(!(valeur in payload)) return interaction.reply({content: "Cet audio n'existe pas"})
  
    
    
        const player = createAudioPlayer();
        const resource = createAudioResource(payload[valeur]);
        player.play(resource)
        connection.subscribe(player)
        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy()
        });

        interaction.reply({content: "Ok, je lance l'audio"})
       

}
else {
    interaction.reply({content: "Ce mode n'existe pas, les seuls modes supportées sont : `play | join`"})
}

}
exports.infos = {
    name: "sound",
    description: "Gère toute la partie audio du bot",
    usage: "[prefix]sound help",
    alias: [],
    options: [{
        name: "type",
        type: Discord.Constants.ApplicationCommandOptionTypes.STRING,
        required: true,
        description: "Types supportés : join | play"
    },
{
    name: "valeur",
    description: "La sound alert que vous voulez jouer",
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
}]
}
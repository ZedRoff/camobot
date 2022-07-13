

exports.command = (bot, message, args) => {
    return message.channel.send("test OK !")
}
exports.infos = {
    name: "test",
    description: "Cette commande test si le bot est encore actif",
    aliases: ["Pas d'alias"]
}

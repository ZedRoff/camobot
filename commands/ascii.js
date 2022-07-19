const funcs = require("../utils/errors")
const emb = require("../utils/embed")
const Discord = require("discord.js")
exports.command = (bot, message, args) => {
    if(!args[0]) return funcs.errorArgs(Discord, message, '[prefix]ascii [texte]')

    let figlet = require('figlet');
    if(args.join(" ").length > 35) return funcs.wrongLength(Discord, message, 35)
figlet(args.join(" "), function(err, data) {
    if (err) {
        emb.embedMaker(Discord, message, '#FF0000', "`Une erreur est survenue, merci de contacter le créateur du bot </ZedRoff>#6268`")
        console.dir(err);
        return;
    }
    message.channel.send("```"+data+"```")
});
}
exports.infos = {
    name: "ascii",
    description: "Converti votre texte en ascii",
    usage: "[prefix]ascii [texte]",
    alias: []
}

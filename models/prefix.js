const mongoose = require("mongoose")

const model = new mongoose.Schema({
    guild_id: String,
    prefix: String
})

module.exports = mongoose.model("Milleka_prefix", model)

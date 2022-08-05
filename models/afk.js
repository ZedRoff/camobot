const mongoose = require("mongoose")

const model = new mongoose.Schema({
    user_id: String,
    reason: String
})
module.exports = mongoose.model("Afk_milleka", model)

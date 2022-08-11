const mongoose = require("mongoose")
const model = new mongoose.Schema({
    dates: Array,
    identifier: String
})
module.exports = mongoose.model("Stream_milleka", model)
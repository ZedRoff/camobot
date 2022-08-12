const mongoose = require("mongoose")
const model = new mongoose.Schema({
    last_stream: String,
    identifier: String
})
module.exports = mongoose.model("Youtube_milleka", model)
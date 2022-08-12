const mongoose = require("mongoose")
const model = new mongoose.Schema({
    last_video: String,
    identifier: String
})
module.exports = mongoose.model("Youtube_milleka", model)
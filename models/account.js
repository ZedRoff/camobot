const mongoose = require("mongoose")

const model = new mongoose.Schema({
    user_id: String,
    user_name: String,
    user_rep: Number,
    user_badge: Array,
    user_cmd_count: Number,
    user_description: String,
    user_bg: String,
    user_color: String,
    user_birth_date: String,
    user_items: Array,
    user_money: Number

})

module.exports = mongoose.model("Account_milleka", model)

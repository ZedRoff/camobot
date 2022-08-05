const mongoose = require("mongoose")

// TODO : Since the macro command is global, I don't specify guild_id, but I should definitely make it multi-guild (but currently it's only in one guild, and it will stay 1 I guess).
// ++ I added an identifier that will be the foreign key tho
const model = new mongoose.Schema({
    name_macro: String,
    text_macro: String,
    type_macro: String,
    identifier: String
    
})

module.exports = mongoose.model("Milleka_macro", model)

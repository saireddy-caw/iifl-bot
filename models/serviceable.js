const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = mongoose.Schema({
    serviceableid: Number,
    area: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

schema.plugin(autoIncrement, { inc_field: "serviceableid" });
module.exports = mongoose.model(`serviceablearea`, schema)
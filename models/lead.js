const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = mongoose.Schema({
    leadid: Number,
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "WIP1"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

schema.plugin(autoIncrement, { inc_field: "leadid" });
module.exports = mongoose.model(`Leads`, schema)
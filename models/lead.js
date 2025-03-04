const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = mongoose.Schema({
    leadid: Number,
    name: {
        type: String,
        require: false
    },
    phone: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        required: false
    },
    loanamount: {
        type: String,
        required: false
    },
    aadharcard: {
        type: String,
        required: false
    },
    pancard: {
        type: String,
        required: false
    },
    livephoto: {
        type: String,
        required: false
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
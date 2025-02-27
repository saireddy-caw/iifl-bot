const mongoose = require('mongoose')
const autoIncrement = require("mongoose-sequence")(mongoose);

const schema = mongoose.Schema({
    otplist: Number,
    otp: {
        type: Number,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

schema.plugin(autoIncrement, { inc_field: "otplist" });
module.exports = mongoose.model(`otplist`, schema)
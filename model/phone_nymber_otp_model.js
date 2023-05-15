const mongoose = require("mongoose");

const phoneNumberOtpModel = mongoose.Schema(
    {
        mobileNumber: {
            type: String,
            required: true,
        },
        counryCode:{
            type:String,
            required:true,
        },
    }
);

module.exports = mongoose.model('phoneNumbers',phoneNumberOtpModel);
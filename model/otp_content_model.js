const mongoose = require('mongoose');

const optModel = mongoose.Schema(
    {
        otp:{
            type: String,
            required: true,
        },
        number:{
            type: String,
            required: true,
        },
    }
);

module.exports = mongoose.model('otpModel',optModel);
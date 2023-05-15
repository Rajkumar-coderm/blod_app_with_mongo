const db = require("../model/phone_nymber_otp_model");
const db2 = require("../model/otp_content_model");
const smssend = require('./blog_controller');

exports.phoneNumberLogin = async (req, res) => {
    try {
        var { mobileNumber, counryCode } = req.body;
        var response = await db.insertMany({
            mobileNumber: mobileNumber,
            counryCode: counryCode
        });
        smssend.sendSms(`${counryCode}${mobileNumber}`, 'Hii');
        if (response != null || response != undefined) {
            await db2.insertMany({ otp: `${smssend.getOtp}`, number: `${mobileNumber}`});
            res.status(200).json({
                message: "Otp successfully send your Mobile Number",
                data: data,
                errr_code: 200,
                status: "success",
            });
        } else {
            res.status(404).json({
                message: "Somthing went wrong",
                data: null,
                errr_code: 404,
                status: "success",
            });
        }
    } catch (e) {
        res.status(403).json({
            message: e.message,
            data: [],
            errr_code: 403,
            status: "Request not completed successfuly",
        });
    }
};


exports.verifyOtp = async (req, res) => {
    var response = await db2.find({number:req.query.phone});
    console.log(response);
    if(response.length > 0){
        console.log(response[0]['number']);
        if(response[0]['otp'] == req.body.otp){
            res.status(200).json({
                message: "Otp success",
                data: null,
                errr_code: 200,
                status: "success",
              });
              await db2.findOneAndDelete({otp:req.body.otp})
        }else{
            res.status(404).json({
                message: "Wrong Otp Resend otp or write again",
                data: null,
                errr_code: 404,
                status: "success",
              });
        }
    }else{
        res.status(409).json({
            message: "Somthing went wrong",
            data: Math.floor(Date.now() / 1000),
            errr_code: 409,
            status: "success",
          });
    }
}
const db = require("../model/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {genrateJwtToken}=require('../auth/jwt_auth');


/// this is method is loging user for those user for this is user signup already..
/// this is  [db.find] method is find perticular data for database and show for user....
module.exports.userLoging = async (req, res) => {
  try {
    var data = await db.find({ email: req.body.email });
    // console.log(data);
    if (data.length > 0) {
      if (data[0].email === req.body.email) {
        if (bcrypt.compareSync(req.body.password, data[0].password)) {
          let token = genrateJwtToken({ email: data[0].email, role: data[0].role ,userId:data[0]._id});
          res.status(200).cookie('token',token).send({
            message: "Loging successfully complated",
            data: [],
            error_code: 200,
            role: data[0].role,
            aut_token: token,
            status: "success",
          });
        } else {
          res.status(401).send({
            message: "User Wrong Password",
            data: [],
            errr_code: 401,
            status: "Request not completed successfuly",
          });
        }
      }
    } else {
      res.status(404).send({
        message: "User Not exits please put valid email address",
        data: [],
        errr_code: 404,
        status: "Request not completed successfuly",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      data: [],
      errr_code: 404,
      status: "Request not completed successfuly",
    });
  }
};
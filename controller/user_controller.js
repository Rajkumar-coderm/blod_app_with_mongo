const db = require("../model/user_model");
const bcrypt = require("bcrypt");

/// this is get api [there is find method use]..find method is find data in over db and then return the response whole data in user,
/// this is api for use get all employee or user [Select] method is use to show perticular data in our response..
module.exports.getAllUsers = async (req, res) => {
  try {
    let data = await db.find().select({
      firstName: 1,
      lastName: 1,
      location: 1,
      role: 1,
      age: 1,
      middleName: 1,
    });
    res.status(200).json({
      message: "Request Successfully complete",
      data: data,
      errr_code: 200,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

/// this is post api for post data in mongodb [Using InsetMany method] its is use for inset data in over database...
/// this is api like signup api acooding to loging page..
module.exports.postUserData = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      location,
      age,
      email,
      password,
      middleName,
      role,
    } = req.body;

    let requestData = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      role: role,
      password: bcrypt.hashSync(password, 10),
      email: email,
      location: location,
      age: age,
    };

    var data = await db.insertMany(requestData);
    res.status(200).send({
      message: "Request Successfully complete",
      data: [
        {
          role: data[0].role,
        },
      ],
      errr_code: 200,
      status: "Successs",
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
      data: [],
      errr_code: 403,
      status: "Request not completed successfuly",
    });
  }
};

/// this is update method [findOneAndUpdate] this is method is use to update perticular data using mongoId which is unic.
/// this is method to update whole data and peticulater also..

module.exports.updateUserData = async (req, res) => {
  try {
    const { firstName, lastName, location, age, middleName } = req.body;
    let requstData = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      location: location,
      age: age,
    };
    let data = await db.findOneAndUpdate(
      { id: req.params.id },
      { $set: requstData },
    );
    res.status(201).send({
      message: "Request Successfully complete",
      data: [],
      errr_code: 201,
      status: "Successs",
    });
  } catch (error) {
    res.status(403).send({
      message: error.message,
      data: [],
      errr_code: 403,
      status: "Request not completed successfuly",
    });
  }
};


/// this is method is use to delete the data in pertuclular in db using mongoid..
/// [findByIdAndRemove] this is method is give one id and delete this is data ..

module.exports.deleteUserData = async (req, res) => {
  try {
    var data = await db.findByIdAndRemove(req.params.id);
    if (data == null) {
      res.status(404).send({
        message: "Data not found",
        data: [],
        errr_code: 404,
        status: "Request not completed successfuly",
      });
    } else {
      res.status(200).send({
        message: "Request Successfully complete",
        data: [],
        errr_code: 200,
        status: "Successs",
      });
    }
  } catch (error) {
    res.status(403).send({
      message: error.message,
      data: [],
      errr_code: 403,
      status: "Request not completed successfuly",
    });
  }
};



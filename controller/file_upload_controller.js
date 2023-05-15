const fileModel = require("../model/file_upload_model");

module.exports.fileUpload = async (req, res) => {
  try {
    var data = {
      file: req.body.file,
      fileExtension: req.body.fileExtension,
      fileType: req.body.fileType,
    };
    var response = await fileModel.insertMany(data);
    if (response != null || response != undefined) {
      res.status(200).json({
        message: "File Upload successfully",      
        data: data,
        errr_code: 200,
        status: "success",
      });
    } else {
      res.status(404).json({
        message: "Somthing went wrong",
        data: data,
        errr_code: 404,
        status: "success",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      data: [],
      errr_code: 404,
      status: "Request not completed successfuly",
    })
  }
};

module.exports.getAllFiles = async (req, res) => {
  try {
    var response = await fileModel.find();
    res.status(200).json({
      message: "File Upload successfully",
      data: response,
      errr_code: 200,
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      data: [],
      errr_code: 404,
      status: "Request not completed successfuly",
    });
  }
};

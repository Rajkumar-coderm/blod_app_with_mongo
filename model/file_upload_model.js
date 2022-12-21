const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const FileModel = mongoose.Schema({
  file: {
   type:String,
   required:true,
  },
  fileExtension: {
    type: String,
    required: true,
  },
  fileType:{
    type:String,
    required:true,
  }
});

module.exports = mongoose.model("uploadedFile", FileModel);
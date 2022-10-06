const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Like = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  blogId:{
    type:String,
    required:true
  },
  like:{
    type:Boolean,
    required:true,
  }
});

module.exports=mongoose.model('likeUnlike',Like);
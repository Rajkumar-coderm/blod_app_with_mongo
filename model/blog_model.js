const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const BlogModel = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishDate: { type: Date, default: Date.now },
    published: {
      type: Boolean,
      required: true,
      default: true,
    },
    like: {
      type: Schema.Types.Array,
      ref: "likeUnlike"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('blogs',BlogModel);

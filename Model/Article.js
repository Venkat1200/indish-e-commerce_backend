const mongoose = require("mongoose");
const { Schema } = mongoose;
const ImageSchema = new Schema({
  url: { type: String },
  articleTitle: { type: String },
  category: { type: String },
  price: { type: Number },
});
module.exports = mongoose.model("image", ImageSchema);

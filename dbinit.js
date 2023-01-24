const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected".america);
};

module.exports = connectDB;

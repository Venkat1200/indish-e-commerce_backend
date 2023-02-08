const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  // Firstname: {
  //   type: String,
  //   required: true,
  // },
  // Lastname: {
  //   type: String,
  //   required: true,
  // },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
/// Ask Reagan About validators

/////
// create a custom static method
userSchema.statics.signup = async function (email, password) {
  // check if email exists in DB
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use. Use another email");
  }

  if (!email || !password) {
    throw Error("All Fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email Invalid ");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Make sure to use at least 8 characters, one upper case letter, a number and a special character"
    );
  }

  // if (!validator.isString(Firstname)) {
  //   throw Error("Need Firstname ");
  // }

  // if (!validator.isString(Lastname)) {
  //   throw Error("Need Lastname ");
  // }

  // salt the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

// static custom login method

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // check if user exists in Db

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("This email does not exist or incorrect email");
  }

  // check if the password matches
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);

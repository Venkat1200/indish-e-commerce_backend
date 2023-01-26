const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

//login the user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {}
};

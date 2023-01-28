const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "10h" });
};

//login the user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    // Create a Token

    const token = createToken(user._id);
    response.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup the User

const signupUser = async (req, res) => {
  // retreive the email and password of the body
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user.id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };

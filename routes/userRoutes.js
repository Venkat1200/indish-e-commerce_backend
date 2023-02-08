const express = require("express");

const {
  loginUser,
  signupUser,
  getUser,
} = require("../controllers/userControllers");

const app = express.Router();

//Login
app.post("/login", loginUser);

//SignUp

app.post("/signup", signupUser);

app.get("/", getUser);

module.exports = app;

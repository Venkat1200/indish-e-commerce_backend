const express = require("express");

const { loginUser, signupUser } = require("../controllers/userControllers");

const app = express.Router();

//Login
app.post("/login", loginUser);

//SignUp

app.post("/signup", signupUser);

module.exports = app;

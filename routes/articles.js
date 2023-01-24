const express = require("express");

const {
  getAllArticles,
  getOneArticle,
  createArticle,
} = require("../controllers/articleControllers");

const app = express.Router();

app.route("/").get(getAllArticles).post(createArticle);
app.route("/:id").get(getOneArticle);

module.exports = app;
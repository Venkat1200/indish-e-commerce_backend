const express = require("express");
const upload = require("../services/upload");
const {
  getAllArticles,
  getOneArticle,
  createArticle,
  deleteArticle,
  updateArticle,
} = require("../controllers/articleControllers");

const app = express.Router();

app.route("/").get(getAllArticles);
app.post("/", upload.single("picture"), createArticle);
app.route("/:id").get(getOneArticle).delete(deleteArticle).put(updateArticle);

module.exports = app;

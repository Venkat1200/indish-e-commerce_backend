const express = require("express");
const upload = require("../services/upload");
const {
  getAllArticles,
  getOneArticle,
  createArticle,
  deleteArticle,
  updateArticle,
  getByCategory,
} = require("../controllers/articleControllers");

const requireAuth = require("../middleware/requireAuth");

const app = express.Router();
app.use(requireAuth);

app.route("/").get(getAllArticles);
app.post("/", upload.single("picture"), createArticle);
app.route("/category").get(getByCategory);
app.route("/:id").get(getOneArticle).delete(deleteArticle).put(updateArticle);

module.exports = app;

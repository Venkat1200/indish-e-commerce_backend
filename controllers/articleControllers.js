// const mongoose = require("mongoose");

const { default: mongoose } = require("mongoose");
const Article = require("../Model/Article"); // 1. Ask Reagan is it Articles or Kitchen???

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneArticle = async (req, res) => {
  try {
    const { id } = req.params; // Not getting GET in the terminal
    const article = await Article.findById(id);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Creating one Article

const createArticle = async (req, res) => {
  const { title, price, category, description } = req.body;
  try {
    if (req.file && req.file.path) {
      const image = new Article({
        description,
        url: req.file.path,
        title,
        category,
        price,
      });
      await image.save();
      return res.status(200).json({ msg: "image successfully saved" });
    } else {
      console.log(req.file);
      return res.status(422).json({ error: "invalid" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "some error occured" });
  }
};

// Update one Article

const updateArticle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "no such article" });
  }
  try {
    const article = await Article.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) {
      return res.status(404).json({ error: "No such article" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ error: "no such article" });
  }
  const { id } = req.params;

  try {
    const article = await Article.findOneAndDelete({ id });
    if (!article) {
      return res.status(404).json({ error: "No such article" });
    }
    res.status(201).json(article);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
module.exports = {
  getAllArticles,
  getOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};

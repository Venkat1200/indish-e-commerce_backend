// const mongoose = require("mongoose");

const Article = require("../Model/Article"); // 1. Ask Reagan is it Articles or Kitchen???

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    console.log("REQ QUERY", category);
    const articles = await Article.find({ category: category });
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
  const { articleTitle, price, category } = req.body;
  try {
    if (req.file && req.file.path) {
      const article = new Article({
        url: req.file.path,
        articleTitle,
        category,
        price,
      });
      await article.save();
      return res.status(200).json(article);
    } else {
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
  getByCategory,
};

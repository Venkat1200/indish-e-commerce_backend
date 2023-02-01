// const mongoose = require("mongoose");

const Articles = require("../Model/Articles"); // 1. Ask Reagan is it Articles or Kitchen???

const getAllArticles = async (req, res) => {
  try {
    const articles = await Articles.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneArticle = async (req, res) => {
  try {
    const { id } = req.params; // Not getting GET in the terminal
    const article = await Articles.findById(id);
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Creating one Article

const createArticle = async (req, res) => {
  try {
    const { description, price, category, title, image } = req.body;
    const article = await Articles.create({
      description,
      price,
      category,
      title,
      image,
    });
    /// ASk REAGAN ABOUT THIS
    res.status(201).json(article);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

// Update one Article

const updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const { description, price, category, title, image } = req.body;
    const article = await Articles.findByIdAndUpdate(id, {
      description,
      price,
      category,
      title,
      image,
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Articles.findByIdAndDelete({ id });
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

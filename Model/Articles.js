const express = require("express");

const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    Pictures: {
      type: Array,
      required: true,
    },
  },
  {
    timrstamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);

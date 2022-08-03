const mongoose = require("mongoose");
const ratingSchema = require("./rating");
const { categorySchema } = require("../models/category");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  categoryid: {
    type: String,
    required: true,
  },
  subcategoryid: {
    type: String,
    required: true,
  },
  isDiscounted: {
    type: Boolean,
    default: false,
  },
  newPrice: {
      type: Number,
      required: true,
      default: 0
  },
  countInStock: {
      type: Number,
      required: true,
      default: 0
  },
  isFeatured: {
      type: Boolean,
      default: false,
  },
    ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };

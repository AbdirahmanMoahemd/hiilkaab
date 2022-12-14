const mongoose = require("mongoose");
const ratingSchema = require("./rating");

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
  sizes: [
    {
      type: String,
      
    }
  ],
  colors: [
    {
      type: Number,
      
    }
  ],
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
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
  },
  countInStock: {
      type: Number,
      required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
      type: Boolean,
      default: false,
  },
  rating: {
    type: Number,
    default: 0
  },
    ratings: [ratingSchema],
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product, productSchema };

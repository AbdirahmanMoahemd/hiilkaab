const mongoose = require("mongoose");
const ratingSchema = require("./rating");

const mealSchema = mongoose.Schema({
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
  ingredients:[
    {
      type: String,
      required: true,
    },
  ],
  storetype:{
    type: String,
    required: true,
  },
  restaurants: {
    type: String,
    required: true,
  },
  mealcategoryname: {
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
  status: {
      type: Boolean,
      default: false,
  },
  isFeatured: {
      type: Boolean,
      default: false,
  },
  ratings: [ratingSchema],
});

const Meal = mongoose.model("Meal", mealSchema);
module.exports = { Meal, mealSchema };

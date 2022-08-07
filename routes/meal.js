const express = require("express");
const mealRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { Meal } = require("../models/meal");

// get all meals
mealRouter.get("/api/meals/", auth, async (req, res) => {
    try {
      const meals = await Meal.find();
      res.json(meals);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  
});


// Add product
mealRouter.post("/admin/add-meal", admin, async (req, res) => {
    try {
      const { name, description, images, countInStock,status, price, mealcategoryid, mealcategoryname,isDiscounted,newPrice,isFeatured  } = req.body;
  
      let meal = new Meal({
        name,
        description,
        images,
        countInStock,
        status,
        price,
        mealcategoryid,
        mealcategoryname,
        isDiscounted,
        newPrice,
        isFeatured
      });
      meal = await meal.save();
      res.json(meal);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });


module.exports = mealRouter;

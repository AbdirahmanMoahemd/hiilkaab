const express = require("express");
const mealcategoryRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { MealCategory } = require("../models/meal_category");

// get mealcategoryRouter
mealcategoryRouter.get("/api/mealcategory/", auth, async (req, res) => {
    try {

      const mealcategory = await MealCategory.find();

      res.json(mealcategory);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


// Add mealcategoryRouter
mealcategoryRouter.post("/admin/add-mealcategory", admin, async (req, res) => {
    try {
      const { names ,restaurant } = req.body;
  
      let mealcategory = new MealCategory({
        names,
        restaurant
      });
      mealcategory = await mealcategory.save();
      res.json(mealcategory);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


mealcategoryRouter.put("/admin/update-mealcategory", admin, async (req, res) => {
  try {
    const  {id, name ,restaurant} = req.body; 
    let mealcategory = await MealCategory.findById(id);
    if(mealcategory){
        mealcategory.name = name;
        mealcategory.restaurant = restaurant;
        mealcategory = await mealcategory.save();
        res.json(mealcategory);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});


// Delete the mealcategory
mealcategoryRouter.post("/admin/delete-mealcategory", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let mealcategory = await MealCategory.findByIdAndDelete(id);
    res.json(mealcategory);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = mealcategoryRouter;
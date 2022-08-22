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

mealRouter.get("/api/meals/:id", async (req, res) => {
  try {
    const meals = await Meal.findById(req.params.id);

    if(meals){
      res.json(meals);
    }

    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

mealRouter.get("/api/meals/storetype", async (req, res) => {
  try {
    const meals = await Meal.find(req.params.storetype);

    if(meals){
      res.json(meals);
    }

    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Add product
mealRouter.post("/admin/add-meal", admin, async (req, res) => {
    try {
      const { name, description, images, ingredients,storetype,status, price, restaurants, mealcategoryname,isDiscounted,newPrice,isFeatured  } = req.body;
  
      let meal = new Meal({
        name,
        description,
        images,
        status,
        price,
        storetype,
        ingredients,
        restaurants,
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

mealRouter.put("/admin/update-meal", admin, async (req, res) => {
    try {
      const { id, name, description, images, ingredients,status,storetype, price, restaurants, mealcategoryname,isDiscounted,newPrice,isFeatured  } = req.body;
      let meal = await Meal.findById(id)
      if(meal){
        meal.name=name
        meal.description=description
        meal.images=images
        meal.status=status
        meal.price=price
        meal.storetype=storetype
        meal.ingredients=ingredients
        meal.restaurants=restaurants
        meal.mealcategoryname=mealcategoryname
        meal.isDiscounted=isDiscounted
        meal.newPrice=newPrice
        meal.isFeatured=isFeatured
        meal = await meal.save(); 
        res.json(meal);
      }
      else {
        res.status(404)
        throw new Error('meal Not Found')
    }
      
      
     
    } catch (e) {
      res.status(404).json({ error: 'meal Not Found'+e.message });
    }
  });


  // Delete the meal
  mealRouter.post("/admin/delete-meal", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let meal = await Meal.findByIdAndDelete(id);
    res.json(meal);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = mealRouter;

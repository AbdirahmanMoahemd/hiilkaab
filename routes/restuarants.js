const express = require("express");
const restaurantRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { Restaurant } = require("../models/restaurants");

// get restaurant
restaurantRouter.get("/api/restaurants/", auth, async (req, res) => {
    try {
      const restaurants = await Restaurant.find();
      res.json(restaurants);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


// Add restaurant
restaurantRouter.post("/admin/add-restaurant", admin, async (req, res) => {
    try {
      const { name,logo,banner,location,time,status,message,mealCategoryname  } = req.body;
  
      let restaurant = new Restaurant({
        name,
        logo,
        banner,
        location,
        time,
        status,
        message,
        mealCategoryname
        
      });
      restaurant = await restaurant.save();
      res.json(restaurant);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


restaurantRouter.put("/admin/update-restaurant", admin, async (req, res) => {
  try {
    const  {id, name,logo,banner,location,time,status,message,mealCategoryname} = req.body; 
    let restaurant = await Restaurant.findById(id);
    if(store){
        restaurant.name = name;
        restaurant.logo = logo;
        restaurant.banner = banner;
        restaurant.location = location;
        restaurant.time = time;
        restaurant.status = status;
        restaurant.message = message;
        restaurant.mealCategoryname=mealCategoryname
        restaurant = await restaurant.save();
        res.json(restaurant);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});


// Delete the restaurant
restaurantRouter.post("/admin/delete-restaurant", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let restaurant = await Restaurant.findByIdAndDelete(id);
    res.json(restaurant);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = restaurantRouter;

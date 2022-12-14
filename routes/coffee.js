const express = require("express");
const coffeeRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { Coffee } = require("../models/coffee");

// get coffee
coffeeRouter.get("/api/coffees/", async (req, res) => {
    try {
      const coffees = await Coffee.find();
      res.json(coffees);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});

coffeeRouter.get("/coffees/search/:name", async (req, res) => {
  try {
    const coffees = await Coffee.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    if(coffees){
      res.json(coffees);

    }

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


coffeeRouter.get("/api/coffees/:id", async (req, res) => {
  try {
    const coffee = await Coffee.findById(req.params.id);

    if(coffee){
      res.json(coffee);
    }
    
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// Add coffee
coffeeRouter.post("/admin/add-coffee", admin, async (req, res) => {
    try {
      const { name,logo,banner,location,time,status,message } = req.body;
  
      let coffee = new Coffee({
        name,
        logo,
        banner,
        location,
        time,
        status,
        message,
        
      });
      coffee = await coffee.save();
      res.json(coffee);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


coffeeRouter.put("/admin/update-coffee", admin, async (req, res) => {
  try {
    const  {id, name,logo,banner,location,time,status,message} = req.body; 
    let coffee = await Coffee.findById(id);
    if(coffee){
        coffee.name = name;
        coffee.logo = logo;
        coffee.banner = banner;
        coffee.location = location;
        coffee.time = time;
        coffee.status = status;
        coffee.message = message;
        coffee = await coffee.save();
        res.json(coffee);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});


// Delete the coffee
coffeeRouter.post("/admin/delete-coffee", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let coffee = await Coffee.findByIdAndDelete(id);
    res.json(coffee);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


coffeeRouter.post("/api/rate-coffee", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;
    let coffee = await Coffee.findById(id);

    for (let i = 0; i < coffee.ratings.length; i++) {
      if (coffee.ratings[i].userId == req.user) {
        coffee.ratings.splice(i, 1);
        break;
      }
    }

    const ratingSchema = {
      userId: req.user,
      rating,
    };

    coffee.ratings.push(ratingSchema);
    coffee.rating = rating;
    coffee = await coffee.save();
    res.json(coffee);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = coffeeRouter;

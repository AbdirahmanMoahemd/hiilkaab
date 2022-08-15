const express = require("express");
const sweetsRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { Sweets } = require("../models/sweets");

// get sweets
sweetsRouter.get("/api/sweets/", auth, async (req, res) => {
    try {
      const sweetss = await Sweets.find();
      res.json(sweetss);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


// Add sweets
sweetsRouter.post("/admin/add-sweets", admin, async (req, res) => {
    try {
      const { name,logo,banner,location,time,status,message } = req.body;
  
      let sweets = new Sweets({
        name,
        logo,
        banner,
        location,
        time,
        status,
        message,
        
      });
      sweets = await sweets.save();
      res.json(sweets);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


sweetsRouter.put("/admin/update-sweets", admin, async (req, res) => {
  try {
    const  {id, name,logo,banner,location,time,status,message} = req.body; 
    let sweets = await Sweets.findById(id);
    if(store){
        sweets.name = name;
        sweets.logo = logo;
        sweets.banner = banner;
        sweets.location = location;
        sweets.time = time;
        sweets.status = status;
        sweets.message = message;
        sweets = await sweets.save();
        res.json(sweets);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});


// Delete the sweets
sweetsRouter.post("/admin/delete-sweets", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let sweets = await Sweets.findByIdAndDelete(id);
    res.json(sweets);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


module.exports = sweetsRouter;

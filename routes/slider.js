const express = require("express");
const admin = require("../middlewares/admin");
const sliderRouter = express.Router();
const auth = require("../middlewares/auth");
const { Sliders } = require("../models/slider");

sliderRouter.get("/api/slider", async (req, res) => {
  try {
    const sliders = await Sliders.find({});
    res.json(sliders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




sliderRouter.post("/admin/add-slider", admin, async (req, res) => {
    try {
      const { images} = req.body;
     

    
      let slider = new Sliders({
       images
        
      });
      slider = await slider.save();
      res.json(slider);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


sliderRouter.put("/admin/update-slider", admin, async (req, res) => {
  try {
    const  {id,images} = req.body; 
    let slider = await Sliders.findById(id);
    if(slider){
        slider.images = images;
        slider = await slider.save();
        res.json(slider);
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});



// Delete the product
sliderRouter.post("/admin/delete-slider", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let slider = await Sliders.findByIdAndDelete(id);
    res.json(slider);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});





module.exports = sliderRouter;

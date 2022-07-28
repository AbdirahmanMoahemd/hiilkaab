const express = require("express");
const admin = require("../middlewares/admin");
const subcategoryRouter = express.Router();
const auth = require("../middlewares/auth");
const { SubCategory } = require("../models/subcategory");

subcategoryRouter.get("/api/subcategory", async (req, res) => {
  try {
    const subcategories = await SubCategory.find({  });
    res.json(subcategories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


subcategoryRouter.post("/admin/add-subcategory", admin, async (req, res) => {
    try {
      const { name, category} = req.body;
      let subcategory = new SubCategory({
        name,
        category,
        
      });
      subcategory = await subcategory.save();
      res.json(subcategory);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  subcategoryRouter.post("/admin/update-subcategory", admin, async (req, res) => {
    try {
      const  {id, name, category} = req.body; 
      let subcategory = await SubCategory.findById(id);
      if(subcategory){
          subcategory.name = name;
          subcategory.category = category;
          subcategory = await subcategory.save();
          res.json(subcategory);
      }
    } catch (e) {
      res.status(404).json({ error: e.message });
    }
  });
  
  
  
  // Delete the product
  subcategoryRouter.post("/admin/delete-subcategory", admin, async (req, res) => {
    try {
      const { id } = req.body;
      let subcategory = await SubCategory.findByIdAndDelete(id);
      res.json(subcategory);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
  





module.exports = subcategoryRouter;

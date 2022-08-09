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
      const { name,categoryid, category,} = req.body;
      const SubCategoryExists = await SubCategory.findOne({ name })

      if (SubCategoryExists) {
          res.status(400)
          throw new Error('SubCategory already exists')
      }
      let subcategory = new SubCategory({
        name,
        categoryid,
        category,
        
      });
      subcategory = await subcategory.save();
      res.json(subcategory);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  subcategoryRouter.put("/admin/update-subcategory", admin, async (req, res) => {
    try {
      const  {id, name,categoryid, category} = req.body; 
      let subcategory = await SubCategory.findById(id);
      if(subcategory){
          subcategory.name = name;
          subcategory.categoryid=categoryid
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

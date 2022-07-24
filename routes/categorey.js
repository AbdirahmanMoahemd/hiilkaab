const express = require("express");
const admin = require("../middlewares/admin");
const categoryRouter = express.Router();
const auth = require("../middlewares/auth");
const { Category } = require("../models/category");

categoryRouter.get("/api/category/", auth, async (req, res) => {
  try {
    const categories = await Category.find({  });
    res.json(categories);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


categoryRouter.post("/admin/add-category", admin, async (req, res) => {
    try {
      const { name, icon} = req.body;
      let category = new Category({
        name,
        icon,
        
      });
      category = await category.save();
      res.json(category);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });





module.exports = categoryRouter;

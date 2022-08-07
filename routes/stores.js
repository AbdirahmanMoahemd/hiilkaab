const express = require("express");
const storeRouter = express.Router();
const admin = require("../middlewares/admin");
const auth = require("../middlewares/auth");
const { Store } = require("../models/stores");

// get store
storeRouter.get("/api/store/", auth, async (req, res) => {
    try {
      const stores = await Store.find();
      res.json(stores);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});


// Add store
storeRouter.post("/admin/add-store", admin, async (req, res) => {
    try {
      const { name,storetype,status, message  } = req.body;
  
      let store = new Store({
        name,
        storetype,
        status,
        message
        
      });
      store = await store.save();
      res.json(store);

    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});

module.exports = storeRouter;

const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const { Meal } = require("../models/meal");
const Order = require("../models/order");
const { Product } = require("../models/product");
const User = require("../models/user");
const admin = require("../middlewares/admin");

userRouter.post("/api/add-to-cart", auth, async (req, res) => {
  try {
    const { id, sizes, colors } = req.body;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    if (user.cart.length == 0) {
      user.cart.push({ product, quantity: 1, sizes, colors });
    } else {
      let isProductFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].product._id.equals(product._id)) {
          isProductFound = true;
        }
        else{
          return res.status(400).json({ msg: "this product not available in our store. please remove it from your cart" });
        }
      }

      if (isProductFound) {
        let producttt = user.cart.find((productt) =>
          productt.product._id.equals(product._id)
        );
        producttt.quantity += 1;
      } else {
        user.cart.push({ product, quantity: 1,sizes, colors });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



userRouter.delete("/api/remove-cartitem", auth, async (req, res) => {
    try {
      const { index } = req.body;
      // const product = await Product.findById(id);
      let user = await User.findById(req.user);
  
      // for (let i = 0; i < user.cart.length; i++) {
        // if (user.cart[i].product._id.equals(product._id)) {
          // if (user.cart[i].quantity == 1) {
            user.cart.splice(index, 1);
          // } else {
          //   user.cart[i].quantity -= 1;
          // }
        // }
      // }
      user = await user.save();
      res.json(user);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
});




userRouter.post("/api/add-to-cartMeal", auth, async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const meal = await Meal.findById(id);
    let user = await User.findById(req.user);

    if (user.cartMeal.length == 0) {
      user.cartMeal.push({ meal, quantity: quantity });
    } else {
      let isMealFound = false;
      for (let i = 0; i < user.cartMeal.length; i++) {
        if (user.cartMeal[i].meal._id.equals(meal._id)) {
          isMealFound = true;
        }
        else{
          return res.status(400).json({ msg: "this meal not available in our store. please remove it from your cart" });
        }
      }

      if (isMealFound) {
        let producttt = user.cartMeal.find((productt) =>
          productt.meal._id.equals(meal._id)
        );
        producttt.quantity += 1;
      } else {
       user.cartMeal.push({ meal, quantity: quantity });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



userRouter.post("/api/increas-from-cartMeal", auth, async (req, res) => {
  try {
    const { id } = req.body;
    const meal = await Meal.findById(id);
    let user = await User.findById(req.user);

    if (user.cartMeal.length == 0) {
      user.cartMeal.push({ meal, quantity: 1 });
    } else {
      let isMealFound = false;
      for (let i = 0; i < user.cartMeal.length; i++) {
        if (user.cartMeal[i].meal._id.equals(meal._id)) {
          isMealFound = true;
        }
        else{
          return res.status(400).json({ msg: "this meal not available in our store. please remove it from your cart" });
        }
        
      }

      if (isMealFound) {
        let producttt = user.cartMeal.find((productt) =>
          productt.meal._id.equals(meal._id)
        );
        producttt.quantity += 1;
      } else {
       user.cartMeal.push({ meal, quantity: 1 });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




userRouter.delete("/api/remove-from-cart/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    let user = await User.findById(req.user);

    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].product._id.equals(product._id)) {
        if (user.cart[i].quantity == 1) {
          user.cart.splice(i, 1);
        } else {
          user.cart[i].quantity -= 1;
        }
      }
      else{
        return res.status(400).json({ msg: "this product not available in our store. please remove it from your cart" });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




userRouter.delete("/api/remove-from-cartMeal/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id);
    let user = await User.findById(req.user);

    for (let i = 0; i < user.cartMeal.length; i++) {
      if (user.cartMeal[i].meal._id.equals(meal._id)) {
        if (user.cartMeal[i].quantity == 1) {
          user.cartMeal.splice(i, 1);
        } else {
          user.cartMeal[i].quantity -= 1;
        }
      }
      else{
        return res.status(400).json({ msg: "this meal not available in our store. please remove it from your cart" });
      }
    }
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});



// save user address
userRouter.post("/api/save-user-address", auth, async (req, res) => {
  try {
    const { address } = req.body;
    let user = await User.findById(req.user);
    user.address = address;
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});




// order product
userRouter.post("/api/order", auth, async (req, res) => {
  try {
    const { userName,userPhone, cart,cartMeal,paymentMethod, shippingPrice,totalPrice, address } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.countInStock >= cart[i].quantity) {
        product.countInStock -= cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity, });
        await product.save();
      } else {
        return res
          .status(400)
          .json({ msg: `${product.name} is out of stock!` });
      }
    }

    let meals = [];

    for (let i = 0; i < cartMeal.length; i++) {
      let meal = await Meal.findById(cartMeal[i].meal._id);
      if (meal.quantity >= cartMeal[i].quantity) {
        meal.quantity -= cartMeal[i].quantity;
        meals.push({ meal, quantity: cartMeal[i].quantity, sizes:cart[i].sizes, colors: cart[i].colors });
        await meal.save();
      } else {
        return res
          .status(400)
          .json({ msg: `${meal.name} is out of stock!` });
      }
    }

    let user = await User.findById(req.user);
    user.cart = [];
    user.cartMeal = [];
    user = await user.save();

    let order = new Order({
      products,
      meals,
      shippingPrice,
      paymentMethod,
      totalPrice,
      address,
      userId: req.user,
      userName: userName,
      userPhone: userPhone,
      orderedAt: new Date().getTime(),
    });
    order = await order.save();
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});







userRouter.post("/api/order/cod", auth, async (req, res) => {
  try {
    const { userName,userPhone, cart,cartMeal,paymentMethod, shippingPrice, totalPrice, address } = req.body;
    let products = [];

    for (let i = 0; i < cart.length; i++) {
      let product = await Product.findById(cart[i].product._id);
      if (product.countInStock >= cart[i].quantity) {
        product.countInStock -= cart[i].quantity;
        products.push({ product, quantity: cart[i].quantity,sizes:cart[i].sizes, colors: cart[i].colors });
        await product.save();
      } else {
        return res
          .status(400)
          .json({ msg: `${product.name} is out of stock!` });
      }
    }

    let meals = [];

    for (let i = 0; i < cartMeal.length; i++) {
      let meal = await Meal.findById(cartMeal[i].meal._id);
      // if (meal.quantity >= cartMeal[i].quantity) {
      //   meal.quantity -= cartMeal[i].quantity;
        meals.push({ meal, quantity: cartMeal[i].quantity });
        await meal.save();
      // } else {
      //   return res
      //     .status(400)
      //     .json({ msg: `${meal.name} is out of stock!` });
      // }
    }

    let user = await User.findById(req.user);
    user.cart = [];
    user.cartMeal = [];
    user = await user.save();

    let order = new Order({
      products,
      meals,
      shippingPrice,
      paymentMethod,
      totalPrice,
      address,
      userId: req.user,
      userName: userName,
      userPhone: userPhone,
      orderedAt: new Date().getTime(),
    });
    order = await order.save();
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

userRouter.get("/api/orders/me", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = userRouter;

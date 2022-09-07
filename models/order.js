const mongoose = require("mongoose");
const { mealSchema } = require("./meal");
const { productSchema } = require("./product");

const orderSchema = mongoose.Schema(
  {
    userId: {
      required: true,
      type: String,
    },
    products: [
      {
        product: productSchema,
        quantity: {
          type: Number,
          required: true,
        },
        sizes: [
          {
            type: String,
          },
        ],
        colors: [
          {
            type: Number,
          },
        ],
      },
    ],
    meals: [
      {
        meal: mealSchema,
        quantity: {
          type: Number,
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_adress: { type: String },
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

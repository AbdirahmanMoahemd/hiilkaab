const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  user: {
      type: String,
      required: true,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      productid: {
        type: String,
        required: true,
      },
    },
  ],
  shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      country: {type: String, required: true}
  },
  paymentMethod: {
      type: String,
      required: true,
  },
  paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_adress: {type: String}
  },
  shippingPrice: {
      type: Number,
      required: true,
      default:0.0
  },
  totalPrice: {
      type: Number,
      required: true,
      default:0.0
  },
  isPaid: {
      type: Boolean,
      required: true,
      default: false
  },
  paidAt: {
      type: Date
  },
  date: {
      type: String
  }, 
  isDelivered: {
      type: Boolean,
      required: true,
      default: false
  },
  deliveredAt: {
      type: Date
  },
  
  
}, {
  timestamps: true
})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

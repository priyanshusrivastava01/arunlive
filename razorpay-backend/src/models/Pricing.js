const mongoose = require("mongoose");

const PricingSchema = new mongoose.Schema({
  name: String,
  price: String,
  subtitle: String,
  duration: String,
  features: [String],
  audience: [String],
  paymentLink: String,
  popular: Boolean,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model("Pricing", PricingSchema);

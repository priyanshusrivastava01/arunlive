const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model("Service", ServiceSchema);

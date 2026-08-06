const mongoose = require("mongoose");

const SocialSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String,
  order: Number,
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Social", SocialSchema);

const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  imageUrl: String,
  altText: String,
  order: Number,
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Logo", LogoSchema);

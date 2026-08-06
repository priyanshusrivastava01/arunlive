const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  title: String,
  paragraph1: String,
  paragraph2: String,
  image: String
}, { timestamps: true });

module.exports = mongoose.model("About", AboutSchema);

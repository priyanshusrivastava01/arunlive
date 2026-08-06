const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
  name: String,
  subtitle: String,
  photo: String,
  copyright: String,
  description: String,
  links: [{
    label: String,
    url: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Footer", FooterSchema);

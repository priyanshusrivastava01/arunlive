const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  cta1Text: String,
  cta1Section: {
    type: String,
    default: "services"
  },
  cta1Color: {
    type: String,
    default: "#4f46e5"
  },
  cta1TextColor: {
    type: String,
    default: "#ffffff"
  },
  cta2Text: String,
  cta2Section: {
    type: String,
    default: "pricing"
  },
  cta2Color: {
    type: String,
    default: "#ffffff"
  },
  cta2TextColor: {
    type: String,
    default: "#000000"
  },
  cta2BorderColor: {
    type: String,
    default: "#000000"
  },
  image: String,
  textColor: String,
  bgColor: String,
  cardBgColor: String,
  circleBgColor: String
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);

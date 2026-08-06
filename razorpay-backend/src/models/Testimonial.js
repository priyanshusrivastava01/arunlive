const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: String,
  country: String,
  title: String,
  date: String,
  text: String,
  rating: Number,
  img: String,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", TestimonialSchema);

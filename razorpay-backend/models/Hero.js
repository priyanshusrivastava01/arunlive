import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  ctaText: String,
  ctaTarget: String, // section id
  image: String,
});

export default mongoose.models?.Hero || mongoose.model('Hero', heroSchema);

import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String },
    subtitle: { type: String },
    content: { type: String },
    imageUrl: { type: String },
    extraData: { type: Object }
  },
  { timestamps: true }
);

export const Section = mongoose.model("Section", sectionSchema);

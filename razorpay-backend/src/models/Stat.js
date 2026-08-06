const mongoose = require("mongoose");

const StatSchema = new mongoose.Schema({
  value: String,
  label: String,
  order: Number,
  tagline: String,
  missionStatement: String,
  valueColor: { type: String, default: "#ffffff" },
  labelColor: { type: String, default: "#9ca3af" },
  bgColor: { type: String, default: "#1a1a1a" },
  borderColor: { type: String, default: "transparent" },
  taglineColor: { type: String, default: "#d1d5db" },
  missionStatementColor: { type: String, default: "#ffffff" }
}, { timestamps: true });

module.exports = mongoose.model("Stat", StatSchema);

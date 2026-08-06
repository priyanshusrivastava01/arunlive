const Social = require("../models/Social");

// Get all socials
exports.getSocials = async (req, res) => {
  try {
    const socials = await Social.find().sort({ order: 1 });
    res.json(socials);
  } catch (err) {
    res.status(500).json({ message: "Error fetching socials" });
  }
};

// Add new social
exports.addSocial = async (req, res) => {
  try {
    const { platform, url, icon } = req.body;
    
    if (!platform || !url) {
      return res.status(400).json({ message: "Platform and URL are required" });
    }

    const newSocial = new Social({
      platform,
      url,
      icon,
      order: await Social.countDocuments()
    });

    await newSocial.save();
    res.status(201).json(newSocial);
  } catch (err) {
    console.error("Error adding social:", err);
    res.status(500).json({ message: "Error adding social link" });
  }
};

// Delete social
exports.deleteSocial = async (req, res) => {
  try {
    await Social.findByIdAndDelete(req.params.id);
    res.json({ message: "Social deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting social" });
  }
};

// Update social
exports.updateSocial = async (req, res) => {
  try {
    const social = await Social.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(social);
  } catch (err) {
    res.status(500).json({ message: "Error updating social" });
  }
};

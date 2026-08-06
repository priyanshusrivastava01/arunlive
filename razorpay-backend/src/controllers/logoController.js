const Logo = require("../models/Logo");

exports.getLogos = async (req, res) => {
  try {
    const docs = await Logo.find({ active: true }).sort({ order: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logos", err });
  }
};

exports.addLogo = async (req, res) => {
  try {
    const logo = new Logo(req.body);
    await logo.save();
    res.json(logo);
  } catch (err) {
    res.status(500).json({ message: "Error creating logo", err });
  }
};

exports.deleteLogo = async (req, res) => {
  try {
    await Logo.findByIdAndDelete(req.params.id);
    res.json({ message: "Logo deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting logo", err });
  }
};

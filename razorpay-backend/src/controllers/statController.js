const Stat = require("../models/Stat");

exports.getStats = async (req, res) => {
  try {
    const docs = await Stat.find({}).sort({ order: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", err });
  }
};

exports.addStat = async (req, res) => {
  try {
    const stat = new Stat(req.body);
    await stat.save();
    res.json(stat);
  } catch (err) {
    res.status(500).json({ message: "Error creating stat", err });
  }
};

exports.deleteStat = async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ message: "Stat deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting stat", err });
  }
};

exports.updateStat = async (req, res) => {
  try {
    const { value, label, tagline, missionStatement, valueColor, labelColor, bgColor, borderColor, taglineColor, missionStatementColor } = req.body;

    if (!value || !label) {
      return res.status(400).json({ message: "Value and label are required" });
    }

    const stat = await Stat.findByIdAndUpdate(
      req.params.id,
      { 
        value, 
        label, 
        tagline, 
        missionStatement,
        valueColor,
        labelColor,
        bgColor,
        borderColor,
        taglineColor,
        missionStatementColor
      },
      { new: true }
    );

    if (!stat) {
      return res.status(404).json({ message: "Stat not found" });
    }

    res.json(stat);
  } catch (err) {
    res.status(500).json({ message: "Error updating stat", error: err.message });
  }
};

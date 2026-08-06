const Pricing = require("../models/Pricing");

exports.getPricing = async (req, res) => {
  try {
    const plans = await Pricing.find().sort({ order: 1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pricing" });
  }
};

exports.addPricing = async (req, res) => {
  try {
    const {
      name,
      price,
      subtitle,
      duration,
      features,
      audience,
      popular,
      paymentLink,
      order
    } = req.body;

    const plan = new Pricing({
      name,
      price,
      subtitle,
      duration,
      features,
      audience,
      popular,
      paymentLink,
      order
    });

    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating pricing plan" });
  }
};

exports.updatePricing = async (req, res) => {
  try {
    const {
      name,
      price,
      subtitle,
      duration,
      features,
      audience,
      popular,
      paymentLink,
      order
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const plan = await Pricing.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        subtitle,
        duration,
        features,
        audience,
        popular,
        paymentLink,
        order
      },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ message: "Pricing plan not found" });
    }

    res.status(200).json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating pricing plan" });
  }
};

exports.deletePricing = async (req, res) => {
  try {
    const plan = await Pricing.findByIdAndDelete(req.params.id);
    
    if (!plan) {
      return res.status(404).json({ message: "Pricing plan not found" });
    }

    res.json({ message: "Pricing plan deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting pricing plan" });
  }
};

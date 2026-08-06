const Service = require("../models/Service");

exports.getServices = async (req, res) => {
  try {
    const docs = await Service.find({}).sort({ order: 1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services", err });
  }
};

exports.addService = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const service = new Service({
      title,
      description,
      icon: icon || ""
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error("Service create error:", err);
    res.status(500).json({ message: "Error creating service", error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting service", err });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, icon: icon || "" },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (err) {
    console.error("Service update error:", err);
    res.status(500).json({ message: "Error updating service", error: err.message });
  }
};

const About = require("../models/About");

exports.getAbout = async (req, res) => {
  try {
    const doc = await About.findOne({});
    console.log("✅ About fetched - ID:", doc?._id, "Title:", doc?.title);
    
    // Always return object with explicit fields
    if (doc) {
      res.json({
        _id: doc._id,
        title: doc.title,
        paragraph1: doc.paragraph1,
        paragraph2: doc.paragraph2,
        image: doc.image,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      });
    } else {
      res.json({});
    }
  } catch (err) {
    console.error("❌ Error fetching about:", err);
    res.status(500).json({ message: "Error fetching about", error: err.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const { title, paragraph1, paragraph2, image } = req.body;
    console.log("📝 Creating about with:", { title, paragraph1, paragraph2, image });
    const doc = new About({ title, paragraph1, paragraph2, image });
    await doc.save();
    console.log("✅ About created - ID:", doc._id, "Title:", doc.title);
    
    res.status(201).json({
      _id: doc._id,
      title: doc.title,
      paragraph1: doc.paragraph1,
      paragraph2: doc.paragraph2,
      image: doc.image,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  } catch (err) {
    console.error("❌ Error creating about:", err);
    res.status(500).json({ message: "Error creating about", error: err.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { title, paragraph1, paragraph2, image } = req.body;
    const updateData = { title, paragraph1, paragraph2, image };
    console.log("🔄 Updating about with ID:", req.params.id, "Data:", updateData);
    
    // If ID provided in params, update that specific doc. Otherwise update first doc.
    let doc;
    if (req.params.id) {
      doc = await About.findByIdAndUpdate(req.params.id, updateData, { new: true });
    } else {
      doc = await About.findOneAndUpdate({}, updateData, { upsert: true, new: true });
    }
    
    console.log("✅ About updated - ID:", doc?._id, "Title:", doc?.title);
    res.json({
      _id: doc._id,
      title: doc.title,
      paragraph1: doc.paragraph1,
      paragraph2: doc.paragraph2,
      image: doc.image,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    });
  } catch (err) {
    console.error("❌ Error updating about:", err);
    res.status(500).json({ message: "Error updating about", error: err.message });
  }
};

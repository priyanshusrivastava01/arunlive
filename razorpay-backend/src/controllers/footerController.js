const Footer = require("../models/Footer");

// Get footer
exports.getFooter = async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer({
        name: "Your Name",
        subtitle: "Your Subtitle",
        copyright: "© 2024 All rights reserved",
        description: "Company description",
        links: []
      });
      await footer.save();
    }
    res.json(footer);
  } catch (err) {
    res.status(500).json({ message: "Error fetching footer" });
  }
};

// Update footer
exports.updateFooter = async (req, res) => {
  try {
    const { name, subtitle, photo, copyright, description, links } = req.body;
    
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer();
    }

    if (name) footer.name = name;
    if (subtitle) footer.subtitle = subtitle;
    if (photo) footer.photo = photo;
    if (copyright) footer.copyright = copyright;
    if (description) footer.description = description;
    if (links) footer.links = links;

    await footer.save();
    res.json(footer);
  } catch (err) {
    console.error("Error updating footer:", err);
    res.status(500).json({ message: "Error updating footer" });
  }
};

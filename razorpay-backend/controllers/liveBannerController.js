import LiveBanner from '../models/LiveBanner.js';

// GET (website)
export const getLiveBanner = async (req, res) => {
  try {
    const banner = await LiveBanner.findOne();
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch banner" });
  }
};

// UPDATE (admin)
export const updateLiveBanner = async (req, res) => {
  try {
    const data = req.body;

    const banner = await LiveBanner.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: "Failed to update banner" });
  }
};

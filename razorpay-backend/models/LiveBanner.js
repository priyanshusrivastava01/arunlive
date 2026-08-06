import mongoose from 'mongoose';

const LiveBannerSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: true },
  badgeText: { type: String, default: "LIVE TODAY" },
  title: { type: String, required: true },
  subtitle: { type: String },
  viewersEnabled: { type: Boolean, default: true },
  viewersCount: { type: Number, default: 61 },
}, { timestamps: true });

export default mongoose.models?.LiveBanner || mongoose.model('LiveBanner', LiveBannerSchema);

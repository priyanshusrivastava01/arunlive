require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");

// CORS configuration
app.use(cors({
  origin: "*", // later we can restrict
  credentials: true,
}));

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// SEO-friendly headers
app.use((req, res, next) => {
  res.setHeader("X-Robots-Tag", "index, follow");
  next();
});

// Routes
const authRoutes = require("./routes/auth");
const heroRoutes = require("./routes/hero");
const aboutRoutes = require("./routes/about");
const statRoutes = require("./routes/stat");
const serviceRoutes = require("./routes/service");
const pricingRoutes = require("./routes/pricing");
const testimonialRoutes = require("./routes/testimonial");
const logoRoutes = require("./routes/logo");
const socialRoutes = require("./routes/social");
const footerRoutes = require("./routes/footer");
const uploadRoutes = require("./routes/upload");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/logos", logoRoutes);
app.use("/api/socials", socialRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/upload", uploadRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// Port configuration
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}).catch(err => {
  console.error("Failed to connect DB", err);
  process.exit(1);
});

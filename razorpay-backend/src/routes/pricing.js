const express = require("express");
const router = express.Router();
const { getPricing, addPricing, deletePricing, updatePricing } = require("../controllers/pricingController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getPricing);
router.post("/", adminOnly, addPricing);
router.put("/:id", adminOnly, updatePricing);
router.delete("/:id", adminOnly, deletePricing);

module.exports = router;

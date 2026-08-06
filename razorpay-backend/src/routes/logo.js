const express = require("express");
const router = express.Router();
const { getLogos, addLogo, deleteLogo } = require("../controllers/logoController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getLogos);
router.post("/", adminOnly, addLogo);
router.delete("/:id", adminOnly, deleteLogo);

module.exports = router;

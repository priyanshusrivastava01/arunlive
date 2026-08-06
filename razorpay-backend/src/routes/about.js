const express = require("express");
const router = express.Router();
const { getAbout, createAbout, updateAbout } = require("../controllers/aboutController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getAbout);
router.post("/", adminOnly, createAbout);
router.put("/", adminOnly, updateAbout);
router.put("/:id", adminOnly, updateAbout);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getFooter, updateFooter } = require("../controllers/footerController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getFooter);
router.put("/", adminOnly, updateFooter);

module.exports = router;

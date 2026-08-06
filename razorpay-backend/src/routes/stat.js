const express = require("express");
const router = express.Router();
const { getStats, addStat, deleteStat, updateStat } = require("../controllers/statController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getStats);
router.post("/", adminOnly, addStat);
router.put("/:id", adminOnly, updateStat);
router.delete("/:id", adminOnly, deleteStat);

module.exports = router;

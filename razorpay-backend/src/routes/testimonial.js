const express = require("express");
const router = express.Router();
const c = require("../controllers/testimonialController");
const { adminOnly } = require("../middleware/auth");

router.get("/", c.getAll);
router.post("/", adminOnly, c.create);
router.delete("/:id", adminOnly, c.remove);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getSocials, addSocial, deleteSocial, updateSocial } = require("../controllers/socialController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getSocials);
router.post("/", adminOnly, addSocial);
router.delete("/:id", adminOnly, deleteSocial);
router.put("/:id", adminOnly, updateSocial);

module.exports = router;

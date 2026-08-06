const express = require("express");
const router = express.Router();
const { getServices, addService, deleteService, updateService } = require("../controllers/serviceController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getServices);
router.post("/", adminOnly, addService);
router.put("/:id", adminOnly, updateService);
router.delete("/:id", adminOnly, deleteService);

module.exports = router;

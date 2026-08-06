const router = require("express").Router();
const c = require("../controllers/heroController");
const { adminOnly } = require("../middleware/auth");

router.get("/", c.getHero);
router.put("/", adminOnly, c.updateHero);

module.exports = router;

const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, deleteUser } = require("../controllers/authController");

router.get("/users", getAllUsers);
router.delete("/users/:email", deleteUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;

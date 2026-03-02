const express = require("express");
const router = express.Router();
const ctrlAuth = require("../controllers/auth");

router.post("/register", ctrlAuth.register); // mock/admin setup
router.post("/login", ctrlAuth.login);

module.exports = router;
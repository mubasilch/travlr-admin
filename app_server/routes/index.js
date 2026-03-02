const express = require("express");
const router = express.Router();

const ctrlMain = require("../controllers/main");

router.get("/", ctrlMain.home);
router.get("/travel", ctrlMain.travel);
router.get("/rooms", ctrlMain.rooms);
router.get("/meals", ctrlMain.meals);
router.get("/news", ctrlMain.news);
router.get("/about", ctrlMain.about);
router.get("/contact", ctrlMain.contact);

module.exports = router;
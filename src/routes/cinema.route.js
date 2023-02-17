const express = require("express");
const router = express();

const cinemaController = require("../controllers/cinema.controller");

router.get("/", cinemaController.get);
router.get("/:id", cinemaController.getCinemaDetail);

module.exports = router;

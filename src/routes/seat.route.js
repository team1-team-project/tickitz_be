//import eksternal
const express = require("express");
const router = express();
const seatController = require("../controllers/seat.controller");

router.get("/", seatController.getSeat);

module.exports = router;

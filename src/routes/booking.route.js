const express = require("express");
const router = express();

const bookingController = require("../controllers/booking.controller");

router.get("/:id", bookingController.getBookingById);
//router.post("/booking", bookingController.postBooking);

module.exports = router;

//import eksternal
const express = require("express");
const router = express();
const cinemaRoute = require("./cinema.route");
const userProfileRoute = require("./profile.route");
const bookingRoute = require("./booking.route");
const movieRoute = require("./movie.route");
const historyRoute = require("./history.route");
const authRoute = require("./auth_router");
const orderRoute = require("./order");
const movieTimeRoute = require("./movieTime.route");
const seatRoute = require("./seat.route");

// routing movie cinema
router.use("/movie-time", movieTimeRoute);

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

router.use("/cinema", cinemaRoute);
router.use("/profile", userProfileRoute);
router.use("/booking", bookingRoute);
router.use("/movie", movieRoute);
router.use("/history", historyRoute);
router.use("/auth", authRoute);
router.use("/order", orderRoute);
router.use("/seat", seatRoute);

module.exports = router;

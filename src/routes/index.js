//import eksternal
const express = require("express");
const router = express();
const cinemaRoute = require("./cinema.route");
const userProfileRoute = require("./profile.route");
const bookingRoute = require("./booking.route");

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

router.use("/cinema", cinemaRoute);
router.use("/profile", userProfileRoute);
router.use("/booking", bookingRoute);

module.exports = router;

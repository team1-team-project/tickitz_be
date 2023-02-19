//import eksternal
const express = require("express");
const router = express();
const cinemaRoute = require("./cinema.route");
const movieRoute = require("./movie.route");
const historyRoute = require("./history.route");
const authRoute = require("./auth_router")
const orderRoute = require("./order")
const movieTimeRoute = require("./movieTime.route");

// routing movie cinema
router.use("/movie-time", movieTimeRoute);

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

router.use("/cinema", cinemaRoute);
router.use("/movie", movieRoute);
router.use("/history", historyRoute);
router.use("/auth", authRoute)
router.use("/order", orderRoute)

module.exports = router;

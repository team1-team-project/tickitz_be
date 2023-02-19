//import eksternal
const express = require("express");
const router = express();
const cinemaRoute = require("./cinema.route");
const movieRoute = require("./movie.route");
const historyRoute = require("./history.route");

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

router.use("/cinema", cinemaRoute);
router.use("/movie", movieRoute);
router.use("/history", historyRoute);

module.exports = router;

//import eksternal
const express = require("express");
const router = express();
const movieTimeRoute = require("./movieTime.route");

// routing movie cinema
router.use("/movie-time", movieTimeRoute);

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

module.exports = router;

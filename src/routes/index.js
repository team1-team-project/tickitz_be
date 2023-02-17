//import eksternal
const express = require("express");
const router = express();
const cinemaRoute = require("./cinema.route");

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

router.use("/cinema", cinemaRoute);

module.exports = router;

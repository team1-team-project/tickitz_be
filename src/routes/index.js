//import eksternal
const express = require("express");
const router = express();
const cinemaRoute = require("./cinema.route");
const authRoute = require("./auth_router")

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

router.use("/cinema", cinemaRoute);
router.use("/auth", authRoute)

module.exports = router;

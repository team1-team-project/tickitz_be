//import eksternal
const express = require("express");
const router = express();
const cinemaRoute = require("./cinema.route");
const authRoute = require("./auth_router")
const orderRoute = require("./order")

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

router.use("/cinema", cinemaRoute);
router.use("/auth", authRoute)
router.use("/", orderRoute)

module.exports = router;

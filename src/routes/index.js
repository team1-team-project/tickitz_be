//import eksternal
const express = require("express");
const router = express();

// routing landing page
router.get("/", (req, res) => {
  return res.send("Backend successfully running at home page");
});

module.exports = router;

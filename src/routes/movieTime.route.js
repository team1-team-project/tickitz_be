//import eksternal
const express = require("express");
const router = express();
const movieTimeController = require("../controllers/movieTime.controller");

router.get("/:id", movieTimeController.getMovieTime);

//exports
module.exports = router;

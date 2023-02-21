//import eksternal
const express = require("express");
const router = express();
const movieTimeController = require("../controllers/movieTime.controller");

router.get("/:id/:id_cinema", movieTimeController.getMovieTime);

//exports
module.exports = router;

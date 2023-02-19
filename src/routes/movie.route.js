const express = require("express");
const router = express();
const formUpload = require("../middlewares/formUpload");
const movieController = require("../controllers/movie.controller");
const { body } = require("express-validator");

router.get(
  "/",
  body("limit").toInt(),
  body("page").toInt(),
  movieController.searchSortMovie
);
router.get("/:id", movieController.detailMovie);
router.post("/", formUpload.single("poster"), movieController.addMovie);
router.patch("/:id", formUpload.single("poster"), movieController.updateMovie);
router.delete("/:id", movieController.removeMovie);

module.exports = router;

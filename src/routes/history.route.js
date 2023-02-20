const express = require("express");
const router = express();

const historyController = require("../controllers/history.controller");
//const { body } = require("express-validator");

/*router.get(
  "/",
  body("limit").toInt(),
  body("page").toInt(),
  historyController.searchSorthistory
);*/
router.get("/", historyController.detailhistory);

module.exports = router;

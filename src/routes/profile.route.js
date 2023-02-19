const express = require("express");
const router = express();

const profileController = require("../controllers/profile.controller");
const formUpload = require("../middlewares/formUpload");

router.get("/:id", profileController.getDetail);
router.patch(
  "/editprofile/:id",
  formUpload.single("images"),
  profileController.edit
);

module.exports = router;

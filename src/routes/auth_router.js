const express = require("express");
const router = express();

//import controller
const authController = require("../controllers/auth.controller");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.patch("/resetpassword/:id_profile", authController.resetPassword)

module.exports = router;
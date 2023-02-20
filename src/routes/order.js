
const express = require('express')
const router = express.Router()

const orderController = require("../controllers/order")


router.get("/:id_profile/:id_booking", orderController.getDetail)

module.exports = router
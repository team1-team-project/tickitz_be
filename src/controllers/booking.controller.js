const bookingModel = require("../models/booking.model");

const bookingController = {
  getBookingById: (req, res) => {
    return bookingModel
      .getBookingById(req.params.id)
      .then((result) => {
        return res.status(201).send({ message: "Success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  },
  postBooking: (req, res) => {
    return bookingModel
      .postBooking(req.body)
      .then((result) => {
        res.send({
          message: "Success",
          data: result,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: error,
        });
      });
  },
};

module.exports = bookingController;

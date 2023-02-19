const bookingModel = require("../models/booking.model");

const bookingController = {
  getBookingById: (req, res) => {
    return bookingModel
      .getBookingById(req.params.id)
      .then((result) => {
        return res
          .status(201)
          .send({ message: "Success", data: result.rows[0] });
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  },
};

module.exports = bookingController;

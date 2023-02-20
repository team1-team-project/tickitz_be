const seatModel = require("../models/seat.model");

const seatController = {
  getSeat: (req, res) => {
    return seatModel
      .getSeat()
      .then((result) =>
        res.send({
          Message: "Success",
          data: result,
        })
      )
      .catch((err) =>
        res.status(500).send({
          Error: err,
        })
      );
  },
};

// exports
module.exports = seatController;

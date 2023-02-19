const cinemaModel = require("../models/cinema.model");

const cinemaController = {
  get: (req, res) => {
    return cinemaModel
      .get(req.query)
      .then((result) => {
        if (result.length == 0) {
          return res
            .status(404)
            .send({ data: result, message: `Data cinemas empty!` });
        }
        return res.status(200).send({
          data: result,
          message: `Successfully get all data cinemas!`,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getCinemaDetail: (req, res) => {
    const id = req.params.id;
    return cinemaModel
      .getCinemaDetail(id)
      .then((result) => {
        if (result.length === 0) {
          return res
            .status(404)
            .send({ data: result, message: `Cannot find cinema ${id}!` });
        }
        return res
          .status(200)
          .send({ data: result, message: `Successfully get cinema ${id}!` });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = cinemaController;

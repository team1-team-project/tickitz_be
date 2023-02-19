// imports
const movieTimeModel = require("../models/movieTime.model");

const movieTimeController = {
  getMovieTime: (req, res) => {
    return movieTimeModel
      .getMovieTime(req.params.id, req.body.id_cinema)
      .then((result) => {
        res.send({
          Data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          Error: err,
        });
      });
  },
  filterLocation: (queryParams) => {
    if (queryParams) {
      return `AND id_city='${queryParams}'`;
    } else {
      return "";
    }
  },
};

module.exports = movieTimeController;

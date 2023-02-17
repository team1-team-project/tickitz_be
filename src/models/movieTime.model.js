// imports
const db = require("../helpers/connection");

const movieTimeModel = {
  getMovieTime: (id, id_cinema) => {
    return new Promise((success, failed) => {
      db.query(
        "SELECT t.start_time FROM time AS t INNER JOIN data_movies AS d ON d.id_movies=$1 AND d.id_time=t.id_time AND d.id_cinema=$2",
        [id, id_cinema],
        (error, result) => {
          if (error) return failed(error.message);
          if (result.rows.length === 0) return failed("Id not found!");
          const hasil = [];
          result.rows.map((item) => {
            hasil.push(item.start_time);
          });
          return success(hasil);
        }
      );
    });
  },
};

// exports
module.exports = movieTimeModel;

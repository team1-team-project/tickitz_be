const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const cinemaModel = {
  get: (queryParams) => {
    const { search = "" } = queryParams;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM cinemas ${
          search ? `WHERE cinema_name ILIKE '%${search}%' ` : ""
        }`,
        (errorGetCinemas, resultGetCinemas) => {
          if (errorGetCinemas) {
            return reject(errorGetCinemas.message);
          } else {
            return resolve(resultGetCinemas.rows);
          }
        }
      );
    });
  },
  getCinemaDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM cinemas WHERE id_cinema = '${id}'`,
        (errorGetCinemaDetail, resultGetCinemaDetail) => {
          if (errorGetCinemaDetail) {
            return reject(errorGetCinemaDetail.message);
          }
          return resolve(resultGetCinemaDetail.rows);
        }
      );
    });
  },
};

module.exports = cinemaModel;

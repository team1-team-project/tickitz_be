const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const cinemaModel = {
  get: (queryParams) => {
    const { search = "", limit = "9", page = 1 } = queryParams;
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM cinemas ${
          search ? `WHERE cinema_name ILIKE '%${search}%' ` : ""
        } LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
        (errorGetCinemas, resultGetCinemas) => {
          if (errorGetCinemas) {
            return reject(errorGetCinemas.message);
          }
          return resolve(resultGetCinemas.rows);
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

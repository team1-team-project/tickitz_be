const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const cinemaModel = {
  // get: (queryParams) => {
  //   const { search = "", limit = "6", page = 1 } = queryParams;
  //   return new Promise((resolve, reject) => {
  //     db.query(
  //       `SELECT * FROM cinemas ${
  //         search ? `WHERE cinema_name ILIKE '%${search}%' ` : ""
  //       } LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
  //       (errorGetCinemas, resultGetCinemas) => {
  //         if (errorGetCinemas) {
  //           return reject(errorGetCinemas.message);
  //         }
  //         return resolve(resultGetCinemas.rows);
  //       }
  //     );
  //   });
  // },
  get: (queryParams) => {
    const { search = "", limit = "6", page = 1 } = queryParams;
    return new Promise((resolve, reject) => {
      db.query(
        `
      SELECT cin.id_cinema, cin.id_city, cin.cinema_name, cin.cinema_room, cin.price,
      json_agg(row_to_json(cincity)) city
      FROM cinemas as cin
      LEFT JOIN (SELECT id_city, city, address FROM city) AS cincity
      ON cin.id_city = cincity.id_city
      ${search ? `WHERE cinema_name ILIKE '%${search}%'` : ""}
      GROUP BY cin.id_cinema LIMIT ${limit} OFFSET ${(page - 1) * limit}
      `,
        (errorGetCinemas, resultGetCinemas) => {
          if (errorGetCinemas) {
            console.log(errorGetCinemas);
            return reject(errorGetCinemas.message);
          }
          return resolve(resultGetCinemas.rows);
        }
      );
    });
  },
  // getCinemaDetail: (id) => {
  //   return new Promise((resolve, reject) => {
  //     db.query(
  //       `SELECT * FROM cinemas WHERE id_cinema = '${id}'`,
  //       (errorGetCinemaDetail, resultGetCinemaDetail) => {
  //         if (errorGetCinemaDetail) {
  //           return reject(errorGetCinemaDetail.message);
  //         }
  //         return resolve(resultGetCinemaDetail.rows);
  //       }
  //     );
  //   });
  // },
  getCinemaDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT cin.id_cinema, cin.id_city, cin.cinema_name, cin.cinema_room, cin.price,
        json_agg(row_to_json(cincity)) city
        FROM cinemas as cin
        LEFT JOIN (SELECT id_city, city, address FROM city) AS cincity
        ON cin.id_city = cincity.id_city
        WHERE cin.id_cinema = '${id}'
        GROUP BY cin.id_cinema 
        `,
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

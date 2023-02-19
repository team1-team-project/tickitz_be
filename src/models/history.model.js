const { query } = require("express");
const db = require("../helpers/connection");

const historyModel = {
  historyByIdProfile: (id_profile) => {
    return new Promise((resolve, reject) => {
      const query = `id_booking,booking.id_data,movies.movie_name,cinemas.cinema_name,profile.email,profile.phone,profile.first_name from booking  
      inner join data_movies on booking.id_data=data_movies.id_data
      inner join movies on movies.id_movies = data_movies.id_movies
      inner join cinemas on cinemas.id_cinema = data_movies.id_cinema
      inner join profile on profile.id_profile = booking.id_profile where booking.id_profile='${id_profile}'
        `;
      db.query(query, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },
};

module.exports = historyModel;

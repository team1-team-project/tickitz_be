const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const bookingModel = {
  getBookingById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT movies.movie_name,cinemas.cinema_name,profile.email,profile.phone,profile.first_name,profile.last_name,date FROM booking inner join data_movies on booking.id_data=data_movies.id_data inner join movies on movies.id_movies = data_movies.id_movies inner join cinemas on cinemas.id_cinema = data_movies.id_cinema inner join profile on profile.id_profile = booking.id_profile where id_booking = '${id}'`,
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        }
      );
    });
  },

  postBooking:({}) =>{
    
  }

};

module.exports = bookingModel;

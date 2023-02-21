const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const bookingModel = {
  getBookingById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT data_movies.id_data,movies.movie_name,cinemas.cinema_name,profile.email,profile.phone,profile.first_name,profile.last_name,date FROM booking inner join data_movies on booking.id_data=data_movies.id_data inner join movies on movies.id_movies = data_movies.id_movies inner join cinemas on cinemas.id_cinema = data_movies.id_room inner join profile on profile.id_profile = booking.id_profile where id_booking = '${id}'`,
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  postBooking: ({
    id_movies,
    id_time,
    id_profile,
    id_payment,
    date,
    total_payment,
    id_room,
    seat,
  }) => {
    return new Promise((resolve, reject) => {
      const id_booking = uuidv4();
      const seats = seat.split(",");
      for (let i = 0; i < seats.length; i++) {
        db.query(
          `SELECT seat_number FROM seat WHERE id_seat=$1`,
          [seats[i]],
          (errGetSeat, resGetSeat) => {
            if (errGetSeat) return reject(errGetSeat.message);
            seats.map((item) => {
              db.query(
                `SELECT id_data FROM data_movies WHERE id_movies=$1 AND id_time=$2 AND id_room=$3 AND id_seat=$4`,
                [id_movies, id_time, id_room, seats[i]],
                (errData, resData) => {
                  if (errData) return reject(errData.message);
                  db.query(
                    `UPDATE data_movies SET status='sold' WHERE id_movies=$1 AND id_time=$2 AND id_room=$3 AND id_seat=$4`,
                    [id_movies, id_time, id_room, item],
                    (err, res) => {
                      if (err) {
                        return reject(err);
                      } else {
                        db.query(
                          `INSERT INTO booking VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                          [
                            id_booking,
                            id_payment,
                            id_profile,
                            resData.rows[0].id_data,
                            date,
                            total_payment,
                            resGetSeat.rows[0].seat_number,
                          ],
                          (error, result) => {
                            if (error) {
                              return reject(error);
                            }
                          }
                        );
                      }
                    }
                  );
                }
              );
            });
          }
        );
      }
      return resolve("Transaction Success!");
    });
  },
};

module.exports = bookingModel;

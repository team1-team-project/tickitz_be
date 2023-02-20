const { query } = require("express");
const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const movieModel = {
  countAllMovie: (keyword, cb) => {
    db.query(
      `SELECT * FROM movies WHERE movie_name LIKE '%${keyword}%'`,
      (err, res) => {
        cb(err, res.rowCount);
      }
    );
  },
  searchMovie: (
    searchBy,
    keyword,
    sort_by,
    sort_type,
    limit,
    offset = 0,
    cb
  ) => {
    db.query(
      `SELECT * FROM movies WHERE ${searchBy} LIKE '%${keyword}%' ORDER BY ${sort_by} ${sort_type} LIMIT $1 OFFSET $2`,
      [limit, offset],
      (err, res) => {
        //console.log(res);
        cb(res.rows);
      }
    );
  },
  movieById: (id, cb) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from movies WHERE id_movies='${id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },
  createMovie: (poster, data, cb) => {
    let val = [];
    const filtered = {};
    const object = {
      id_movies: uuidv4(),
      id_category: data.id_category,
      movie_name: data.movie_name,
      release_date: data.release_date,
      duration: data.duration,
      director: data.director,
      actor: data.actor,
      synopsis: data.synopsis,
      poster,
    };

    for (let x in object) {
      if (object[x] !== null) {
        filtered[x] = object[x];
        val.push(object[x]);
      }
    }

    const key = Object.keys(filtered);
    const finalResult = key.map((o, ind) => `$${(o = ind + 1)}`);

    const q = `INSERT INTO movies(${key}) VALUES (${finalResult}) RETURNING *`;
    db.query(q, val, (err, res) => {
      if (err) {
        cb(err, res);
      } else {
        // cb(err, res);
        db.query(`SELECT * FROM cinemas`, (error, result) => {
          if (error) {
            cb(error, result);
          } else {
            // console.log(result.rows);
            const cinemas = result.rows.map((item) => item.id_cinema);
            db.query(`SELECT * FROM time`, (errTime, resTime) => {
              if (errTime) {
                cb(errTime, resTime);
              } else {
                const times = resTime.rows.map((item) => item.id_time);
                db.query(`SELECT * FROM seat`, (errSeat, resSeat) => {
                  if (errSeat) {
                    cb(errSeat, resSeat);
                  } else {
                    const seats = resSeat.rows.map((item) => item.id_seat);
                    cinemas.map((cinema) => {
                      times.map((time) => {
                        seats.map((seat) => {
                          db.query(
                            `INSERT INTO data_movies VALUES ($1,$2,$3,$4)`,
                            [uuidv4(), time, cinema, seat],
                            (errData, resData) => {
                              if (errData) {
                                console.log("gagal");
                                cb(errData, resData);
                              }
                            }
                          );
                        });
                      });
                    });
                    cb(err, res);
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  updateMovie: ({
    id,
    id_category,
    movie_name,
    release_date,
    duration,
    director,
    actor,
    synopsis,
    poster,
  }) => {
    return new Promise((resolve, reject) => {
      const get_movie = `select * from movies where id_movies='${id}'`;
      db.query(get_movie, (err, res) => {
        if (err) {
          return reject(err.message);
        } else if (res.rows.length < 1) {
          return reject("data not found!");
        } else {
          db.query(
            `update movies set
          id_category='${id_category || res.rows[0].id_category}',
          movie_name='${movie_name || res.rows[0].movie_name}',
          release_date='${release_date || res.rows[0].release_date}',
          duration='${duration || res.rows[0].duration}',
          director='${director || res.rows[0].director}',
          actor='${actor || res.rows[0].actor}',
          synopsis='${synopsis || res.rows[0].synopsis}',
          poster='${poster || res.rows[0].poster}'
          where id_movies='${id}'`,
            (error) => {
              if (error) {
                return reject(error.message);
              } else {
                return resolve(res.rows);
              }
            }
          );
        }
      });
    });
  },
  deleteMovie: (id) => {
    return new Promise((resolve, reject) => {
      const q = "DELETE FROM movies WHERE id_movies=$1 RETURNING *";
      const val = [id];
      db.query(q, val, (err, res) => {
        if (err) {
          return reject(err.message);
        } else if (res.rows.length < 1) {
          return reject("data movie not found!");
        } else {
          return resolve(res.rows);
        }
      });
    });
  },
};

module.exports = movieModel;

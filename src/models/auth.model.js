const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  login: ({ email, password }) => {
    // console.log(email, password);
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM profile WHERE email=$1`,
        [email],
        (err, result) => {
          if (err) return reject(err.message);
          if (result.rows.length == 0) return reject("email/password salah.");

          bcrypt.compare(
            password,
            result.rows[0].password,
            function (err, hashingResult) {
              if (err) return reject(err.message);
              if (!hashingResult) return reject("username/password salah.");
              return resolve(result.rows[0]);
            }
          );
        }
      );
    });
  },

  register: ({ first_name, email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO profile (id_profile, first_name, email, password) VALUES($1, $2, $3, $4)`,
        [uuidv4(), first_name, email, password],
        (err, result) => {
          if (err) {
            console.log(err);
            return reject(err.message);
          } else {
            return resolve("Success Register!");
          }
        }
      );
    });
  },

  resetPassword: ({ id_profile, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from profile where id_profile='${id_profile}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            db.query(
              `UPDATE profile SET 
                  password='${password || result.rows[0].password}'
                     WHERE id_profile='${id_profile}'`,
              (err, result) => {
                if (err) {
                  return reject(err.message);
                } else {
                  return resolve({
                    id_profile,
                    password,
                  });
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = authModel;

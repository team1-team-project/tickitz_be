// imports
const db = require("../helpers/connection");

const seatModel = {
  getSeat: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM seat`, (err, res) => {
        if (err) return reject(err.message);
        return resolve(res.rows);
      });
    });
  },
};

module.exports = seatModel;

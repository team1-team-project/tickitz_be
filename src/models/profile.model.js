const db = require("../helpers/connection");
const { v4: uuidv4 } = require("uuid");

const profileModel = {
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from profile WHERE id_profile = '${id}'`,
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
  edit: function ({
    id_profile,
    email,
    password,
    first_name,
    last_name,
    phone,
    point,
    role,
    //images,
    file,
  }) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM profile WHERE id_profile ='${id_profile}'`,
        (error, dataRes) => {
          console.log(dataRes);
          if (error) {
            return reject(error.message);
          } else {
            if (dataRes.rows.length == 0) {
              return reject("Id not found!");
            } else {
              db.query(
                `UPDATE profile SET email='${
                  email || dataRes.rows[0].email
                }', password='${
                  password || dataRes.rows[0].password
                }',  first_name='${
                  first_name || dataRes.rows[0].first_name
                }',  last_name='${
                  last_name || dataRes.rows[0].last_name
                }', phone='${phone || dataRes.rows[0].phone}', point='${
                  point || dataRes.rows[0].points
                }', role='${role || dataRes.rows[0].role}',images='${
                  file ? file.filename : dataRes.rows[0].images
                }' WHERE id_profile='${id_profile}'`,
                (error) => {
                  if (error) {
                    return reject(error.message);
                  } else {
                    return resolve({
                      id_profile,
                      email,
                      password,
                      first_name,
                      last_name,
                      phone,
                      point,
                      role,
                      //images,
                      images: file,
                    });
                  }
                }
              );
            }
          }
        }
      );
    });
  },
};

module.exports = profileModel;

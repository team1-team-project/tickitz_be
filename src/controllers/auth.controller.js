require("dotenv").config();
const authModel = require("../models/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env;

const authController = {
  // login: (req, res) => {
  //   return authModel
  //     .login(req.body)
  //     .then((result) => {
  //       jwt.sign(
  //         { id: result.id, role: result.role },
  //         JWT_PRIVATE_KEY,
  //         (err, token) => {
  //           if (err) {
  //             return res.send(err.message);
  //           }
  //           return res.status(200).send({
  //             message: "success",
  //             data: {
  //               token,
  //               user: result,
  //             },
  //           });
  //         }
  //       );
  //     })
  //     .catch((error) => {
  //       return res.status(500).send({ message: error });
  //     });
  // },

  // add error handling
  login: (req, res) => {
    console.log(req.body);
    if (req.body.email.length == 0)
      return res.status(400).send({ message: `Wrong email/password!` });
    if (req.body.password.length == 0)
      return res.status(400).send({ message: `Wrong email/password!` });
    return authModel
      .login(req.body)
      .then((result) => {
        jwt.sign(
          { id: result.id, role: result.role },
          JWT_PRIVATE_KEY,
          (err, token) => {
            if (err) {
              return res.send(err.message);
            }
            return res.status(200).send({
              message: "Login success!",
              data: {
                token,
                user: result,
              },
            });
          }
        );
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  // register: (req, res) => {
  //   bcrypt.hash(req.body.password, 10, (err, hash) => {
  //     if (err) {
  //       return res.status(500).send({ message: err.message });
  //     } else {
  //       const request = {
  //         ...req.body,
  //         password: hash,
  //       };
  //       return authModel
  //         .register(request)
  //         .then((result) => {
  //           return res.status(201).send({ message: "succes", data: result });
  //         })
  //         .catch((error) => {
  //           return res.status(500).send({ message: error });
  //         });
  //     }
  //   });
  // },

  // add error handling
  register: (req, res) => {
    if (req.body.first_name.length == 0)
      return res.status(400).send({ message: `Username can't be empty!` });
    if (req.body.email.length == 0)
      return res.status(400).send({ message: `Email can't be empty!` });
    if (req.body.password.length == 0)
      return res.status(400).send({ message: `Password can't be empty!` });
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          ...req.body,
          password: hash,
        };
        return authModel
          .register(request)
          .then((result) => {
            return res
              .status(201)
              .send({ message: "Register success!", data: result });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
  },

  resetPassword: (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          ...req.body,
          password: hash,
          id_profile: req.params.id_profile,
        };
        return authModel
          .resetPassword(request)
          .then((result) => {
            return res.status(201).send({ message: "succes", data: result });
          })
          .catch((error) => {
            return res.status(500).send({ message: error });
          });
      }
    });
  },

  forgotPassword: (req, res) => {
    return authModel
      .getProfileByEmail(req.params.email)
      .then((result) => {
        res
          .status(200)
          .send({ message: "success get user by email", data: result });
      })
      .catch((err) => res.status(500).send({ message: "failed", data: err }));
  },
};

module.exports = authController;

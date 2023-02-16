const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!req.header("token")) {
    return res.status(400).send({
      message: "token is required",
    });
  } else {
    jwt.verify(token, SECRET_KEY, function (err, decoded) {
      if (!err) {
        //authorization
        if (decoded.role === "admin") {
          next();
        } else if (decoded.role === "user") {
          return res.status(403).send({
            message: "You are not have an access",
          });
        } else {
          return res.status(404).send({
            message: "404 not found",
          });
        }
      } else {
        return res.status(400).send({
          message: "token is not valid",
        });
      }
    });
  }
};

module.exports = verifyToken;

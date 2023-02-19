const response = require("./standardRespond");

const errorHandling = (msg, param, location = "body") => [
  {
    msg,
    param,
    location,
  },
];

const errorResponse = (err, res) => {
  // profile
  if (err.code === "23505" && err.detail.includes("email")) {
    const errorRes = errorHandling("Email already exists", "email");
    return response(res, "Error", errorRes, null, 400);
  }
  if (err.code === "23505" && err.detail.includes("username")) {
    const errorRes = errorHandling("Username already exists", "username");
    return response(res, "Error", errorRes, null, 400);
  }

  if (err.code === "23505" && err.detail.includes("phonenumber")) {
    const errorRes = errorHandling(
      "Phone number already exists",
      "phonenumber"
    );
    return response(res, "Error", errorRes, null, 400);
  }
  // end profile

  return response(res, "Error", null, null, 400);
};

module.exports = errorResponse;

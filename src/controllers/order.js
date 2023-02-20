const orderModel = require("../models/order");

const orderController = {
  getDetail: (req, res) => {
    const request = {
      id_profile: req.params.id_profile,
      id_booking: req.params.id_booking,
    };
    return orderModel
      .getDetail(request)
      .then((result) => {
        // console.log(result)
        // for (let i = 0; i < result.newSeat.length; i++) {
        //   console.log(newSeat[i]);
        // }
        res.status(200).send({ message: "get data is success", data: result });
      })
      .catch((err) => {
        // console.log(err)
        res.status(500).send({ message: err });
      });
  },
};

module.exports = orderController;

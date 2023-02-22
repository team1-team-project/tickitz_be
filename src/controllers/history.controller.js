const historyModel = require("../models/history.model");

const historyController = {
  detailhistory: (req, res) => {
    return historyModel
      .historyByIdProfile(req.params.id_profile)
      .then((result) => {
        if (result != null) {
          return res.status(200).send({ message: "Success", data: result });
        } else {
          return res.status(404).send({
            message: "Sorry data not found!",
          });
        }
      })
      .catch((error) => {
        return res.status(500).send(error);
      });
  },
};

module.exports = historyController;

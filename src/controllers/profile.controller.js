const profileModel = require("../models/profile.model");

const profileController = {
  getDetail: (req, res) => {
    return profileModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({
          message: "Success",
          data: result,
        });
      })
      .catch((error) => {
        return res.status(500).send({ message: error.message });
      });
  },

  edit: (req, res) => {
    const request = {
      ...req.body,
      id_profile: req.params.id,
      file: req.file,
    };
    return profileModel
      .edit(request)
      .then((result) => {
        return res.status(200).send({
          Message: "Success",
          data: result,
        });
      })

      .catch((error) => {
        return res.status(400).send({
          Status: 400,
          Message: `${error}`,
        });
      });
  },
};

module.exports = profileController;

//import eskternal
const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
// const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const { PORT } = process.env;

//import internal
//connect database otw
const router = require("./src/routes/index");

//menerima x-www.form.urlencoded
app.use(urlencoded({ extended: true }));

//static file
app.use(express.static("public"));

//menerima raw JSON
app.use(json());

//cors
app.use(cors()); //semua bisa akses

//routes parent
app.use("/api/", router);

//endpoint
//routing if can't get a routes
app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "Not found",
  });
});

//listening server~
app.listen(PORT, (req, res) => {
  console.log(`Successfully running on port ${PORT}`);
});

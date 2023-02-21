//import eskternal
require("dotenv").config();
const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { PORT } = process.env;

//import internal

//connect database otw
const router = require("./src/routes/index");
const sendEmail = require("./src/utils/sendEmail");

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

// mail route
app.post("/api/sendmail", async (req,res) => {
  const {email, message} = req.body;

  try {
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = email;
    const subject = "Reset Password Verification mail"
    const html = message;

    await sendEmail(subject, html, send_to, sent_from, reply_to)
    res.status(200).send({success: 'true', message: "email sent"})
  } catch (error) {
    res.json(500).send(err.message)
  }
})

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

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;
app.use(express.json());
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) return err;
  console.log("db connected successfully");
});

app.post("/insertdata", (req, res) => {
  const { name, email, contact, gender } = req.body;
  const query1 = `insert into employee(name,email,contact,gender) values("${name}","${email}","${contact}","${gender}")`;
  connection.query(query1, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "data inserted succesfulyy",
      });
    }
  });
});

app.get("/getdata", (req, res) => {
  const query1 = `select * from employee`;
  connection.query(query1, (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(200).json({
        success: true,
        data: result,
        message: "data inserted succesfulyy",
      });
    }
  });
});
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("i am running bro mai chal rh");
});

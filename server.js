const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
app.use(cors());
const PORT = 4000;
app.use(express.json());
const connection = mysql.createConnection({
  localhost: "3306",
  user: "root",
  database: "dataman10",
  password: "Mohanpur@1",
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

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("i am running");
});

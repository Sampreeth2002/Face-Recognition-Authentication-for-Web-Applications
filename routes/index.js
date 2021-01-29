var express = require("express");
var path = require("path");
var mysql = require("mysql");
var nodemailer = require("nodemailer");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "face_app",
});

let transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "siamproject546@gmail.com",
    pass: "siam@123",
  },
});

con.connect(function (err) {
  if (err) throw err;
  console.log("database connected successfully");
});

var router = express.Router();

router.use(express.static(__dirname + "./public/"));

router.get("/home", function (req, res) {
  res.render("home");
});

router.get("/form", function (req, res, next) {
  res.render("register");
});

router.post("/register", function (req, res) {
  id = req.body.id;
  first_name = req.body.first_name;
  last_name = req.body.second_name;
  mobile_number = req.body.mobile_number;
  image1 = req.body.image1;
  image2 = req.body.image2;
  var insertQuery =
    "insert into users_image (id,first_name,last_name,mobile_number,image1,image2) values(?,?,?,?,?,?)";
  var query = mysql.format(insertQuery, [
    id,
    first_name,
    last_name,
    mobile_number,
    image1,
    image2,
  ]);
  console.log(query);
  con.query(query, function (err, result) {
    if (err) throw err;
    res.render("register");
  });
});

router.get("/upload", function (req, res) {
  res.render("upload");
});

router.get("/fetchImages", function (req, res) {
  var insertQuery = "select * from users_image";
  console.log(insertQuery);
  con.query(insertQuery, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});

module.exports = router;

var mysql = require("mysql");
var express = require("express");
var manage = require("./manage.js")
var app = express();
var PORT = process.env.PORT || 8080;
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Najih_56@Forna",
  database: "employee_managerDB"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });

  module.exports = connection;
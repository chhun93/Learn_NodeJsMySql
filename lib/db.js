var fs = require("fs");
var mysql = require("mysql");
var pw = `${fs.readFileSync(
  "../personal_pw.txt",
  "utf8",
  function (error, description) {
    if (error) throw error;
    console.log(description);
  }
)}`;
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: pw,
  database: "opentutorials",
});
db.connect();

module.exports = db;

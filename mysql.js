var mysql = require("mysql");
var fs = require("fs");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: `${fs.readFileSync(
    "../personal_pw.txt",
    "utf8",
    function (error, description) {
      if (error) console.log(error);
    }
  )}`,
  database: "opentutorials",
});
//변수에 description을 담아 넣으려고 했는데 이제 알았다.
//js 의 콜백함수는 비동기적이라서..안됨.
connection.connect();

connection.query("SELECT * FROM topic", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();

// 아무 조작없이 실행했을경우
/*
Error: ER_NOT_SUPPORTED_AUTH_MODE: 
Client does not support authentication protocol requested by server; 
consider upgrading MySQL client
에러가 뜬다.

mysql -> 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '{password}';
실행
*/

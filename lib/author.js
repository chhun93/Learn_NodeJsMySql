var url = require("url");
var qs = require("querystring");
var db = require("./db");
var template = require("./template");

exports.home = function (request, response) {
  db.query(`SELECT * FROM TOPIC`, function (error, topics) {
    db.query(`SELECT * FROM AUTHOR`, function (error2, authors) {
        var title = "author";
        var tag = template.authorTable(authors);
        var list = template.list(topics);
      var html = template.HTML(
        title,
        list,
        `${tag}`,
        `
        <a href = "/create">create</a>
        `
      );
      response.writeHead(200);
      response.end(html);
    });
  });
};

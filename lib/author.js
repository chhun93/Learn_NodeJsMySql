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
        `
        ${tag}
        <form action="author_create_process" method = "post">
        <p>
          <input type="text" name ="name" placeholder="name">
        </p>
        <p>
          <textarea name="profile" placeholder="description"></textarea>
        </p>
        <p>
          <input type="submit" value="create">
        </p>
        </form>
        `,
        ``
      );
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.author_create_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);

    db.query(
      `INSERT INTO AUTHOR (NAME,PROFILE) VALUES(?,?)`,
      [post.name, post.profile],
      function (error, result) {
        if (error) throw error;
        response.writeHead(302, { Location: `/author` });
        response.end();
      }
    );
  });
};

exports.update = function (request, response) {
  db.query(`SELECT * FROM TOPIC`, function (error, topics) {
    db.query(`SELECT * FROM AUTHOR`, function (error2, authors) {
      var _url = request.url;
      var queryData = url.parse(_url, true).query;

      db.query(
        `SELECT * FROM AUTHOR WHERE ID = ?`,
        [queryData.id],
        function (error3, author) {
          var title = "author";
          var tag = template.authorTable(authors);
          var list = template.list(topics);
          var html = template.HTML(
            title,
            list,
            `
            ${tag}
            <form action="/author/update_process" method = "post">
              <p>
                <input type="hidden" name ="id" value="${queryData.id}">
              </p>
              <p>
                <input type="text" name="name" value = "${author[0].name}">
              </p>
              <p>
                <textarea name="profile" >${author[0].profile}</textarea>
              </p>
              <p>
                <input type="submit" value ="update">
              </p>
            </form>
            `,
            ``
          );
          response.writeHead(200);
          response.end(html);
        }
      );
    });
  });
};

exports.update_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    db.query(
      `UPDATE AUTHOR SET NAME=?, PROFILE=? WHERE ID = ?`,
      [post.name, post.profile, post.id],
      function (error, result) {
        if (error) throw error;
        response.writeHead(302, { Location: `/author` });
        response.end();
      }
    );
  });
};
exports.delete_process = function (request, response) {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);

    db.query(
      `DELETE FROM TOPIC WHERE AUTHOR_ID = ?`,
      [post.id],
      function (error, result) {
        if (error) throw error;
        db.query(
          `DELETE FROM AUTHOR WHERE ID = ?`,
          [post.id],
          function (error2, result) {
            if (error2) throw error2;
            response.writeHead(302, { Location: `/author` });
            response.end();
          }
        );
      }
    );
  });
};

module.exports = {
  HTML: function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href = "/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list: function (topics) {
    var list = "<ul>";
    var i = 0;
    while (i < topics.length) {
      list =
        list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
  authorSelect: function (authors, author_id) {
    var tag = "";
    for (var i = 0; i < authors.length; i++) {
      var selected = "";
      if (author_id === authors[i].id) {
        selected = "selected";
      }
      tag += `<option value = '${authors[i].id}'${selected}>${authors[i].name}</option>`;
    }

    return `
      <select name='author'>
        ${tag}
      </select>
    `;
  },
  authorTable: function (authors) {
    var tag = "";
    tag = "<table>";
    tag += 
    `    
    <tr>
      <td>name</td>
      <td>profile</td>
      <td>update</td>
      <td>delete</td>
    </tr>
    `
    for (var i = 0; i < authors.length; i++) {
      tag += `
             <tr>
                 <td>${authors[i].name}</td>
                 <td>${authors[i].profile}</td>
                 <td>update</td>
                 <td>delete</td>
             </tr>
         `;
    }
    tag += "</table>";
    var cssAuthorTable = `
      <style> 
      table{
        border-collapse : collapse;
      } 
      td{
        border : 1px solid black;
      }
      </style>`;

    return `${tag + cssAuthorTable}`;
  },
};

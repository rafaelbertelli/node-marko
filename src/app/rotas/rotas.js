const db = require("../../config/database");

module.exports = app => {
  app.get("/", function(req, res) {
    res.marko(require("../views/home/home.marko"));
  });

  app.get("/livros", function(req, res) {
    db.all("SELECT * FROM livros", function(err, livros) {
      res.marko(require("../views/livros/lista/lista.marko"), {
        livros: livros
      });
    });
  });
};

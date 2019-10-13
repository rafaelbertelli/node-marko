const db = require("../../config/database");
const LivroDao = require("../infra/livro-dao");

module.exports = app => {
  app.get("/", function(req, res) {
    res.marko(require("../views/home/home.marko"));
  });

  app.get("/livros", function(req, res) {
    const livroDao = new LivroDao(db);
    livroDao
      .lista()
      .then(livros =>
        res.marko(require("../views/livros/lista/lista.marko"), { livros })
      )
      .catch(console.log);
  });

  app.get("/livros/form", function(req, res) {
    res.marko(require("../views/livros/form/form.marko"), { livro: {} });
  });

  app.get("/livros/form/:id", function(req, res) {
    const id = req.params.id;
    const livroDao = new LivroDao(db);

    livroDao
      .buscaPorId(id)
      .then(livro =>
        res.marko(require("../views/livros/form/form.marko"), { livro })
      )
      .catch(console.log);
  });

  app.post("/livros", function(req, res) {
    console.log(req.body);
    const livroDao = new LivroDao(db);

    livroDao
      .adiciona(req.body)
      .then(res.redirect("/livros"))
      .catch(console.log);
  });

  app.put("/livros", function(req, res) {
    console.log(req.body);
    const livroDao = new LivroDao(db);

    livroDao
      .atualiza(req.body)
      .then(res.redirect("/livros"))
      .catch(console.log);
  });

  app.delete("/livros/:id", function(req, res) {
    const id = req.params.id;

    const livroDao = new LivroDao(db);
    livroDao
      .remove(id)
      .then(() => res.status(200).end())
      .catch(console.log);
  });
};

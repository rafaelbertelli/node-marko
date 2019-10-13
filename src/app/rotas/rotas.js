const db = require("../../config/database");
const LivroDao = require("../infra/livro-dao");

module.exports = app => {
  app.get("/", function(req, res) {
    res.marko(require("../views/home/home.marko"));
  });

  app.get("/livros/form", function(req, res) {
    res.marko(require("../views/livros/form/form.marko"));
  });

  app.get("/livros/:id", async function(req, res) {
    const livroDao = new LivroDao(db);

    try {
      const livros = await livroDao.lista(req.params.id);
      res.marko(require("../views/livros/lista/lista.marko"), { livros });
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/livros/", async function(req, res) {
    const livroDao = new LivroDao(db);

    try {
      const livros = await livroDao.lista();
      res.marko(require("../views/livros/lista/lista.marko"), { livros });
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/livros", async function(req, res) {
    const livroDao = new LivroDao(db);

    try {
      await livroDao.adiciona(req.body);
      res.redirect("/livros");
    } catch (erro) {
      erro => console.log(erro);
    }
  });

  app.put("/livros", async function(req, res) {
    const livroDao = new LivroDao(db);

    try {
      await livroDao.atualiza(req.body);
      res.redirect("/livros");
    } catch (erro) {
      res.status(404).send("Something broke!");
    }
  });

  app.delete("/livros/:id", async function(req, res) {
    const livroDao = new LivroDao(db);

    try {
      await livroDao.exclui(req.params.id);
      res.redirect("/livros");
    } catch (erro) {
      res.status(404).send("Something broke!");
    }
  });
};

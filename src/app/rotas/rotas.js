const db = require("../../config/database");
const LivroDao = require("../infra/livro-dao");

const _getLivros = res => {
  const livroDao = new LivroDao(db);

  return livroDao
    .lista()
    .then(livros =>
      res.marko(require("../views/livros/lista/lista.marko"), {
        livros
      })
    )
    .catch(erro => erro);
};

module.exports = app => {
  app.get("/", function(req, res) {
    res.marko(require("../views/home/home.marko"));
  });

  app.get("/livros", async function(req, res) {
    try {
      await _getLivros(res);
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

  app.get("/livros/form", function(req, res) {
    res.marko(require("../views/livros/form/form.marko"));
  });
};

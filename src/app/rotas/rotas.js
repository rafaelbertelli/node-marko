const db = require("../../config/database");
const LivroDao = require("../infra/livro-dao")

module.exports = app => {
  app.get("/", function(req, res) {
    res.marko(require("../views/home/home.marko"));
  });

  app.get("/livros", function(req, res) {
    const livroDao = new LivroDao(db);

    livroDao
      .lista()
      .then(livros => 
        res
          .marko(
            require("../views/livros/lista/lista.marko"),
            {
              livros
            }
          )
      )
      .catch(erro => console.log(erro))
  });
};

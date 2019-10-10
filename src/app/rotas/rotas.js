module.exports = app => {
  app.get("/", function(req, res) {
    res.marko(require("../views/home/home.marko"));
  });

  app.get("/livros", function(req, res) {
    res.marko(require("../views/livros/lista/lista.marko"), {
      livros: [
        {
          id: 1,
          titulo: "Fundamentos do Node"
        },
        {
          id: 2,
          titulo: "Node Avançado"
        }
      ]
    });
  });
};

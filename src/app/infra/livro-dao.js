class LivroDao {
  constructor(db) {
    this._db = db;
  }

  lista() {
    return new Promise((resolve, reject) => {
      this._db.all("SELECT * FROM livros", (erro, resultados) => {
        if (erro) return reject(erro);
        setTimeout(() => {
          return resolve(resultados);
        }, 0);
      });
    });
  }

  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        `INSERT INTO livros (titulo, preco, descricao) values (?,?,?)`,
        [livro.titulo, livro.preco, livro.descricao],
        erro => {
          if (erro) {
            return reject("Não foi possível adicionar o livro!");
          }

          resolve();
        }
      );
    });
  }
}

module.exports = LivroDao;

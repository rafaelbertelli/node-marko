class LivroDao {
  constructor(db) {
    this._db = db;
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

  lista(bookId) {
    return new Promise((resolve, reject) => {
      let query = "SELECT * FROM livros";

      if (!!bookId) {
        query = `SELECT * FROM livros WHERE id = ${bookId}`;
      }

      this._db.all(query, (erro, resultados) => {
        if (erro) {
          return reject(erro);
        }

        return resolve(resultados);
      });
    });
  }

  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this._db.run(
        "UPDATE livros SET titulo = $titulo, preco = $preco, descricao = $descricao WHERE id = $id",
        {
          $id: livro.id,
          $titulo: livro.titulo,
          $preco: livro.preco,
          $descricao: livro.descricao
        },
        erro => {
          if (erro) {
            return reject("Não foi possível atualizar o livro!");
          }

          resolve();
        }
      );
    });
  }

  exclui(id) {
    return new Promise((resolve, reject) => {
      this._db.run("DELETE FROM livros WHERE id = ?", id, erro => {
        if (erro) {
          return reject("Não foi possível excluir o livro!");
        }

        resolve();
      });
    });
  }
}

module.exports = LivroDao;

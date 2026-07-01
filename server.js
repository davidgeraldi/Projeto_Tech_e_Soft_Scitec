const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/biblioteca", (req, res) => {
  let books = [];
  if (fs.existsSync("bd.json")) {
    const bd = fs.readFileSync("bd.json", "utf-8");
    books = JSON.parse(bd || "[]");
  }
  res.render("library", { books: books });
});

app.get("/contato", (req, res) => {
  res.render("contact");
});

app.post("/salvar-leitura", (req, res) => {
  const { titulo, autor, paginas, capa } = req.body;

  const numPaginas = parseInt(paginas);
  if (numPaginas < 1) {
    console.log("Tentativa de salvar páginas inválidas.");
    return res.redirect("/");
  }

  let books = [];
  if (fs.existsSync("bd.json")) {
    const bd = fs.readFileSync("bd.json", "utf-8");
    books = JSON.parse(bd || "[]");
  }

  const novoLivro = {
    id: Date.now(),
    titulo: titulo,
    autor: autor,
    paginas: numPaginas,
    capa: capa || "",
  };

  books.push(novoLivro);

  fs.writeFileSync("bd.json", JSON.stringify(books, null, 2), "utf-8");

  res.redirect("/biblioteca");
});
app.post("/deletar-leitura", (req, res) => {
  const idParaDeletar = parseInt(req.body.id);

  if (fs.existsSync("bd.json")) {
    const bd = fs.readFileSync("bd.json", "utf-8");
    let books = JSON.parse(bd || "[]");

    books = books.filter((book) => book.id !== idParaDeletar);

    fs.writeFileSync("bd.json", JSON.stringify(books, null, 2), "utf-8");
  }

  res.redirect("/biblioteca");
});
app.post("/enviar-contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  console.log("=== NOVA MENSAGEM DE CONTATO ===");
  console.log(`Nome: ${nome}`);
  console.log(`E-mail: ${email}`);
  console.log(`Mensagem: ${mensagem}`);
  console.log("================================");

  res.send(
    "<h1>Mensagem recebida com sucesso!</h1><br><a href='/'>Voltar para a Home</a>",
  );
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});



// Função auxiliar para não repetir o código de leitura do bd.json
function lerLivros() {
  if (fs.existsSync("bd.json")) {
    const bd = fs.readFileSync("bd.json", "utf-8");
    return JSON.parse(bd || "[]");
  }
  return [];
}

// GET /api/livros -> lista todos, ou filtra via query params
// Exemplos:
//   /api/livros?titulo=harry
//   /api/livros?autor=tolkien
//   /api/livros?titulo=harry&autor=rowling
app.get("/api/livros", (req, res) => {
  let books = lerLivros();

  const { titulo, autor, paginasMin, paginasMax } = req.query;

  if (titulo) {
    books = books.filter((b) =>
      b.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
  }

  if (autor) {
    books = books.filter((b) =>
      b.autor.toLowerCase().includes(autor.toLowerCase())
    );
  }

  if (paginasMin) {
    books = books.filter((b) => b.paginas >= parseInt(paginasMin));
  }

  if (paginasMax) {
    books = books.filter((b) => b.paginas <= parseInt(paginasMax));
  }

  res.json(books);
});

// GET /api/livros/:id -> busca um livro específico pelo id
app.get("/api/livros/:id", (req, res) => {
  const books = lerLivros();
  const livro = books.find((b) => b.id === parseInt(req.params.id));

  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado" });
  }

  res.json(livro);
});
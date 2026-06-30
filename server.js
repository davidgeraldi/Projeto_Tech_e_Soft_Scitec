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
  const bd = fs.readFileSync("bd.json", "utf-8");

  const books = JSON.parse(bd || "[]");
  res.render("library", { books: books });
});

app.post("/salvar-leitura", (req, res) => {
  // Pega os dados do formulário
  const { titulo, autor, paginas } = req.body;

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
  };

  books.push(novoLivro);

  fs.writeFileSync("bd.json", JSON.stringify(books, null, 2), "utf-8");

  res.redirect("/biblioteca");
});

app.get("/contato", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

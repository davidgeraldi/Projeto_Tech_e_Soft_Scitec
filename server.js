const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/biblioteca", (req, res) => {
  const bd = fs.readFileSync("bd.json", "utf-8");

  const books = JSON.parse(bd || "[]");
  res.render("library", { books: books });
});

app.get("/contato", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

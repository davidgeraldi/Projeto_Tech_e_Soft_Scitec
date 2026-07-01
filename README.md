# 📚 SciTec Library
 
Sistema web para organização de acervo pessoal de livros, desenvolvido com **Node.js**, **Express** e **EJS**. Permite cadastrar, visualizar, deletar e filtrar leituras através de uma interface visual, além de expor uma **API REST em JSON** para consulta programática dos dados.
 
## ✨ Funcionalidades
 
- **Cadastro de leituras**: adicione livros com título, autor, número de páginas e link de capa (opcional).
- **Biblioteca visual**: grade de cards com capa, título e autor, com modal de detalhes ao clicar em cada livro.
- **Exclusão de leituras**: remova livros diretamente pelo modal de detalhes.
- **Formulário de contato**: envio assíncrono (via `fetch`) com feedback visual (toast) sem recarregar a página.
- **API de livros**: rotas em JSON para listar e filtrar o acervo por título, autor e faixa de páginas — sem precisar da interface visual.
## 🛠️ Tecnologias utilizadas
 
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) 5
- [EJS](https://ejs.co/) (template engine)
- [Nodemon](https://nodemon.io/) (ambiente de desenvolvimento)
- Armazenamento simples em arquivo `bd.json` (sem banco de dados)
- HTML, CSS e JavaScript puro no front-end
## 📁 Estrutura de pastas
 
```
projeto_tech_e_soft_scitec/
├── bd.json                  # "Banco de dados" dos livros (JSON)
├── server.js                # Servidor Express e rotas
├── package.json
├── public/
│   ├── css/
│   │   ├── reset.css
│   │   ├── style.css
│   │   └── navbar.css
│   └── js/
│       └── contato.js
└── views/
    ├── index.ejs             # Página inicial
    ├── library.ejs           # Página da biblioteca
    ├── contact.ejs           # Página de contato
    └── partials/
        ├── navbar.ejs
        ├── books-grid.ejs     # Grade de livros cadastrados
        ├── empty.ejs          # Estado vazio (sem livros)
        ├── form-add.ejs       # Modal/formulário de novo livro
        └── book-infos.ejs     # Modal de detalhes/exclusão do livro
```
 
## ⚙️ Instalação
 
1. Clone o repositório:
```bash
   git clone https://github.com/davidgeraldi/Projeto_Tech_e_Soft_Scitec.git
   cd Projeto_Tech_e_Soft_Scitec
```
 
2. Instale as dependências:
```bash
   npm install
```
 
3. Rode o projeto:
```bash
   # Modo produção
   npm start
 
   # Modo desenvolvimento (com auto-reload via nodemon)
   npm run dev
```
 
4. Acesse no navegador:
```
   http://localhost:3000
```
 
## 🖥️ Rotas de páginas (views)
 
| Método | Rota          | Descrição                                   |
|--------|---------------|----------------------------------------------|
| GET    | `/`           | Página inicial com apresentação do sistema   |
| GET    | `/biblioteca` | Lista visual dos livros cadastrados          |
| GET    | `/contato`    | Página com formulário de contato             |
| POST   | `/salvar-leitura`   | Cadastra um novo livro (via formulário) |
| POST   | `/deletar-leitura`  | Remove um livro pelo `id`               |
| POST   | `/enviar-contato`   | Recebe os dados do formulário de contato |
 
## 🔌 API de livros (JSON)
 
Rotas pensadas para consulta dos dados sem interface visual — ideal para testes, integrações ou uso via navegador/Postman/Insomnia.
 
### `GET /api/livros`
 
Retorna todos os livros cadastrados. Aceita filtros opcionais via **query params**, combináveis entre si:
 
| Parâmetro     | Tipo   | Descrição                                          |
|---------------|--------|-----------------------------------------------------|
| `titulo`      | string | Filtra por título (busca parcial, sem diferenciar maiúsculas/minúsculas) |
| `autor`       | string | Filtra por autor (busca parcial, sem diferenciar maiúsculas/minúsculas) |
| `paginasMin`  | number | Filtra livros com número de páginas ≥ valor informado |
| `paginasMax`  | number | Filtra livros com número de páginas ≤ valor informado |
 
**Exemplos:**
```
GET /api/livros
GET /api/livros?titulo=hobbit
GET /api/livros?autor=orwell
GET /api/livros?paginasMin=300&paginasMax=500
GET /api/livros?titulo=o&autor=tolkien
```
 
### `GET /api/livros/:id`
 
Retorna um único livro pelo `id`.
 
```
GET /api/livros/1782871366109
```
 
Resposta caso não encontre o livro:
```json
{ "error": "Livro não encontrado" }
```
 
## 📦 Formato de um livro (`bd.json`)
 
```json
{
  "id": 1782868897011,
  "titulo": "Orgulho e Preconceito",
  "autor": "Jane Austen",
  "paginas": 700,
  "capa": "https://exemplo.com/capa.jpg"
}
```
 
O `id` é gerado automaticamente com `Date.now()` no momento do cadastro. O campo `capa` é opcional.

## 👤 Autor
 
Desenvolvido por <strong><font color="#23bd25">David Geraldi, Francisco Arthur e Victor Canassa</font></strong> — projeto acadêmico UNIFESP (Tech e Soft / Scitec Jr.).


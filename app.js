const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// Config Handlebars

app.set("views", __dirname + "/views");
app.engine(
  "hbs",
  handlebars({
    defaultLayout: "main",
    extname: ".hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "hbs");

// Config bodyParser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Definindo diretorio publico

app.use(express.static(__dirname + "/public"));

// Rotas

app.get("/", function (req, res) {
  res.render("login");
});

app.get("/dashboard", function (req, res) {
  chamados.findAll().then(function (chamados) {
    res.render("dashboard", { chamados: chamados });
  });
});

app.get("/criarCadastro", function (req, res) {
  res.render("criarCadastro");
});

app.get("/criarsalas", function (req, res) {
  res.render("criarSalas");
});

app.get("/criarChamado", function (req, res) {
  salas.findAll().then(function (salas) {
    res.render("criarChamado", { salas: salas });
  });
});

const db = require("./models/db");
const { salas, chamados } = require("./models/db");

app.post("/addChamado", function (req, res) {
  db.chamados
    .create({
      nome: req.body.nome,
      salas: req.body.salas,
      problema: req.body.problema,
      idUser: req.body.idUser,
    })
    .then(function () {
      res.redirect("/criarChamado");
    })
    .catch(function () {
      res.redirect("/criarChamado");
    });
});

app.post("/addSalas", function (req, res) {
  db.salas
    .create({
      nome: req.body.nome,
    })
    .then(function () {
      res.redirect("/criarSalas");
    })
    .catch(function () {
      res.redirect("/criarSalas");
    });
});

app.post("/addCadastro", function (req, res) {
  db.usuarios
    .create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      cargo: req.body.cargo,
    })
    .then(function () {
      res.redirect("/criarCadastro");
    })
    .catch(function (err) {
      res.redirect("/criarCadastro");
    });
});

app.listen(3000);

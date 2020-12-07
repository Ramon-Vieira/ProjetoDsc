const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");

// Config Handlebars

app.set("views", __dirname + "/views");
app.engine("hbs", handlebars({ defaultLayout: "main", extname: ".hbs" }));
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
  res.render("dashboard");
});

app.get("/cadastro", function (req, res) {
  res.render("cadastro");
});

app.get("/criarChamado", function (req, res) {
  res.render("criarChamado");
});

app.listen(8081);

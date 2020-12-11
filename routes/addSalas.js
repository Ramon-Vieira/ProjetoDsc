const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.post("/", (req, res, next) => {
  // Insere os valores do formulario(criarSalas) no banco de dados.
  db.salas
    .create({
      nome: req.body.nome,
    })
    .then(function () {
      req.flash("msgSuccess", "Sala inserida com sucesso.");
      res.redirect("/criarSalas");
    })
    .catch(function () {
      req.flash("msgError", "Erro ao inserir a sala!");
      res.redirect("/criarSalas");
    });
});

module.exports = router;

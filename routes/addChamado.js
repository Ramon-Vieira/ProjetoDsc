const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.post("/", (req, res, next) => {
  // Insere os valores do formulario(criarChamado) no banco de dados.
  db.chamados
    .create({
      nome: req.body.nome,
      salas: req.body.salas,
      problema: req.body.problema,
      idUser: req.body.idUser,
    })
    .then(function () {
      req.flash("msgSuccess", "Chamado inserido com sucesso.");
      res.redirect("/dashboard");
    })
    .catch(function () {
      req.flash("msgError", "Erro ao inserir o chamado!");
      res.redirect("/criarChamado");
    });
});

module.exports = router;

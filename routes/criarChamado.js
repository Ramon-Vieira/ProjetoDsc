const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.get("/", (req, res, next) => {
  // Recupera informações do usuário para preencher os campos fixos do formulário e a listagem de salas existentes.
  db.salas.findAll({ order: ["nome"] }).then((salas) => {
    res.render("criarChamado", {
      salas: salas,
      nome: req.session.nome,
      cargo: req.session.cargo,
      sessao: req.session,
      idUser: req.session.idUser,
    });
  });
});

module.exports = router;

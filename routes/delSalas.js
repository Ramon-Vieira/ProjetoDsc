const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.post("/", (req, res, next) => {
  db.salas
  // Remove a sala com a função destroy, passando como parametro o nome da sala(delSalas)
    .destroy({ where: { nome: req.body.delSalas } })
    .then(function () {
      req.flash("msgSuccess", "Sala removida com sucesso.");
      res.redirect("/criarSalas");
    })
    .catch(function () {
      req.flash("msgError", "Erro ao remover a sala!");
      res.redirect("/criarSalas");
    });
});

module.exports = router;

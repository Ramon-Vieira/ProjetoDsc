const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.get("/", (req, res, next) => {
  db.salas.findAll({ order: ["nome"] }).then((salas) => {
    res.render("criarChamado", { salas: salas, nome: req.session.nome, cargo: req.session.cargo});
  });
});

module.exports = router;

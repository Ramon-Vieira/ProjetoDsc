const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.get("/", (req, res, next) => {
  db.salas.findAll({ order: ["nome"] }).then((salas) => {
    res.render("criarSalas", { sessao: req.session, salas: salas });
  });
});

module.exports = router;

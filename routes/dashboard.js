const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.get("/", (req, res, next) => {
  if (req.session.admin == 1) {
    db.chamados.findAll({ order: ["id"] }).then((chamados) => {
      res.render("dashboard", {
        chamados: chamados,
        admin: req.session.admin,
        nome: req.session.nome,
      });
    });
  } else {
    db.chamados
      .findAll({ order: ["id"], where: { nome: req.session.nome } })
      .then((chamados) => {
        res.render("dashboard", {
          chamados: chamados,
          admin: req.session.admin,
          nome: req.session.nome,
        });
      });
  }
});

module.exports = router;

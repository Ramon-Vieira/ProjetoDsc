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
        sessao: req.session,
      });
    });
  } else {
    db.chamados
      .findAll({ order: ["id"], where: { idUser: req.session.idUser } })
      .then((chamados) => {
        res.render("dashboard", {
          chamados: chamados,
          admin: req.session.admin,
          nome: req.session.nome,
          sessao: req.session,
        });
      });
  }
});

module.exports = router;

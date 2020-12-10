const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.post("/", (req, res, next) => {
  db.usuarios
    .findOne({ where: { email: req.body.email } })
    .then((x) => {
      if (x.cpf == req.body.cpf) {
        req.session.nome = x.nome;
        req.session.cargo = x.cargo;
        res.redirect("dashboard");
      } else {
        req.flash("msgError", "Email e/ou CPF incorretos.");
        res.redirect("/");
      }
    })
    .catch(() => {
      req.flash("msgError", "Email e/ou CPF incorretos.");
      res.redirect("/");
    });
});

module.exports = router;

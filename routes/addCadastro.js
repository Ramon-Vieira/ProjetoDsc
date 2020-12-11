const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.post("/", (req, res, next) => {
  // Função para saber se uma string tem apenas numeros
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  // Validação dos dados

  let error = false;
  if (
    req.body.cpf.length != 11 ||
    !isNumber(req.body.cpf) ||
    req.body.email.search(/[@]/g) == -1 ||
    !req.body.nome ||
    !req.body.cpf ||
    !req.body.email ||
    !req.body.cargo ||
    db.usuarios.findOne({ where: { cpf: req.body.cpf } }) ||
    db.usuarios.findOne({ where: { email: req.body.email } })
  ) {
    error = true;
  }

  if (error == false) {
    db.usuarios
      // Insere os valores do formulario(criarCadastro) no banco de dados.
      .create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        cargo: req.body.cargo,
        email: req.body.email,
        admin: req.body.admin,
      })
      // Caso insira corretamente, exibe a mensagem de sucesso.
      .then(function () {
        req.flash("msgSuccess", "Cadastro inserido com sucesso.");
        res.redirect("/criarCadastro");
      })
      // Caso de erro, exibe a mensagem de erro.
      .catch(function (err) {
        req.flash("msgError", "Erro ao inserir o cadastro!");
        res.redirect("/criarCadastro");
      });
  } else {
    req.flash("msgError", "Dados inválidos ou já cadastrados.");
    res.redirect("/criarCadastro");
  }
});

module.exports = router;

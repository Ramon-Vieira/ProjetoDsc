const express = require("express");
const router = express.Router();
const db = require("../models/tables");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

router.post("/", (req, res, next) => {
  // Função para saber se uma string tem apenas numeros
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  db.usuarios
    .findOne({
      where: { [Op.or]: [{ email: req.body.email }, { cpf: req.body.cpf }] },
    })
    .then((x) => {
      if (x != null) {
        console.log(x);
        req.flash("msgError", "Dados inválidos ou já cadastrados.");
        res.redirect("/criarCadastro");
      } else {
        let error = false;
        if (
          req.body.cpf.length != 11 ||
          !isNumber(req.body.cpf) ||
          req.body.email.search(/[@]/g) == -1 ||
          !req.body.nome ||
          !req.body.cpf ||
          !req.body.email
        ) {
          error = true;
        }
        if (error == false) {
          // Abre o metodo de encriptação para encriptar a senha e inserir no banco.
          bcrypt.hash(req.body.senha, 10).then((senhaHash) => {
            db.usuarios
              // Insere os valores do formulario(criarCadastro) no banco de dados.
              .create({
                nome: req.body.nome,
                senha: senhaHash,
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
          });
        } else {
          req.flash("msgError", "Dados inválidos ou já cadastrados.");
          res.redirect("/criarCadastro");
        }
      }
    });

  // Validação dos dados
  //
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("criarCadastro", { nome: req.session.nome });
});

module.exports = router;

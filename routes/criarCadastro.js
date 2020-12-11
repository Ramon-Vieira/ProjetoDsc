const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("criarCadastro", { sessao: req.session });
});

module.exports = router;

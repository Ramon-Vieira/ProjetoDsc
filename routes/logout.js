const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  // Apaga a sessão e redireciona para a tela de login.
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;

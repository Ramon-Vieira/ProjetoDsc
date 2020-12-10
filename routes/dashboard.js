const express = require("express");
const router = express.Router();
const db = require("../models/tables");

router.get("/", (req, res, next) => {
  db.chamados.findAll({ order: ["id"] }).then((chamados) => {
    res.render("dashboard", { chamados: chamados });
  });
});

module.exports = router;

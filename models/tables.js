const db = require("./db");
const conn = db.conn;
const Sequelize = db.Sequelize;

const usuarios = conn.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    notNull: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
  },
  cargo: {
    type: Sequelize.STRING,
  },
  cpf: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

const chamados = conn.define("chamados", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
  },
  salas: {
    type: Sequelize.STRING,
  },
  problema: {
    type: Sequelize.STRING(9999),
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "Pendente",
  },
});

const salas = conn.define("salas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: Sequelize.STRING,
  },
});

module.exports = {
  usuarios: usuarios,
  chamados: chamados,
  salas: salas,
};

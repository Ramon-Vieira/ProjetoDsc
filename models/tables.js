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
  senha: {
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
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
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
  idUser: {
    type: Sequelize.INTEGER,
    notNull: true,
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

// Fazer a sincronização das tabelas antes de iniciar o projeto, depois é preciso comentar o código abaixo:

// chamados.sync({ force: true });
// usuarios.sync({ force: true });
// salas.sync({ force: true });

module.exports = {
  usuarios: usuarios,
  chamados: chamados,
  salas: salas,
};

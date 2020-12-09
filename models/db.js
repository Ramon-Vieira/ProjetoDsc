const Sequelize = require("sequelize");
const conn = new Sequelize("dbteste", "nodeOp", "Node.123", {
  host: "localhost",
  dialect: "mysql",
});

conn.authenticate().catch(function (err) {
  console.log("Erro ao conectar ao BD.");
});

const usuarios = conn.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    notNull: true,
    autoIncrement: true
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
  sala: {
    type: Sequelize.STRING,
  },
  problema: {
    type: Sequelize.STRING,
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

// chamados.sync({ force: true });
// usuarios.sync({ force: true });
// salas.sync({ force: true });

module.exports = {
  usuarios: usuarios,
  chamados: chamados,
  salas: salas,
};

const Sequelize = require("sequelize");
const conn = new Sequelize("dbteste", "nodeOp", "Node.123", {
  host: "localhost",
  dialect: "mysql",
});

conn.authenticate().catch(function (err) {
  console.log("Erro ao conectar ao BD.");
});

module.exports = {
  conn: conn,
  Sequelize: Sequelize,
};
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_complete", "root", "jj6arv15@@@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
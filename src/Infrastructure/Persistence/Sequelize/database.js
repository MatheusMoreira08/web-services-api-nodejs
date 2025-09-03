const { Sequelize } = require('sequelize');
const config = require('../../../config'); // Caminho corrigido

const sequelize = new Sequelize(config.db.url, {
  dialect: config.db.dialect,
  logging: false, // desabilitar logs para produção
});

module.exports = sequelize;

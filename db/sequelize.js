const { Sequelize } = require('sequelize');
const config = require('../config/config');

const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  config[process.env.NODE_ENV],
);

module.exports = sequelize;

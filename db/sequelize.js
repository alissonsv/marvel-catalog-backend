const { Sequelize } = require('sequelize');

const {
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = process.env;

const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize(process.env.DATABASE_URL)
  : new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    logging: false,
  });

module.exports = sequelize;

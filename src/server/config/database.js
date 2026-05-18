const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'school_transport',
  process.env.DATABASE_USERNAME || 'postgres',
  process.env.DATABASE_PASSWORD || 'postgres',
  {
    host: process.env.DATABASE_URL || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;

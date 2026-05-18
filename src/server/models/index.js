const sequelize = require('../config/database');
const Driver = require('./Driver');
const Vehicle = require('./Vehicle');

module.exports = { sequelize, Driver, Vehicle };

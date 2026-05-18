const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Driver = require('./Driver');

const Vehicle = sequelize.define(
  'Vehicle',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'Vehicle number must be unique' },
      validate: {
        notEmpty: { msg: 'Vehicle number is required' },
      },
    },
    vehicleType: {
      type: DataTypes.ENUM('bus', 'cab'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['bus', 'cab']],
          msg: 'Vehicle type must be either bus or cab',
        },
      },
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'Capacity must be an integer' },
        min: { args: [1], msg: 'Capacity must be at least 1' },
      },
    },
    assignedDriverId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Driver,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'maintenance'),
      defaultValue: 'active',
      allowNull: false,
    },
  },
  {
    tableName: 'vehicles',
    timestamps: true,
  }
);

Vehicle.belongsTo(Driver, { as: 'assignedDriver', foreignKey: 'assignedDriverId' });
Driver.hasMany(Vehicle, { as: 'vehicles', foreignKey: 'assignedDriverId' });

module.exports = Vehicle;

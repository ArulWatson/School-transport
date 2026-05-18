const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Driver = sequelize.define(
  'Driver',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Full name is required' },
      },
    },
    mobileNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Mobile number is required' },
        is: {
          args: /^\d{10}$/,
          msg: 'Mobile number must be exactly 10 digits',
        },
      },
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'License number must be unique' },
      validate: {
        notEmpty: { msg: 'License number is required' },
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Address is required' },
      },
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active',
      allowNull: false,
    },
  },
  {
    tableName: 'drivers',
    timestamps: true,
  }
);

module.exports = Driver;

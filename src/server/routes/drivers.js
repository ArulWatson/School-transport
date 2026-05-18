const express = require('express');
const { Driver } = require('../models');

const router = express.Router();

// GET /api/drivers - List all drivers
router.get('/', async (req, res, next) => {
  try {
    const drivers = await Driver.findAll({ order: [['createdAt', 'DESC']] });
    res.json(drivers);
  } catch (err) {
    next(err);
  }
});

// GET /api/drivers/:id - Get driver by ID
router.get('/:id', async (req, res, next) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    res.json(driver);
  } catch (err) {
    next(err);
  }
});

// POST /api/drivers - Create driver
router.post('/', async (req, res, next) => {
  try {
    const { fullName, mobileNumber, licenseNumber, address, status } = req.body;
    const driver = await Driver.create({
      fullName,
      mobileNumber,
      licenseNumber,
      address,
      status: status || 'active',
    });
    res.status(201).json(driver);
  } catch (err) {
    next(err);
  }
});

// PUT /api/drivers/:id - Update driver
router.put('/:id', async (req, res, next) => {
  try {
    const driver = await Driver.findByPk(req.params.id);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    const { fullName, mobileNumber, licenseNumber, address, status } = req.body;
    await driver.update({ fullName, mobileNumber, licenseNumber, address, status });
    res.json(driver);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

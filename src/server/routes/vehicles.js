const express = require('express');
const { Vehicle, Driver } = require('../models');

const router = express.Router();

// GET /api/vehicles - List all vehicles
router.get('/', async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [{ association: 'assignedDriver', attributes: ['id', 'fullName', 'status'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
});

// GET /api/vehicles/:id - Get vehicle by ID
router.get('/:id', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [{ association: 'assignedDriver', attributes: ['id', 'fullName', 'status'] }],
    });
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
});

// POST /api/vehicles - Create vehicle
router.post('/', async (req, res, next) => {
  try {
    const { vehicleNumber, vehicleType, capacity, assignedDriverId, status } = req.body;

    if (assignedDriverId) {
      const driver = await Driver.findByPk(assignedDriverId);
      if (!driver) {
        return res.status(400).json({ error: 'Assigned driver not found' });
      }
      if (driver.status !== 'active') {
        return res.status(400).json({ error: 'Assigned driver must be active' });
      }
    }

    const vehicle = await Vehicle.create({
      vehicleNumber,
      vehicleType,
      capacity,
      assignedDriverId: assignedDriverId || null,
      status: status || 'active',
    });

    const created = await Vehicle.findByPk(vehicle.id, {
      include: [{ association: 'assignedDriver', attributes: ['id', 'fullName', 'status'] }],
    });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

// PUT /api/vehicles/:id - Update vehicle
router.put('/:id', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const { vehicleNumber, vehicleType, capacity, assignedDriverId, status } = req.body;

    if (assignedDriverId) {
      const driver = await Driver.findByPk(assignedDriverId);
      if (!driver) {
        return res.status(400).json({ error: 'Assigned driver not found' });
      }
      if (driver.status !== 'active') {
        return res.status(400).json({ error: 'Assigned driver must be active' });
      }
    }

    await vehicle.update({
      vehicleNumber,
      vehicleType,
      capacity,
      assignedDriverId: assignedDriverId || null,
      status,
    });

    const updated = await Vehicle.findByPk(vehicle.id, {
      include: [{ association: 'assignedDriver', attributes: ['id', 'fullName', 'status'] }],
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

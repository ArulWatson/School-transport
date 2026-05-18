const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || '/api/v1';

app.use(express.json());

// --- Health Check ---
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --- Driver Routes ---
const drivers = [];
let driverIdCounter = 1;

app.get(`${BASE_URL}/drivers`, (_req, res) => {
  res.json({ data: drivers });
});

app.get(`${BASE_URL}/drivers/:id`, (req, res) => {
  const driver = drivers.find((d) => d.id === req.params.id);
  if (!driver) return res.status(404).json({ message: 'Driver not found' });
  res.json({ data: driver });
});

app.post(`${BASE_URL}/drivers`, (req, res) => {
  const { fullName, mobileNumber, licenseNumber, address, status } = req.body;

  if (!fullName || !mobileNumber || !licenseNumber || !address) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
  }

  const duplicate = drivers.find((d) => d.licenseNumber === licenseNumber);
  if (duplicate) {
    return res.status(409).json({ message: 'A driver with this license number already exists' });
  }

  const now = new Date().toISOString();
  const driver = {
    id: String(driverIdCounter++),
    fullName,
    mobileNumber,
    licenseNumber,
    address,
    status: status || 'active',
    createdAt: now,
    updatedAt: now,
  };
  drivers.push(driver);
  res.status(201).json({ data: driver });
});

app.put(`${BASE_URL}/drivers/:id`, (req, res) => {
  const index = drivers.findIndex((d) => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Driver not found' });

  const { fullName, mobileNumber, licenseNumber, address, status } = req.body;

  if (!fullName || !mobileNumber || !licenseNumber || !address) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    return res.status(400).json({ message: 'Mobile number must be exactly 10 digits' });
  }

  const duplicate = drivers.find((d) => d.licenseNumber === licenseNumber && d.id !== req.params.id);
  if (duplicate) {
    return res.status(409).json({ message: 'A driver with this license number already exists' });
  }

  drivers[index] = {
    ...drivers[index],
    fullName,
    mobileNumber,
    licenseNumber,
    address,
    status: status || drivers[index].status,
    updatedAt: new Date().toISOString(),
  };
  res.json({ data: drivers[index] });
});

// --- Vehicle Routes ---
const vehicles = [];
let vehicleIdCounter = 1;

app.get(`${BASE_URL}/vehicles`, (_req, res) => {
  const vehiclesWithDrivers = vehicles.map((v) => {
    const driver = v.assignedDriverId ? drivers.find((d) => d.id === v.assignedDriverId) : null;
    return {
      ...v,
      assignedDriver: driver ? { id: driver.id, fullName: driver.fullName } : null,
    };
  });
  res.json({ data: vehiclesWithDrivers });
});

app.get(`${BASE_URL}/vehicles/:id`, (req, res) => {
  const vehicle = vehicles.find((v) => v.id === req.params.id);
  if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

  const driver = vehicle.assignedDriverId ? drivers.find((d) => d.id === vehicle.assignedDriverId) : null;
  res.json({
    data: {
      ...vehicle,
      assignedDriver: driver ? { id: driver.id, fullName: driver.fullName } : null,
    },
  });
});

app.post(`${BASE_URL}/vehicles`, (req, res) => {
  const { vehicleNumber, vehicleType, capacity, status, assignedDriverId } = req.body;

  if (!vehicleNumber || !vehicleType || !capacity) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  if (!['bus', 'cab'].includes(vehicleType)) {
    return res.status(400).json({ message: 'Vehicle type must be bus or cab' });
  }

  if (typeof capacity !== 'number' || capacity < 1 || !Number.isInteger(capacity)) {
    return res.status(400).json({ message: 'Capacity must be a positive integer' });
  }

  if (assignedDriverId) {
    const driver = drivers.find((d) => d.id === assignedDriverId);
    if (!driver) return res.status(400).json({ message: 'Assigned driver not found' });
    if (driver.status !== 'active') return res.status(400).json({ message: 'Assigned driver must be active' });
  }

  const now = new Date().toISOString();
  const vehicle = {
    id: String(vehicleIdCounter++),
    vehicleNumber,
    vehicleType,
    capacity,
    status: status || 'active',
    assignedDriverId: assignedDriverId || null,
    createdAt: now,
    updatedAt: now,
  };
  vehicles.push(vehicle);

  const driver = vehicle.assignedDriverId ? drivers.find((d) => d.id === vehicle.assignedDriverId) : null;
  res.status(201).json({
    data: {
      ...vehicle,
      assignedDriver: driver ? { id: driver.id, fullName: driver.fullName } : null,
    },
  });
});

app.put(`${BASE_URL}/vehicles/:id`, (req, res) => {
  const index = vehicles.findIndex((v) => v.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Vehicle not found' });

  const { vehicleNumber, vehicleType, capacity, status, assignedDriverId } = req.body;

  if (!vehicleNumber || !vehicleType || !capacity) {
    return res.status(400).json({ message: 'All required fields must be provided' });
  }

  if (!['bus', 'cab'].includes(vehicleType)) {
    return res.status(400).json({ message: 'Vehicle type must be bus or cab' });
  }

  if (typeof capacity !== 'number' || capacity < 1 || !Number.isInteger(capacity)) {
    return res.status(400).json({ message: 'Capacity must be a positive integer' });
  }

  if (assignedDriverId) {
    const driver = drivers.find((d) => d.id === assignedDriverId);
    if (!driver) return res.status(400).json({ message: 'Assigned driver not found' });
    if (driver.status !== 'active') return res.status(400).json({ message: 'Assigned driver must be active' });
  }

  vehicles[index] = {
    ...vehicles[index],
    vehicleNumber,
    vehicleType,
    capacity,
    status: status || vehicles[index].status,
    assignedDriverId: assignedDriverId || null,
    updatedAt: new Date().toISOString(),
  };

  const driver = vehicles[index].assignedDriverId
    ? drivers.find((d) => d.id === vehicles[index].assignedDriverId)
    : null;
  res.json({
    data: {
      ...vehicles[index],
      assignedDriver: driver ? { id: driver.id, fullName: driver.fullName } : null,
    },
  });
});

// --- Serve Frontend ---
const frontendPath = path.join(__dirname, 'frontend', 'dist');
app.use(express.static(frontendPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

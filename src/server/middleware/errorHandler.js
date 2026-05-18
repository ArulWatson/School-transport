function errorHandler(err, req, res, _next) {
  console.error('Error:', err.message);

  if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(409).json({ error: 'Duplicate entry', details: errors });
  }

  return res.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;

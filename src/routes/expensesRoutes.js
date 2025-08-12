const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas las rutas de gastos requieren autenticación
router.use(authMiddleware);

// GET all expenses
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM expenses ORDER BY date');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

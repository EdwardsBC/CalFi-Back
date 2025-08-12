// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const expensesRoutes = require('./routes/expensesRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expensesRoutes);

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;

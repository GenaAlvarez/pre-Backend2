const express = require('express');
const mongoose = require('mongoose');
const passport = require('./passportConfig');
const sessionsRouter = require('./sessionsRouter');
const { connectDB, getDB } = require('./db');


const app = express();
const PORT = 3000;

app.use(express.json());


// Conectar a la base de datos al iniciar el servidor
connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  }).catch((err) => {
    console.error('No se pudo iniciar el servidor:', err.message);
  });
  
  // Ruta de ejemplo para usar la base de datos
  app.get('/usuarios', async (req, res) => {
    try {
      const db = getDB();
      const usuarios = await db.collection('users').find().toArray(); // Cambia 'users' por tu colección
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  });
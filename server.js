const express = require('express');
const mongoose = require('mongoose');
const passport = require('./src/config/passportConfig');
const cookieParser = require('cookie-parser');
const sessionsRouter = require('./src/routes/sessionRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);

// Conexión a MongoDB
mongoose.connect('mongodb+srv://genaalva851:kg15frolo34@cluster0.ra9mc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Conexión exitosa a MongoDB'))
    .catch(err => console.error('Error al conectar con MongoDB:', err));

// Inicio del servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
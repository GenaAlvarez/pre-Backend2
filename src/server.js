const express = require('express');
const mongoose = require('mongoose');
const passport = require('./passportConfig');
const sessionsRouter = require('./sessionsRouter');

const app = express();
const PORT = 3000;

app.use(express.json());


app.use(passport.initialize());


mongoose
  .connect('mongodb://localhost:27017/mi_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));


app.use('/api/sessions', sessionsRouter);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
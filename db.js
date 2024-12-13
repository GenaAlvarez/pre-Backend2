const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

let client;
let db;


const connectDB = async () => {
  if (!client) {
    try {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      console.log('Conexión exitosa a MongoDB');
      
    
      db = client.db('mi_base_de_datos');
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error.message);
      throw error;
    }
  }
  return db;
};


const getDB = () => {
  if (!db) {
    throw new Error('La base de datos no está inicializada. Usa connectDB primero.');
  }
  return db;
};

module.exports = { connectDB, getDB };
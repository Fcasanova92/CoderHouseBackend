// config/config.js
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

export const config = {
  server: {
    port: process.env.PORT || 8080,
  },
  db: {
    mongoUri: process.env.MONGODB_URI,
  },
};

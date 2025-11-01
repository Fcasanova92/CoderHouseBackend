// server.js
import mongoose from 'mongoose';
import app from './app.js';
import { config } from './config/config.js';

const PORT = config.server.port || 8080;

mongoose.set('strictQuery', false);
mongoose.connect(config.db.mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
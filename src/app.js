import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockRouter from './routes/mocks.router.js';
import { errorHandler } from './middleware/error/errorHandler.js';
import compress from 'compression';
import { config } from './config/config.js';


const app = express();
const PORT = config.server.port||8080;
const connection = mongoose.connect(config.db.mongoUri);

app.use(express.json());
app.use(cookieParser());
app.use(compress());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mockRouter)
app.use(errorHandler)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

import express from 'express';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockRouter from './routes/mocks.router.js';
import { errorHandler } from './middleware/error/errorHandler.js';
import compress from 'compression';
import { swaggerDocument, swaggerUi } from './docs/swaggerConfig.js';


const app = express();

app.use(express.json());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(compress());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mockRouter)
app.use(errorHandler)

export default app

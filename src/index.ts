import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const cookieParser = require("cookie-parser");
const cors = require('cors');

import { userRoutes } from './routes/user.route';
import { sessionRoutes } from './routes/session.route';
import {swaggerDocs} from './swagger';

dotenv.config();

const app: Express = express();
const baseUrl = process.env.BASE_URL;
const port = process.env.PORT;

app.use(cookieParser())
app.use(cors());
app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
  res.send('PROYECTO_GESTION_USUARIOS running on current server');
});

app.use('/', userRoutes);
app.use('/', sessionRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port:${port}`);
  console.log(`⚡️[server]: Check the server running status at any time on: ${baseUrl}:${port}/health`);
  swaggerDocs(app, port);
});
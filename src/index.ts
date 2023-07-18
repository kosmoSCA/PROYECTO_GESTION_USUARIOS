import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
const cookieParser = require("cookie-parser");
const cors = require('cors');
const fileUpload = require('express-fileupload');

import { positionRoutes } from './routes/position.route';
import { sessionRoutes } from './routes/session.route';
import { userRoutes } from './routes/user.route';
import {swaggerDocs} from './swagger';
import { imageRoutes } from './routes/image.route';

dotenv.config();

const app: Express = express();
const baseUrl = process.env.BASE_URL;
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));
app.use(express.json());
app.use(fileUpload());

app.use(express.static(path.join(__dirname,'..','files')));

app.get('/health', (req: Request, res: Response) => {
  res.send('PROYECTO_GESTION_USUARIOS running on current server');
});

app.use('/', imageRoutes);
app.use('/', positionRoutes);
app.use('/', sessionRoutes);
app.use('/', userRoutes);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running on port:${port}`);
  console.log(`⚡️[server]: Check the server running status at any time on: ${baseUrl}:${port}/health`);
  swaggerDocs(app, port);
});
import { Router } from 'express';

const sessionController = require('../controllers/session.controller');

export const sessionRoutes = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Session
 *     description:  POST Endpoint for logins
 */
sessionRoutes.post('/login', sessionController.login);
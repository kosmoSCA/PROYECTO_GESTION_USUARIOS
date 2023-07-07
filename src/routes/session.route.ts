import { Router } from 'express';

const sessionController = require('../controllers/session.controller');

export const sessionRoutes = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Session
 *     description:  POST Endpoint for session
 *     schema:
 *         type: object
 *         required:
 *              - EMAIL
 *              - PASSWORD
 *         properties:
 *              EMAIL:
 *                  type: email
 *                  example: kosmo@gmail.com
 *              PASSWORD:
 *                  type: string
 *                  example: password1234
 *     responses:
 *       '201':
 *        description: Logged in user with email succesfully
 *       '400':
 *        description: EMAIL or PASSWORD are not correct
 *       '500':
 *        description: Could not log user in
 */
sessionRoutes.post('/login', sessionController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *       - Session
 *     description:  DELETE Endpoint for session
 *     responses:
 *       '201':
 *        description: Logged user out succesfully
 */
sessionRoutes.delete('/logout', sessionController.logout);
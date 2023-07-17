import { Router } from 'express';

const positionController = require('../controllers/position.controller');

export const positionRoutes = Router();

/**
 * @swagger
 * /getPositionList:
 *   get:
 *     tags:
 *       - Positions
 *     description:  GET Endpoint for positions.
 *     responses:
 *       '200':
 *        description: Retrieved positions successfully
 *       '500':
 *        description: Could not retrieve positions
 */
positionRoutes.get('/getPositionList', positionController.getPositionList);
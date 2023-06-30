import { Router } from 'express';

const userController = require('../controllers/user.controller');

export const userRoutes = Router();

/**
 * @swagger
 * /getUserList:
 *   get:
 *     tags:
 *       - Users
 *     description:  GET Endpoint for products
 *     responses:
 *       '200':
 *        description: Retrieved users successfully
 *       '500':
 *        description: Could not retrieve users
 */
userRoutes.get('/getUserList', userController.getUserList);

/**
 * @swagger
 * /newUser:
 *   post:
 *     tags:
 *       - Users
 *     description:  POST Endpoint for one user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to be posted.
 *         schema:
 *          type: object
 *          required:
 *              - NOMBRE
 *              - APELLIDO
 *          properties:
 *              NOMBRE:
 *                  type: string
 *                  example: Santiago
 *              APELLIDO:
 *                  type: string
 *                  example: Castro
 *     responses:
 *       '201':
 *        description: Posted user with name succesfully
 *       '400':
 *        description: User properties or types do not match the model
 *       '500':
 *        description: Could not post user with name name
 */
userRoutes.post('/newUser', userController.newUser);